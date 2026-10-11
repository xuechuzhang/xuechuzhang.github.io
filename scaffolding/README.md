# Scaffolding AI — Prototype 02, v0.3.0

**Status:** working, hand-authored browser interaction. Not an LLM, recruited pilot, competence assessment, or approved research deployment. Developed with Codex assistance; this is a new portfolio artifact, not prior solo engineering or an implementation from the USC study.

**Question:** When AI gets better at helping us communicate, do we become better communicators?

## Run and experience

No framework, credentials, dependencies, or build step is needed. From the repository root:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/scaffolding.html`. HTTP is needed for ES modules. [Public demo](https://xuechuzhang.github.io/scaffolding.html) · [Home with embedded demo](https://xuechuzhang.github.io/#scaffolding-ai).

1. Select a mode and fictional situation. Start and record your initial reading.
2. **Direct AI · scripted:** inspect a candidate reading, action, and editable draft. None is generated from your text.
3. **Scaffolding AI · scripted:** write five reflections about uncertainty, evidence, perspective, alternatives, and checking your conclusion.
4. **Independent Reflection:** receive no candidate interpretation, action, or draft. The same strategy menu and response fields remain; this is not a no-task control.
5. In every mode, choose a strategy and write the response you would send.
6. End the first task and start a new situation. Earlier reasoning, assistance, strategy, draft, and trace are absent from the task screen.
7. Submit an unaided response. Review both drafts, your initial interpretation and selected strategy, and the local demonstration record. No score is generated.
8. **Try another mode** or **Reset local progress** clears state, unlocks controls, and closes the trace. Mode switching does not retain a within-person experimental comparison.

Two authored scenario pairs are included. The same pair is available in all three modes. They are fictional examples, not participant excerpts or validated experimental stimuli. All public conditions are visible and self-selected.

## Actual architecture

| File | Implemented responsibility |
| --- | --- |
| `scaffolding.html` | Three-mode setup, seven-stage progress, scenario select, accessible status, trace disclosure |
| `scenarios.mjs` | Two immutable fictional training/transfer pairs |
| `policies.mjs` | Three immutable v0.3.0 policies; four strategy definitions; allowlisted public configuration |
| `engine.mjs` | Pure transitions, input/state validation, ordered events, transfer whitelist, copied records |
| `app.mjs` | Text-node rendering, forms, errors, focus, own reasoning history, reset and navigation clearing |
| `preview.mjs` | Real authored policy entry on Home; no synthetic visitor input or demo evidence |
| `demo.css` | Responsive setup, fields, stages, history, and embedded-page layout |
| `../assets/build-embed.mjs` | Lazy-load the same demo on Home; change iframe width without recreating its session |

The state sequence is **initial → assistance → strategy → response → withdrawal → transfer → review**. All text submissions require 3–1,200 trimmed characters. A scaffold session cannot skip any of its five prompts. Every route requires a valid strategy ID and first response before the novel task. Empty answers, invalid IDs, illegal phases, and invalid/decreasing event times are rejected.

The URL accepts only known `mode` and `scenario` values and an `embed=1` layout flag. The internal `substitution` key remains for compatibility with prior direct-mode links. Query parameters cannot inject response text or progress.

[Architecture SVG](../assets/research/scaffolding-architecture.svg) · [Implemented flow](../assets/research/scaffolding-transfer.svg) · [Current audit and file-by-file report](../docs/implementation-oct11.md)

## State and data schema

| State field | Meaning |
| --- | --- |
| `version`, `policyId`, `policyVersion` | Software/policy provenance, currently 0.3.0 |
| `mode`, `scenarioId`, `phase`, `step` | Public configuration and current transition state |
| `initialInterpretation` | Own reading, recorded before assistance |
| `reflections` | Zero or five completed `{id, text}` reflections |
| `strategyId` | Self-selected label; not an automated semantic classification |
| `stageOneResponse`, `unaidedResponse` | Own responses in the two distinct situations |
| `events` | Ordered `{sequence, type, at, payload}` implementation trace |

The record uses `schemaVersion: prototype02.demo.v3`, `evidenceType: interaction_design_demo`, and `notResearchData: true`. Response/reflection text belongs in its local text fields; event payloads contain only IDs and character counts. Accepted events are `session_started`, `initial_interpretation_submitted`, `reflection_submitted`, `guidance_completed` or `independent_stage_started`, `strategy_selected`, `first_task_completed`, `transfer_started`, and `transfer_submitted`.

The trace is minimal software provenance, not an effort, competence, attention, or fidelity measure. A client clock/state can be altered. Review and record objects copy mutable data so editing an export cannot alter another session.

## Interaction design and strategy logic

The five authored scaffold prompts are fixed and sequential. They do not diagnose needs or adapt semantically. The shared strategy menu defines **clarify**, **acknowledge**, **express**, and **pause**. Selection is required and recorded without a recommendation or rating. Every mode has the menu, including Independent Reflection; its prompting effect needs to be considered in a real study.

The transfer engine exposes only phase, novel title, and context. The DOM renderer clears earlier content and the event trace, and renders no previous strategy, history, or help. Those data remain in page memory for review. This demonstrates a UI boundary, not erasure of human memory, protection against client inspection, or prevention of outside help.

There is no persistent browser storage, collection endpoint, analytics integration, model call, database, synchronization, or automatic export. Text is inserted through text nodes. Reset/reload/navigation clears page state; a back-cache restore starts fresh. Ordinary hosting receives page requests. Page-memory separation is not production authorization.

## Proposed pilot and study — no data collected

**Hypothesis:** following justified exposure, a scaffold package supports stronger independent responses on new tasks than a direct-answer package. Independent Reflection provides a reference for interpreting possible benefits and costs. These are hypotheses, not findings.

1. Pilot fictional stimulus clarity, ambiguity, difficulty, warmth, and comprehension. Prespecify revision criteria. The current routes differ in time, effort, practice, and information; decide what to match and what the treatment legitimately includes.
2. Following ethics approval and consent, obtain an unaided baseline and randomly assign the three packages. Standardize exposure, scenario order and task demands. Public mode controls are unsuitable for this study.
3. Define a primary new-task outcome: reliable blinded ratings of perspective differentiation, evidence sensitivity, acknowledged uncertainty, and response appropriateness. Ownership remains a separate self-report. No automated score is implemented.
4. Prespecify the scaffold/direct contrast and the role/multiplicity of comparisons with Independent Reflection. Power the chosen target effect and expected missingness; account for participant/scenario dependence in repeated tasks. Report estimates and intervals, adherence, attrition and deviations.
5. Add a delayed novel task and a standardized human–human interaction only with a valid design. Neither a pair of drafts nor “significant now, nonsignificant later” establishes learning, persistence, or spillover. Meaningful-null claims need an equivalence criterion.

Do not recruit participants or enter sensitive real disclosures through this public walkthrough. A study version requires approved data management, access controls, server-side assignment, standardized timing, and suitable compensation.

## What was learned and what comes next

v0.2.0 did not capture initial interpretation or an explicit strategy. v0.3.0 adds these, separates guided reflection from response authorship, and implements the third route. The result makes the candidate manipulation inspectable without inventing a classifier or model adapter. It does not solve exposure/effort confounds or validate the strategy taxonomy.

Next: validate stimuli and ratings, review the policy manipulation, and design approved assignment and collection. A model-generated or hybrid policy could later personalize phrasing; no prompt builder, parser, API adapter, structured model output, model evaluation, or backend is claimed. Secrets must not be placed in a static client.

## Verify

```sh
node --test tests/prototype.test.mjs tests/scaffolding.test.mjs
node --check scaffolding/app.mjs
node --check scaffolding/preview.mjs
node --check assets/build-embed.mjs
python3 scripts/render-research.py --check
python3 scripts/render-impact.py --check
python3 tests/check-site.py
```

Tests cover both scenario pairs across all modes, required initial reading and strategy, rejected transitions/inputs, the transfer boundary, immutable policy routing, independent state, copied records, ordered minimal events, and absence of scores. Browser walkthroughs are recorded separately in the [verification report](../docs/implementation-oct11.md). Software tests are not human usability feedback, pilot data, or confirmatory evidence.
