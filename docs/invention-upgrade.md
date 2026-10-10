# Research + Invention — audit, decisions, and file plan

10 October 2026. Baseline: `f68e18de9ca440e313d7e236b02501c5940cbba5`. All 58 remote files matched the local workspace before this update.

## What stays, changes, and is added

**Keep:** static HTML/CSS/native ES modules, the white/rose editorial design, five-item main navigation, verified study samples and preliminary findings, authorship/status distinctions, two empirical foundation cases, About photographs, Publications, CV/PDF, the existing shared-character engine, and the real 42-second capture-based walkthrough.

**Change:** Home now follows Observe → Build → Scale, with both real demos accessible from its hero. The first-state policy preview uses the same engine as the full demo. Detailed academic background remains subordinate. Three flagship cases use Question → Invention → Mechanism → Evidence → Next Experiment. The empirical case describes a research method, not a newly invented AI implementation.

**Add:** versioned assistance policies, six-step scaffolding, public configuration routing, ordered local events, a live trace inspector, state validation, transfer-screen withholding, a Scaffolding AI case, and a diagram of actual implementation. No model, account system, database, recruited pilot, or new behavioral result is added.

The headline is a research question. Strengthening human capacity is a design aim, not an established capability of these prototypes. “Scale” denotes a broader social question, not deployed multi-user infrastructure.

## Prioritized plan

1. **Accuracy and narrative:** preserve evidence; make empirical motivation, working artifacts, and next experiments visible in a short first pass.
2. **Inspectable implementation:** separate policy, scenarios, state, and rendering; expose a local trace; test withdrawal and reset boundaries.
3. **Next research version:** pilot stimuli and manipulation, then add approved study infrastructure if needed. Generative responses and multi-user persistence remain contingent on the research design.

No framework migration or new dependency is justified. GitHub Pages can support the present browser demonstrations; it cannot itself perform server-side authorization, private study storage, or scheduling.

## Prototype audits

| Boundary | Shared actor / Prototype 01 | Scaffolding AI / Prototype 02 v0.2.0 |
| --- | --- | --- |
| Identity/policy | Public, continuing character registry; shared/separate mapping | Immutable, versioned answer-supply or guided-judgment policy |
| Personalization | Authored response branches from this page's three choices | Fixed prompts; visitor-authored reflections; no semantic adaptation |
| Private state | Page-local choices, transcript, events | Page-local reflections, drafts, phase, step, events |
| Shared mutable state | None; configuration/identity is public | None; policies and scenarios are public |
| Actual simultaneous users | Independent page instances only; no connected people | Independent page instances only |
| Persistence | None; reset/navigation/reload clears state; explicit local export remains on device | None; reset/navigation/reload clears state; inline review only |
| Human handoff | Metadata whitelist; illustrative payoff/task preview | New fictional task without prior help; no real human exchange |
| Isolation evidence | State-independence and handoff tests; prior observed separate-tab walkthroughs | Independent-state and copied-record tests; transfer view and trace withholding |
| Authorization/security | No server, authentication, or protected storage | No server, authentication, or protected storage |
| Behavioral evidence | No pilot, group effect, or actual seven-day follow-up | No pilot, learning score, repeated exposure, or human spillover result |

Page-local separation is a software boundary, not a production confidentiality guarantee. The browser owner can inspect client code and state. Static hosting still handles ordinary page requests. The code contains no research collection endpoint or persistent browser storage.

### What real multi-user work would require

A study version needs authenticated or securely authorized session access, assignment and group identifiers, private records keyed to the individual, an explicit shared-character registry, transactional state updates, facilitator/group scheduling, consent/retention rules, and auditable server-side handoffs. Cross-user state must contain only fields justified by the study and never silently import private conversations. These services are not implemented here.

## Prototype 02 technical specification

