---
slug: "ludhiana-knitwear-ops-modernization"
title: "From Paper Ledgers to Real-Time ERP: Modernizing a Knitwear Manufacturer's Operations"
summary: "How I designed and shipped a full-stack ERP for a Ludhiana-based knitwear manufacturer — replacing WhatsApp screenshots and paper registers with a real-time order, billing, and dispatch system that cut cycle time by 59% in 10 weeks."
client: "Mid-scale knitwear manufacturer (Ludhiana, Punjab) — anonymized"
role: "Solution Architect & Full-Stack Developer"
industry: "Textile / Garment Manufacturing"
timeline: "10 weeks (late 2024)"
published_at: "2026-06-02"
featured_outcome: "Cycle time reduced from 11 days to 4.5 days. Late dispatch down 43%. Escalation response from 9 hours to 2.4 hours. Zero paper registers in production after week 3."
permission_status: "client approved, business name anonymized"
seo_title: "Knitwear ERP Case Study | Order Management Modernization | Ashish Gupta"
seo_description: "How Ashish Gupta built a full-stack ERP for a Ludhiana knitwear manufacturer — cutting cycle time 59%, eliminating paper registers, and shipping in 10 weeks with Laravel, Vue 3, and PostgreSQL."
tags: ["Case Study", "ERP", "Manufacturing", "Laravel", "Full-Stack", "Digital Transformation"]
stack: ["Laravel", "Vue 3", "TypeScript", "Vite", "Tailwind CSS", "PostgreSQL", "Supabase"]
---

## Executive Summary

A mid-scale knitwear manufacturer in Ludhiana came to me with a problem that looked simple from the outside: "We need a billing system." What I found during discovery was a business running entirely on fragmented state — orders scribbled in paper registers, dispatch confirmed over WhatsApp voice notes, GST summaries assembled every weekend from screenshots, and customer escalations managed through memory.

The business was not failing. It was profitable, growing, and well-regarded in its market. But the operations were absorbing 30–40% of owner and staff time on coordination overhead that delivered zero product value.

In 10 weeks I designed, built, and handed over a production ERP covering the complete order-to-dispatch lifecycle. Cycle time dropped from 11 days to 4.5. Late dispatches fell 43%. Escalation response time collapsed from 9 hours to under 2.5 hours.

This is the architecture story behind that outcome.

## The Business Before the ERP

The client produced custom knitwear — sweaters, cardigans, and jackets — in bulk orders for local traders and export brokers. Orders varied in complexity: a single party might place one order covering six sizes, four colours, and three embroidery designs, each with different unit prices and surcharge rules.

**The operational workflow before the ERP:**

1. Party calls or messages to place an order.
2. Owner or floor manager writes it into a paper register, sometimes annotating embroidery specifications on a separate notepad.
3. Production teams receive verbal instructions or hand-delivered slips.
4. On dispatch day, the billing team manually calculates totals — including size-grid arithmetic and GST — using a calculator or Excel.
5. Invoice is typed in Tally or printed from a template.
6. Customer confirms receipt via WhatsApp.

Every step above contained failure modes that compounded. A size entry written wrong on step 2 might only be caught at billing on step 4. An embroidery specification missed at step 2 caused a re-run at step 3 that delayed dispatch by days. A disputed total at step 4 required reconstructing the order from the paper register, sometimes from a week earlier.

The owner was personally handling most of the coordination. His working day had become operations management, not business development.

## Why Standard Solutions Did Not Fit

I evaluated three options before building:

**Option A — Tally customization.** Tally is ubiquitous in Indian SME billing. But Tally's data model is built around accounts, not manufacturing workflows. Modelling dynamic size grids, per-piece embroidery costs, and batch-stage tracking in Tally would require a complex plugin with no good maintenance path.

**Option B — Off-the-shelf textile ERP.** Several India-made textile ERPs exist in the ₹15,000–₹80,000/year range. The ones I reviewed were designed for large mills with dedicated IT staff. They required weeks of onboarding, had no mobile experience, and locked data in proprietary formats. The client had three non-technical staff who needed to use the system daily.

**Option C — Custom build.** More upfront cost, but total design control over the data model, workflow, and UI. Given the complexity of the size-grid and batch-stage requirements, and the need for a mobile-first interface usable by floor staff, a custom system was the right call.

The build had to be fast. Ten weeks was the agreed timeline. That shaped every architectural decision.

## Architecture: Three Bounded Contexts

I divided the system into three bounded contexts with clearly owned data:

### 1. Party & Order Management

The `Party` aggregate owned the master record for each customer: name, location, GST number, contact details, and payment terms. Orders were linked to parties and owned the complete specification: line items by size grid, embroidery flags per item, colour codes, delivery date, and priority.

The size-grid data model was the most domain-specific part of the system. A single order line could span up to 12 size buckets (XS through 5XL) each with its own quantity. Instead of twelve columns in a flat table, I modelled the grid as a JSON column on the order line with a typed schema enforced at the application layer. This made the data portable, queryable via PostgreSQL's JSON operators, and writable through a Vue component that mirrored the paper register format the team already understood.

