# Research + Build + Study upgrade — 11 October 2026

## Audit, scope and priorities

Baseline: `03a946b0c4ed1684531844fa6189ee2e0f2c6a1d`. All 62 local repository files matched the remote blob tree before this task. The project is static HTML/CSS and native ES modules, with no framework, package dependency, build, type-check or lint configuration. GitHub Pages publishes `main` at the repository root. No repository AGENTS instructions were found.

**Keep:** editorial white/rose visual design; five primary navigation entries; protected About, Publications, CV/PDF, supplied photos, navigation script, three empirical case descriptions and canonical samples/findings; existing working shared-character prototype/video.

**Change:** make the headline and research question explicit; add the missing third policy, initial judgment and chosen strategy; align architecture and documentation with the implementation. **Add:** a runnable Home embed, shared-actor project page, and source-labeled impact catalog. No model/backend migration or fabricated human evidence.

Priorities implemented in order: (1) research identity and verified evidence presentation; (2) one complete three-mode interaction rather than many partial features; (3) visible navigation from evidence to build to shared-actor vision; (4) reproducibility/provenance and verification. Scenarios and original empirical data were not replaced.

## Major changes: problem, file plan, behavior, evidence, limitation

| Original problem | Files/components changed | Implemented behavior | Verification evidence | Remaining limitation |
| --- | --- | --- | --- | --- |
| The opening and next project routes did not make the full agenda explicit | `index.html`, `research.html`, `assets/portfolio.css` | Question-led headline; Observe → Build → Scale; project navigation to runnable build, Shared Actors and Impact; retain primary navigation | Static links/anchors and protected-content checker; live checks recorded below | A research narrative does not establish causality or engineering independence |
| Two modes lacked initial interpretation and an explicit strategy | `scaffolding/policies.mjs`, `engine.mjs`, `app.mjs`, `preview.mjs`, `scaffolding.html`, `demo.css`, `tests/scaffolding.test.mjs` | Three routes, own initial reading, five scaffold prompts, four allowlisted strategy choices, own response, withdrawal, new unaided task, transparent review, errors/reset | 15 Prototype 02 tests covering six mode/scenario combinations and guards; syntax checks; live checks below | Scripts are authored; strategies are self-report, not NLP classification; routes differ in effort/practice |
| A reviewer had to leave the narrative to try the build | `index.html`, `assets/build-embed.mjs`, `assets/portfolio.css`, embedded layout in `scaffolding/app.mjs`/`demo.css` | Lazy-load the same full working demo; switch wide/up-to-390px iframe viewport without replacing session | Live iframe interactions and state retention to be recorded below | 390px desktop iframe is not a physical mobile/cross-browser test; iframe load only confirms page load, not end-to-end functionality |
| Community scale was only a section, with potential confusion about multi-user implementation | `shared-actors.html`, `assets/research/shared-vision.svg`, Home/Research links | Dedicated build/study case links to working Prototype 01, existing capture video, real code/spec; proposed group design and norm questions labeled | Static link checks and Prototype 01’s nine tests; live page inspection below | No live group, generative agent, persistent study memory, real follow-up or normative-effect data |
| Public translation and reach were not inspectable with provenance | `impact.html`, `assets/content/impact.json`, `scripts/render-impact.py`, Home impact block | Shared source records for guide/peer resources/public materials/student service; self-reported views distinct from participant or effect counts | Renderer check agrees on Home/Impact; source CV and case summary retained; live page check below | No analytics export, unique viewers, public guide/post URL, or evaluated social-impact outcome supplied |
| Diagrams and docs described the older two-mode flow | `scaffolding-transfer.svg`, `scaffolding-architecture.svg`, `scaffolding/README.md`, root `README.md`, this report, `verification.md`, `iteration-log.md` | Actual three policies and seven phases; data/events/limits documented; future components dashed and labeled | XML/syntax checks and alignment with engine tests; visual checks below | Exact diagrams document the system, not measured participant effects |