- **Configuration:** allowlisted mode and one of two fictional scenario pairs. URL parameters contain no responses or progress.
- **Policies:** substitution supplies Interpret → Recommend → Draft. Scaffolding requires Uncertainty → Evidence → Perspective → Alternatives → Check → Own response. The router follows explicit configuration and step state; it does not diagnose a visitor or select prompts from their semantics.
- **State:** software/policy version, scenario, mode, phase, step, reflections, assisted response, unaided response, ordered events. Illegal mode/version/phase/step combinations and empty/oversized text are rejected.
- **Transitions:** assistance → withdrawal → transfer → review. Each accepted transition returns new state and appends an event. Six reflections are required before scaffolding ends.
- **Events:** sequence, timestamp, type, and minimal metadata. Payloads contain step IDs and character counts, not duplicate free text. Invalid or decreasing timestamps are rejected. Client event times are not validated behavioral measurements.
- **Rendering:** text nodes, labeled textareas, status messages, control locking, and heading focus. No dynamic HTML insertion.
- **Withdrawal:** the transfer view contains only phase, novel situation title, and context. Prior prompts, answers, and trace are not shown. The final review can inspect drafts and copied local records. This is UI-level withholding, not a claim that a participant forgets prior help or cannot inspect source.
- **Lifecycle:** reset, reload, navigation, and back-cache restoration clear the local session. No model request, backend, synchronization, research upload, or automated scoring.

### Scripted versus generative

Scripts maximize inspectability and control but provide limited responsiveness. A generative adapter could offer contingent wording but introduces output variability and dependence on model/prompt versions. A hybrid could preserve a fixed policy while allowing bounded phrasing. Both alternatives are future designs.

A future adapter would use only the current session's private input, construct a policy-specific prompt, validate an allowlisted structured response, bound retries/timeout, fail safely to an authored response when appropriate, and log exact model/prompt versions. No prompt construction, response parsing, API secret, or LLM evaluation currently runs in this static client.

## Proposed behavioral evaluation

Hypothesis: following matched exposure, the scaffolding package produces stronger independently generated responses on novel tasks than substitution. This is untested and concerns the whole package, not the causal contribution of one prompt.

Pilot task ambiguity, difficulty, comprehension, perceived support, and the acceptability of the interaction. Obtain an unaided baseline, randomized assistance, novel immediate and delayed tasks, and reliable ratings blind to condition. Consider a no-assistance reference. Prespecify the primary outcome, contrast, meaningful target effect, missingness handling, and participant/scenario dependence before collection.

Time, reading, effort, practice, and supplied information differ between these routes and need a defensible treatment/control design. Ownership is a separate self-report, not a competence score. Human–human spillover requires an actual subsequent human interaction. A public walkthrough with revealed conditions cannot establish intervention efficacy.

## Ownership and implementation provenance

Research framing and the ongoing projects: Xuechu's described work with Professor Angel Hsing-Chi Hwang and Dr. Chen Zhou; the shared-character paradigm originates in the lab. New portfolio implementation: Codex-assisted development under Xuechu's requested brief. Validation recorded here: software tests and agent-operated UI checks. No independent prior engineering authorship, user-performed code review, lab approval, or human usability feedback is inferred.

To continue maintaining this build, inspect policies first, then the state engine, its transition tests, and the DOM renderer. The README names the components and their boundaries.

## File-by-file changes

| Files | Change |
| --- | --- |
| `index.html`, `assets/portfolio.css` | Observe → Build → Scale, two demo entrances, shared-engine preview, evidence and implementation hierarchy |
| `research.html` | Three flagship cases and preserved empirical foundations |
| `scaffolding.html`, `scaffolding/demo.css` | Policy/stage display, live trace, implementation diagram, accessible controls |
| `scaffolding/policies.mjs` | Versioned immutable policies and allowlisted public configuration |
| `scaffolding/scenarios.mjs` | Preserve scenarios; move prompts to the policy module |
| `scaffolding/engine.mjs` | Policy/state checks, ordered events, copied records, trace and transfer whitelist |
| `scaffolding/app.mjs` | Rendering, trace withholding, configuration, navigation clearing |
| `scaffolding/preview.mjs` | First-state Home preview using the full demo engine |
| `assets/research/scaffolding-architecture.svg`, `scaffolding-transfer.svg` | Actual architecture and updated six-step route |
| `tests/scaffolding.test.mjs`, `tests/check-site.py` | New policy/event/lifecycle-boundary checks and local import checks |
| `tests/baseline-integrity.json` | Authorized flagship narrative snapshot; protected secondary files stay pinned |
| `README.md`, `scaffolding/README.md` | Entry points, reproducibility, policy architecture and trade-offs |
| `docs/invention-upgrade.md`, `verification.md`, `iteration-log.md` | Audit/specification, observed checks, iteration decisions |

## Verification scope

Source tests are separate from browser observation; both are separate from recruited usability feedback and psychological evidence. See [verification](verification.md). No framework build, lint, type-check, or package installation exists in this buildless codebase. Mobile/cross-browser and production security remain explicit verification limits until observed.
