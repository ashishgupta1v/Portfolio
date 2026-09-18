---
title: "Grounding LLM Answers Against an Event-Sourced Ledger"
slug: "grounding-llm-event-sourced-ledger"
published_at: "2026-09-10"
excerpt: "Vector search retrieves semantically similar chunks, but semantic similarity isn't the same as factual correctness. Here's how I used an event-sourced ledger as the ground-truth anchor for a RAG system — and why the combination is more reliable than either approach alone."
tags: ["RAG", "Event Sourcing", "LLM", "Architecture", "PostgreSQL"]
---

## The gap that vector search leaves open

A standard RAG pipeline looks like this: embed the query, retrieve the top-k chunks by cosine similarity, inject them into the prompt, generate a response. The implicit assumption is that high similarity means high relevance, and high relevance means the answer is grounded in what actually happened. That assumption is shakier than it looks.

Cosine similarity measures semantic closeness — how much two pieces of text are *about* the same thing — not factual accuracy or recency. A chunk about a client's habit from six weeks ago will score highly against a query about that same habit today, even if the situation has changed completely. The model may synthesize a response that is perfectly grounded in the retrieved chunks and completely wrong about the current state of the world.

This problem became acute in ZoetiCoach AI. A client's habit contract changes over time: habits get added, modified, paused, or dropped. A coaching response that references a paused habit as active isn't just wrong — it's the kind of mistake that breaks trust immediately.

## The event log as the source of truth

The fix I reached for is one borrowed from financial systems and DDD: treat state as a projection over an append-only event log, and use that log as the authoritative source for anything time-sensitive.

In ZoetiCoach, every change to a client's habit contract produces a domain event — `HabitAdded`, `HabitPaused`, `GoalAdjusted`, `CheckInLogged`. These events are written to a `domain_events` table with a strict schema:

```sql
CREATE TABLE domain_events (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aggregate_id UUID NOT NULL,        -- the client's ID
    aggregate_type VARCHAR(100) NOT NULL,
    event_type  VARCHAR(100) NOT NULL,
    payload     JSONB NOT NULL,
    metadata    JSONB NOT NULL DEFAULT '{}',
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    sequence    BIGINT GENERATED ALWAYS AS IDENTITY
);

CREATE INDEX ON domain_events (aggregate_id, sequence);
CREATE INDEX ON domain_events (aggregate_type, event_type, occurred_at);
```

The table is append-only by convention (no `UPDATE`, no `DELETE` in application code). Current state is derived by replaying events in sequence order, not by reading a single mutable row.

## Two retrieval paths, one generation step

The RAG pipeline now runs two retrieval paths in parallel before generating a response:

**Path 1 — Vector retrieval (semantic):** Standard pgvector HNSW search against chunk embeddings. Retrieves the top-5 semantically similar chunks from `habit_chunks`. This path is good at finding relevant *context* — what the habit program looks like, what the coach's playbook says, what similar past situations looked like.

**Path 2 — Event log retrieval (factual):** A direct SQL query against `domain_events` for the client's last N events, filtered to the relevant aggregate. This path is good at establishing *current state* — what habits are active right now, what the last check-in said, whether a goal was adjusted this week.

```php
// Simplified: run both retrievals concurrently
[$semanticChunks, $recentEvents] = Fiber::runAll(
    fn() => $this->vectorSearch->retrieve($query, $clientId, topK: 5),
    fn() => $this->eventStore->getRecentEvents($clientId, limit: 20),
);

$currentState = $this->stateProjector->project($recentEvents);
```

The prompt assembles these two sources explicitly with labelled sections:

```
<current_state verified_at="2026-09-10T07:14:00Z">
  Active habits: Morning run (6:00 AM), Evening journaling (9:00 PM)
  Last check-in: 2026-09-09 — Morning run: completed, Evening journaling: missed
  Goal adjustments this week: none
</current_state>

<semantic_context>
  [Chunk 1 — habit_contract, similarity: 0.91] ...
  [Chunk 2 — coach_playbook, similarity: 0.87] ...
</semantic_context>
```

The model is instructed to treat `<current_state>` as authoritative and `<semantic_context>` as supporting background. If there is any conflict between them, current state wins.

## Why the separation matters

The event log retrieval solves a problem that reindexing doesn't. If you try to keep vector embeddings current by re-embedding and re-indexing every time a habit changes, you're fighting against the nature of vector search: old chunks don't disappear from the index, they just get outcompeted by newer ones with higher similarity — sometimes. In practice, stale chunks continue to surface because they're about the same topic, and the model has no reliable way to know they're outdated.

By making current state a separate, explicitly-labelled, non-embedded artefact in the prompt, you give the model a clear signal: this is ground truth, this is context. The model doesn't have to infer recency from similarity scores. It's told directly what is currently true.

This also makes hallucination easier to detect. If the model's response mentions a habit that isn't in `<current_state>` and wasn't present in any retrieved chunk, the post-generation verifier can flag it. In a pure vector search system, that check is much harder to write.

## The projection layer is not optional

The `StateProjector` that turns a list of raw events into a clean `<current_state>` block is worth investing in properly. It's not a simple `array_reduce` — it needs to handle out-of-order events gracefully (they shouldn't exist, but defensive code is good code), understand the semantics of each event type, and produce a structured output that fits cleanly into the prompt without ambiguity.

In the ZoetiCoach implementation, the projector is a small class with an explicit handler method per event type. Adding a new event type means adding a handler — the projector will raise a `UnhandledEventException` if it encounters an unknown type, which makes missing handlers a build-time catch rather than a silent bug at runtime.

## What this costs

The event log retrieval adds one database round-trip to every inference call. At the query volumes ZoetiCoach operates at, that's negligible — but it's worth acknowledging. If you're running a high-throughput system where inference calls happen thousands of times per second, you'd want to cache the projected state (with a short TTL, invalidated on new events) rather than querying the event log on every call.

The other cost is the projection layer itself — it's code you have to maintain as your domain evolves. Every time you add a new event type, the projector needs a handler. That's a small recurring cost for a meaningful reliability improvement.

## The broader principle

The pattern here is a specific instance of a more general idea: don't ask a language model to determine what is currently true by searching for semantically similar text about the past. Language models are good at reasoning over context; they're bad at tracking which context is current versus historical. Make that determination outside the model, in deterministic code against a reliable data source, and inject the result explicitly.

An event log is one good choice for that reliable data source. A CDC-captured snapshot table is another. A Redis projection updated on every state change is another. The right choice depends on your system's consistency requirements and query patterns. The wrong choice is leaving it to the vector index and hoping high similarity scores correlate with current reality — sometimes they do, and sometimes they confidently don't.
