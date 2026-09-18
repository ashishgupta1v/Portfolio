---
title: "Human-in-the-Loop AI: Why Automation Without Approval Gates Is a Liability"
slug: "human-in-the-loop-ai"
published_at: "2026-08-28"
excerpt: "Full automation is seductive, but in coaching, healthcare, and high-stakes advisory domains, an AI that acts without a human checkpoint is a risk you can't afford. Here's the approval-queue architecture I built in production and what it taught me about where AI actually belongs in the loop."
tags: ["AI", "RAG", "Human-in-the-Loop", "Architecture", "Laravel"]
---

## The mistake that looks like progress

When you build an AI system that can respond to users automatically, the temptation is to turn up automation until there's nothing left for a human to review. Speed improves. Latency drops. The product feels more polished. Then something goes wrong — the model misreads context, gives advice that doesn't fit the situation, or worse, gives advice that's technically correct but lands badly for a user who needed something the text didn't say. At that point, you discover that "we review everything before it goes out" was the only quality gate you had, and you turned it off in pursuit of response time.

This is the problem I set out to solve in ZoetiCoach AI — a WhatsApp-based accountability coaching system where an LLM generates responses to client habit check-ins. The domain (coaching) has a low tolerance for mistakes. A response that trivialises a client's struggle, or pushes the wrong habit at the wrong moment, damages the coaching relationship in a way a retry can't fix.

## Two types of work, two types of risk

The first thing I got right was recognising that not all AI-generated responses carry the same risk. In ZoetiCoach, roughly 70–75% of inbound messages are routine habit confirmations: "Done for today," "Missed this one," "Starting tomorrow." The AI's job is to acknowledge, log, and maybe offer brief encouragement. The model is well-calibrated for this class of message, and the cost of a mildly off-key response is low. Asking a coach to approve every one of these is wasteful — it defeats the scalability argument for using AI at all.

The remaining 25–30% are nuanced: clients pushing back on a habit, reporting a difficult week, asking for goal adjustments, or raising something emotionally loaded. These messages require contextual judgment that the model sometimes gets right and sometimes gets very wrong. The cost of a poor response here is high.

This split led directly to a two-tier approval queue:

- **Tier 1 (auto-approved):** Routine confirmations and low-ambiguity replies above a confidence threshold. The model generates, a guardrail pipeline runs, and if everything is clean, the response sends automatically.
- **Tier 2 (coach review required):** Any response flagged by low similarity scores, nuanced semantic content, or an uncertainty signal from the model itself. These land in a Filament-based queue where the coach can approve as-is, edit and approve, or reject and rewrite.

The boundary between tiers is not static. It's a composite signal: embedding similarity score against the habit contract, a keyword classifier for emotional weight, and a structured prompt that asks the model to rate its own confidence on a 1–5 scale. Messages that score ambiguously get escalated.

## The queue state machine

The approval queue is a first-class Laravel model — not a flag on a message record, not a queue job. Each entry has explicit state transitions:

```
pending → approved (auto or manual) → sent
pending → escalated → reviewed → approved or rejected
approved → sent
rejected → coach_rewrite → approved → sent
```

Using explicit states instead of boolean flags was a deliberate choice. It makes the audit trail readable — you can reconstruct exactly what happened to any message, who touched it, and when. It also makes the coach dashboard trivial to build: a queue is just `QueueEntry::where('state', 'pending')->latest()->get()`.

The state machine is enforced at the application layer, not the database layer. State transitions happen through a `ApprovalQueueService` that checks preconditions before writing, raises a domain event on every transition, and writes an immutable telemetry record regardless of success or failure. The telemetry record is what makes the system auditable without having to reconstruct state from a changelog.

## What the coach actually sees

The Filament panel shows three things for each queued response: the original client message, the AI-generated response candidate, and the retrieved context chunks that the model used — displayed as collapsed accordions so the coach can verify the model grounded its response in the right habit contracts. If the coach edits the response, the diff is stored alongside the final sent text. Over time, that edit history becomes a training signal for identifying which response patterns consistently need correction.

This is intentional. The approval queue isn't just a safety net — it's a feedback loop. A fully automated system is opaque: you know inputs and outputs but not where the model is underperforming. A queue that captures every edit gives you the data to see exactly where automation is failing and to make a targeted improvement.

## The confidence self-assessment is not magic

One thing worth being explicit about: asking the model to rate its own confidence is not a reliable signal in isolation. LLMs are poorly calibrated in the classical sense — high stated confidence does not reliably correlate with accuracy. I use it as a weak signal, not a hard gate. A model response that scores itself 5/5 still runs through the full similarity and keyword pipeline. What self-assessment actually buys is a cheap way to catch the cases where the model *knows* it's on uncertain ground and says so — which, in practice, it does more often than you'd expect.

The reliable signals are structural: low cosine similarity against the habit contract embeddings, semantic content that matches an escalation keyword list, or a response that is longer than the 95th percentile for the message class. These are deterministic, cheap, and don't require trusting the model's introspection.

## When to skip the queue entirely

There are categories of message where I don't use the queue at all: safety-related disclosures, anything that matches a crisis keyword pattern, and any message where the prompt-injection guard fires. These go to an immediate human escalation channel — a Slack webhook that pings the coach directly — and no automated response is sent. The queue is not a catch-all; it's for calibrated uncertainty. Certain signals mean the AI should not be involved in generating a response, and the architecture needs to know the difference.

## The pattern generalises

I've described this in the context of a coaching system, but the pattern applies anywhere an AI is generating text that has real-world consequences for a specific named person: financial advice, healthcare triage, legal document drafting, educational feedback. The tiers, the state machine, the telemetry, and the edit-capture loop all transfer. What changes is the boundary between Tier 1 and Tier 2, the content of the escalation signal, and the composition of the review panel.

Full automation is appropriate for a narrow class of AI tasks — those where mistakes are cheap, reversible, and don't affect the trust relationship between a person and a service. For everything else, the question isn't *whether* to put a human in the loop, but *where* in the loop to put them and what information they need to make the review fast enough to be operationally viable.

Getting that design right is harder than building the AI feature. It's also the difference between a system that stays in production and one that gets turned off after the first significant failure.
