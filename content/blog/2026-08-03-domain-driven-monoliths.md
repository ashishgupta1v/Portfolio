---
title: "Domain-Driven Monoliths: Why Laravel Doesn't Need Microservices to Scale"
slug: "domain-driven-monoliths"
published_at: "2026-08-03"
excerpt: "Most teams reach for microservices to solve a modularity problem they could have solved inside a single Laravel deployable. Domain-driven boundaries inside a monolith get you most of the benefit without the operational tax."
tags: ["Laravel", "Domain-Driven Design", "Architecture", "Monoliths"]
---

## The wrong question

Almost every "should we move to microservices" conversation I've been pulled into starts from the wrong premise. The team isn't actually asking "do we need independently deployable services?" They're asking "why does changing one thing in this codebase feel dangerous?" Those are different problems, and only one of them is solved by a network boundary.

Microservices trade a modularity problem for a distributed systems problem. You get independent deploys, but you also get eventual consistency, network partitions, distributed tracing, service discovery, and a versioning story for every contract between services. For a five-person team shipping a B2B SaaS product, that trade is almost always a net loss. The modularity problem was solvable at the code level. The team just never enforced boundaries, so the codebase decayed into the thing that made "just add a service" sound appealing.

## What a domain boundary actually buys you

A domain-driven monolith keeps the single deployable, the single database (usually), and the single request lifecycle — but it treats module boundaries as seriously as a microservices team treats network boundaries. In a Laravel app, that means organizing by business capability instead of by technical layer.

Instead of `app/Http/Controllers`, `app/Models`, and `app/Services` growing without bound, each capability gets its own vertical slice: `app/Domain/Billing`, `app/Domain/Scheduling`, `app/Domain/Notifications`. Each slice owns its Eloquent models, its business rules, and — critically — a small, explicit public interface that other domains are allowed to call. Everything else in that folder is private to the domain, even though PHP has no `internal` keyword to enforce it. The discipline is social and architectural, not compiler-enforced, and that's fine as long as the team treats it as a real constraint.

## The application layer is the seam

The piece teams usually skip is the application layer — a thin set of Action classes that sit between HTTP controllers and the domain. `GetInvoiceAction`, `CancelSubscriptionAction`, `ReconcilePaymentAction`. Each Action takes primitive-ish input, orchestrates one or more domain repositories or services, and returns a DTO. Controllers become almost embarrassingly thin: resolve the Action, call `execute()`, hand the result to Inertia or a JSON resource.

This seam matters for two reasons. First, it's where you'd cut the service if you ever did need to extract one — the Action already knows its full set of dependencies and its complete input/output contract, so extraction is a refactor, not a rewrite. Second, and more immediately useful, it's what makes the codebase testable without spinning up the whole HTTP stack. You can unit test `CancelSubscriptionAction` directly, assert on the DTO it returns, and never touch a route.

## Repositories as the only door into a domain

Every domain exposes a repository interface — `InvoiceRepositoryInterface`, not `Invoice::query()` scattered across the app. Other domains depend on the interface, bound in a service provider, never on the concrete Eloquent implementation. This does three things at once: it stops Billing from writing directly to Scheduling's tables, it gives you a seam to swap the storage engine (a file-backed repository, a cache-backed one, an external API client) without touching a single call site, and it makes the dependency graph between domains visible instead of implicit. If `InvoiceRepositoryInterface` shows up in Scheduling's `composer` autoload map, you have a real, inspectable coupling — not a guess based on which controller happens to call which model.

## Where the database still leaks

I won't pretend a domain-driven monolith gives you the same isolation a real service boundary would. If Billing and Scheduling share a Postgres instance, a bad migration in one can still lock a table the other depends on, and a runaway query in one domain still competes for the same connection pool. The honest framing is that you're buying most of the *organizational* benefit of service boundaries — clear ownership, a stable contract, the ability to reason about one domain without reading five others — while deferring the *operational* cost of running N deployables, N sets of infrastructure, and N failure modes. For most products, that deferral is correct for years, sometimes forever.

## When to actually split

The signal to extract a real service isn't "the codebase feels big." It's a scaling or compliance boundary that the monolith genuinely can't satisfy — a domain that needs an independent deploy cadence because it ships ten times a day while the rest of the app ships weekly, a workload with wildly different infrastructure needs (a video transcoding pipeline next to a CRUD admin panel), or a regulatory requirement that data physically live in a separate, audited system. Until one of those shows up, the domain boundary inside the monolith is doing the job, and the deploy pipeline stays boring — which, for a production system, is exactly what you want.

The pattern isn't exotic. It's the same discipline good backend engineers have always applied: know what a module is allowed to touch, make the boundary explicit in code, and don't let the database become the thing that actually defines your architecture.