## Prototype 02 technical specification

### Implemented components and state

Public configuration selects immutable policy and scenario content. The pure engine validates phase, policy/version, reflection sequence, text bounds, selected strategy and event ordering. The DOM controller renders through text nodes and locks condition controls while a session is active.

Phases: `initial → assistance → strategy → response → withdrawal → transfer → review`. Direct AI offers an authored interpretation/action/draft. Scaffold requires five written reflections. Independent Reflection has no candidate interpretation/action/draft. All modes share an initial reading, strategy menu, own response and novel task. The menu itself can influence reflection; this is not a passive control.

State: software/policy versions, mode/scenario, phase/step, own initial interpretation, reflections, strategy ID, first response, unaided response, and ordered events. Record schema: `prototype02.demo.v3`, `notResearchData: true`. Events have sequence/time/type and minimal IDs or character counts, not free text. A client timestamp does not prove exposure/effort. No score/classifier exists.

During transfer, the engine view contains only phase, novel title and context. The UI clears earlier history/draft/strategy/trace; local memory retains them for review. Reset, reload and navigation discard state. This is a display boundary, not production privacy or prevention of outside help.

### Data boundaries and dependencies

No model credentials, external library, server, automatic storage/export, collection endpoint, analytics integration, or research participant data. Hosting still handles ordinary page requests. Home embeds `scaffolding.html` itself; it does not duplicate the engine. Changing width keeps the same iframe instance. The small Home policy preview reads real authored entries and creates no fabricated visitor record.

Prototype 01 is retained: public character registry/rotation, private page choices/history/events, explicit local export, public-metadata handoff, seven-day timestamp arithmetic with early-handoff simulation label, and illustrative payoff arithmetic. It has no authenticated/shared backend.

### Minimal test plan and human-study boundary

Software: complete each mode/scenario; reject missing initial text/strategy and illegal jumps; withhold help during novel task; inspect detached record and minimal trace; reset/reload; compare policy-preview routing; exercise frame width and public links. Source tests check no collection/storage API, protected content, links, SVG and generated evidence consistency.

Proposed human research is separate: pilot stimuli/comprehension and a defensible effort/exposure manipulation; ethics/consent; unaided baseline; random assignment; prespecified primary contrast and reliable blinded ratings; delayed and human-interaction transfer only with appropriate design. Group study power is in independent groups. No pilot/confirmatory recruitment, approved deployment, classifier, LLM or human effect is claimed here.

## Verification performed

### Before publication

- 24 automated tests passed: nine unchanged Prototype 01 checks and 15 Prototype 02 checks.
- Both evidence renderers passed check mode; Home/Research agree on supplied samples and preliminary directions, Home/Impact agree on source-labeled reach/status.
- Native module syntax, SVG XML, static links/anchors, protected files/cases and lack of collection/persistence APIs are checked in the publication pass.
- Current diagrams are exact code-native schematics. No inferential chart or effect size was invented.

### Live publication and interface checks

Pending deployment and direct public-interface observation. This section will be updated with actual results, including any incomplete paths. No live or mobile pass is asserted in advance.

## Evidence categories

1. **Completed and source-verified:** three-mode engine/UI code, actual flow/architecture, sourced static evidence/impact records, dedicated pages and links, reproducible tests/docs. Live deployment behavior is recorded separately after observation.
2. **Implemented but not fully verified:** screen-reader conformance, physical mobile/cross-browser usability, production security. Native source checks alone do not establish these.
3. **Simulated or illustrative:** authored “AI” responses, fictional situations, single-visitor group/payoff preview, early seven-day handoff, qualitative research schematics. Existing video is assembled from real UI captures, not a continuous human-study recording.
4. **Proposed, not implemented:** LLM adapter/classification/scoring, randomized study deployment, recruitment/consent/backend, linked groups, real follow-up scheduling/payments, human learning/relational/norm effects.