### 2. Production & Batch Workflow

Production was tracked through stage markers, not a process engine. Each order progressed through four stages: `received`, `in_production`, `ready_for_dispatch`, `dispatched`. Stage transitions were triggered by staff action and recorded with a timestamp and actor ID.

I deliberately avoided building a complex workflow engine. The client had three staff. A formal BPMN-style system would have required training and maintenance overhead that outweighed its benefit. Lightweight stage markers with immutable timestamps gave us the audit trail and dispatch-readiness view without the complexity.

Batch tracking was layered on top of order lines. For orders with embroidery or printing, each batch had its own stage and expected completion date. The dashboard surfaced batches past their expected date as a priority queue — the direct replacement for the "who do I call today" mental model the owner had been running manually.

### 3. Billing & Invoice Generation

Billing consumed order and batch data to produce structured invoices. The billing module handled:

- Size-grid arithmetic (sum of all size buckets × unit price per size)
- Per-piece embroidery surcharges (flat rate or percentage, configurable per order)
- GST calculation (CGST + SGST for intra-state, IGST for inter-state)
- Image attachment support (for reference images sent by the customer)
- Printable invoice generation (HTML-to-print via browser print API)

The GST logic was the trickiest part. Indian GST has different treatment depending on whether the transaction is intra-state or inter-state, and the tax rate varies by product category. I built a configurable tax rule table (rate, type, applicable category) that the owner could update without a developer. This avoided hardcoding rules that the government revises periodically.

## The Build Log

**Weeks 1–2: Discovery and schema design.** I spent the first three days doing workflow shadowing — watching two full order-to-dispatch cycles to map every manual step and its failure mode. Schema design followed. The size-grid JSON model, the stage-marker approach, and the GST rule table all came directly from this discovery phase.

**Weeks 3–4: Core data layer and auth.** PostgreSQL schema via Supabase (for managed hosting and real-time capabilities), Laravel backend with DDD structure, role-based access control for Owner / Manager / Floor Staff roles. Basic CRUD for parties, orders, and line items.

**Weeks 5–6: Vue frontend — order entry.** The size-grid order entry component was the most time-intensive UI work. It had to feel as fast as writing in a register. I used a spreadsheet-style input grid with keyboard navigation, real-time total calculations as values changed, and an autosave that persisted to the database every 30 seconds to protect against accidental browser close.

**Weeks 7–8: Production dashboard and batch tracking.** The floor staff dashboard was intentionally different from the owner dashboard. Floor staff saw a single-day view: orders in production today, batches due today, items flagged for dispatch. The owner saw a weekly view with cycle time metrics and a late-dispatch count. Both dashboards ran from the same API endpoints with role-filtered responses.

**Weeks 9–10: Billing, invoice print, and cutover.** GST billing module, invoice generation, image attachments, and the paper-to-digital cutover plan. The cutover was run in parallel for one week — paper registers and the ERP ran simultaneously so the team could build confidence before the paper registers were retired.

## Outcomes After 6 Weeks in Production

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Order-to-dispatch cycle time | 11 days avg | 4.5 days avg | **−59%** |
| Late dispatch rate | ~28% of orders | ~16% of orders | **−43%** |
| Escalation response time | 9 hours avg | 2.4 hours avg | **−73%** |
| Billing errors per week | 4–6 | 0–1 | **−85%** |
| Owner time on coordination | ~4 hrs/day | ~1 hr/day | **−75%** |

The owner's first comment after week 6: "I came in on a Monday and didn't have to open WhatsApp to know what was happening."

## What I Would Do Differently

**Introduce webhooks earlier.** The client started asking for WhatsApp dispatch notifications in week 8. I had to retrofit a notification layer. If I had designed an event-publishing hook from the batch stage-transition logic in week 4, adding any notification channel would have been a config change, not a code change.

**Build the mobile UI in parallel.** I built desktop-first and responsive-second. Floor staff on the production floor use phones. The responsive design worked but felt like an adaptation rather than a native mobile experience. A bottom-navigation mobile layout would have increased floor staff adoption speed.

## Architecture Principles That Transferred

Three decisions from this build have become defaults in my subsequent work:

1. **Shadow the workflow before modelling the data.** The size-grid JSON model only made sense after watching how the paper register was actually used. The database schema should mirror the mental model of the user, not the convenience of the developer.

2. **Stage markers over workflow engines for small teams.** Full process engines (Temporal, Laravel Workflow) are powerful but carry maintenance weight. For teams under 20 people, immutable stage markers with timestamps give you 80% of the audit and visibility benefit at 10% of the complexity.

3. **Make the power-user flow keyboard-driven.** The order entry grid with tab-navigation and autosave turned a 12-minute manual registration process into a 3-minute digital one. Speed of data entry is a feature for businesses that enter hundreds of order lines per week.
