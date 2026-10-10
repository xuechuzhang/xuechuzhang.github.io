# Prototype 01 — decisions and iteration log

## Initial implementation

1. **Kept the static site.** A new framework would add deployment complexity without helping test identity and private-state logic. Existing empirical cases and assets remain.
2. **Chose scripted branching before an LLM.** This makes responses reproducible and avoids credential/provider setup. The cost is limited dialogue and unestablished relational credibility. A richer agent is a future design choice, not a claimed component.
3. **Separated identity from private content.** The registry holds public identity/principle only. Each page's engine state holds its own choices and transcript. The handoff uses a small explicit whitelist.
4. **Kept only temporary page state.** No persistent browser storage or research backend is used. This deliberately prevents a claim of implemented longitudinal collection.
5. **Labeled seven-day preview as simulation.** The engine rejects an early actual handoff; a separate, marked preview path demonstrates the later UI without pretending a week passed.
6. **Used a payoff explanation rather than a fake group.** The three illustrative inputs belong to one visitor. No live group decisions or experimental outcomes are claimed.
7. **Disclosed implementation assistance.** Research roles are preserved; this new code is described as developed with Codex assistance.

## Evidence at this stage

Nine pure-engine tests passed on the first run; JavaScript syntax checks passed. This establishes the checked logic only. No human usability feedback, manipulation pilot, or confirmatory findings exist. Browser defects and fixes, if observed, are recorded below and in the final verification report rather than invented in advance.

## Next decisions

- Can the brief interaction produce recognizable continuing identity and sufficient responsiveness? Resolve with approved usability/manipulation work.
- Is free conversation necessary? Compare a richer script or other interaction approach before adding a model.
- What infrastructure is needed for actual delayed groups? Resolve authentication, approved storage/scheduling, independent commitments and compensation before recruitment.
- What is the strongest competing explanation? Select a relational or interpretation-boundary extension after the first study and independent replication.

## Live verification and documentation update — 9 October 2026

Observed independent same-character sessions, distinct own-choice responses, the immediate handoff, its public-only fields, and correct illustrative all-ten payoffs. These checks supported keeping the small script engine for the first feasibility build; they did not validate relational experience.

The browser stopped further observation at the JSON-download check because of a credential-state restriction. A fresh runtime remained blocked. We documented the unverified UI paths rather than asserting a complete browser pass. No app defect was inferred from that tooling failure.

A captioned 42-second sequence was made from five real interface captures. The site names it an interface walkthrough rather than a continuous recording. The next implementation pass should complete the missing UI checks, then assess the interaction's comprehension and relational credibility before adding free-form generation or research collection.

## Interface refinement — 9 October 2026

- **Show the interface before the architecture.** The homepage now leads with the existing real walkthrough, keeps architecture available in a disclosure, and separates what is built, what software checks support, and what the next human test must answer. The original research descriptions remain intact.
- **Inspect without downloading.** The previous tooling interruption exposed a reviewability problem: a download was the only way to see the complete demo record. An inline JSON view now shows the same own-session record, updating through completion. It adds no persistence or collection.
- **Correct the download message.** Source review found that the page announced a completed download after merely requesting one. The revised message states what the page can know: a download was requested. It offers the inline record when saving is unavailable.
- **Reset visible evidence as well as state.** Reset now clears the inline record, event log and public handoff, closes their disclosures, and resets the illustrative calculator. Previously the public handoff disclosure could remain open across resets.
- **Keep phone controls compact.** Paired label/select wrappers allow a two-column configuration form. After starting, the active interaction moves above locked configuration on narrow screens. Mobile browser testing is still required; CSS inspection alone does not establish usability.
- **Version changed assets together.** Live review initially loaded the revised HTML with cached earlier CSS: the video figure retained default side margins and its caption used the body font size. Explicit version parameters were added to the changed homepage/prototype styles and prototype script so returning visitors request the corresponding resource revision.

No dialogue engine, research hypothesis, recruitment process or behavioral evidence was added by this refinement. Live UI checks are recorded separately in the verification report.


## Research narrative and Prototype 02 — 10 October 2026

- Lead with the unresolved human question and an empirical pattern; move the shared-character implementation to the community extension while retaining the working MVP and video.
- Preserve the four reported constructs and sample sizes in one data source. Use the same static evidence component on Home and Research to reduce content drift. No coefficient or significance plot can be made from the supplied summary.
- Separate giving a response from practising an interpretation. Two authored routes converge on a novel unaided task; the interface exposes the idea without claiming an AI model or validated intervention.
- Avoid automatic competence scoring. Different situations and one visitor's drafts cannot establish learning; the proposed evaluation requires randomized assignment, reliable blinded ratings, and human transfer.
- Keep private responses in page memory, render them as text, and clear local state on reset. A public walkthrough does not offer production privacy controls or study randomization.
- Retain the supplied tiger artwork on Home, now alongside academic background, so the hero can explain the research question visually. The About portrait and personal biography remain unchanged.

These are implementation/design decisions, not participant feedback. Source checks and live UI observations are recorded separately in `verification.md`.


## 10 October 2026 — Research + Invention, policy v0.2.0

- The three projects already shared a research question but were not labeled as one progression. Home now makes Observe → Build → Scale explicit and brings both functioning demos into its first pass.
- The earlier four reflections mixed scenario content and interaction logic. Policies now own a versioned six-step route; scenario content remains separate. This makes the candidate manipulation easier to inspect and revise, without claiming semantic diagnosis.
- A local ordered event trace was added to make transitions inspectable. Response text remains in the separate private draft/reflection record; event payloads do not duplicate it. This is software provenance, not a behavioral metric.
- The trace could reveal prior assistance during transfer. The transfer whitelist and UI both withhold it until review. Reset/navigation clearing prevents visible progress resurfacing from the browser back cache.
- A heavyweight model/backend migration would not resolve the unvalidated manipulation. Authored scripts were retained, with future model adapters and multi-user infrastructure documented as future work.
- Code was developed with Codex assistance. These are implementation decisions, not participant feedback or invented failures. Source and live observations are recorded separately in verification.
