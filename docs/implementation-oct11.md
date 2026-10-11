# Research + Build + Study upgrade — 11 October 2026

## Audit, scope and priorities

Baseline: `03a946b0c4ed1684531844fa6189ee2e0f2c6a1d`. All 62 local repository files matched the remote blob tree before this task. The project is static HTML/CSS and native ES modules, with no framework, package dependency, build, type-check or lint configuration. GitHub Pages publishes `main` at the repository root. No repository AGENTS instructions were found.

**Keep:** editorial white/rose visual design; five primary navigation entries; protected About, Publications, CV/PDF, supplied photos, navigation script, three empirical case descriptions and canonical samples/findings; existing working shared-character prototype/video.

**Change:** make the headline and research question explicit; add the missing third policy, initial judgment and chosen strategy; align architecture and documentation with the implementation. **Add:** a runnable Home embed, shared-actor project page, and source-labeled impact catalog. No model/backend migration or fabricated human evidence.

Priorities implemented in order: (1) research identity and verified evidence presentation; (2) one complete three-mode interaction rather than many partial features; (3) visible navigation from evidence to build to shared-actor vision; (4) reproducibility/provenance and verification. Scenarios and original empirical data were not replaced.

## Major changes: problem, file plan, behavior, evidence, limitation

| Original problem | Files/components changed | Implemented behavior | Verification evidence | Remaining limitation |
| --- | --- | --- | --- | --- |
| The opening and next project routes did not make the full agenda explicit | `index.html`, `research.html`, `assets/portfolio.css` | Question-led headline; Observe → Build → Scale; project navigation to runnable build, Shared Actors and Impact; retain primary navigation | 246 static local/artifact links and anchors; protected-content checker; live headline and three preview routes | A research narrative does not establish causality or engineering independence |
| Two modes lacked initial interpretation and an explicit strategy | `scaffolding/policies.mjs`, `engine.mjs`, `app.mjs`, `preview.mjs`, `scaffolding.html`, `demo.css`, `tests/scaffolding.test.mjs` | Three routes, own initial reading, five scaffold prompts, four allowlisted strategy choices, own response, withdrawal, new unaided task, transparent review, errors/reset | 15 Prototype 02 tests; six mode/scenario combinations and guards; live complete routes for all three modes, empty-input errors, strategy, review/reset/reload | Scripts are authored; strategies are self-report, not NLP classification; routes differ in effort/practice |
| A reviewer had to leave the narrative to try the build | `index.html`, `assets/build-embed.mjs`, `assets/portfolio.css`, embedded layout in `scaffolding/app.mjs`/`demo.css` | Lazy-load the same full working demo; switch wide/up-to-390px iframe viewport without replacing session | Live full scaffold route in up-to-390px iframe; resize preserves typed input and review phase; measured no horizontal overflow | 390px desktop iframe is not a physical mobile/cross-browser test; iframe load only confirms page load, not end-to-end functionality |
| Community scale was only a section, with potential confusion about multi-user implementation | `shared-actors.html`, `assets/research/shared-vision.svg`, Home/Research links | Dedicated build/study case links to working Prototype 01, existing capture video, real code/spec; proposed group design and norm questions labeled | Nine unchanged Prototype 01 tests; new page, schematic and architecture load; existing video metadata reports 42 seconds | No live group, generative agent, persistent study memory, real follow-up or normative-effect data |
| Public translation and reach were not inspectable with provenance | `impact.html`, `assets/content/impact.json`, `scripts/render-impact.py`, Home impact block | Shared source records for guide/peer resources/public materials/student service; self-reported views distinct from participant or effect counts | Generated Home/Impact records match; source CV/case summary retained; live page shows four records and labeled 1M+/100k+ exposure | No analytics export, unique viewers, public guide/post URL, or evaluated social-impact outcome supplied |
| Diagrams and docs described the older two-mode flow | `scaffolding-transfer.svg`, `scaffolding-architecture.svg`, `scaffolding/README.md`, root `README.md`, this report, `verification.md`, `iteration-log.md` | Actual three policies and seven phases; data/events/limits documented; future components dashed and labeled | All research SVGs parse as XML; three revised/new diagrams visually inspected on the public site; schema/flow matches source tests | Exact diagrams document the system, not measured participant effects |

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
- Native syntax checks passed for every scaffolding module and the embed controller. All research SVGs parsed as XML. The static checker passed nine HTML pages and 246 local/artifact links and anchors. Five primary navigation entries, three empirical cases, About/Publications/CV, original navigation script, and CV PDF match protected snapshots.
- Static inspection found no persistent storage, collection API, or dynamic HTML insertion in either demo. This is not a security audit.
- Current diagrams are exact code-native schematics. No inferential chart or effect size was invented.

### Live publication and interface checks

The implementation commit `0e8d6ba4a8aee8d5bc7147dd38b4fd4da317c285` published successfully through GitHub Pages run [38168426855](https://github.com/xuechuzhang/xuechuzhang.github.io/actions/runs/38168426855). The following were observed through the public interface in desktop Chrome; inputs were fictional, agent-entered test text.

- Home displays the requested headline, research question and Observe → Build → Scale. All three preview radios change authored content, policy identity and the real continuation URL. The preview does not create a visitor record. A final screenshot records the published Home appearance.
- Scaffold/team route completed all seven phases using keyboard Enter. Empty initial reading and an unselected strategy displayed specific errors without advancing. Five reflections led to the strategy menu; selecting clarify exposed its definition; writing an owned response led to withdrawal.
- The new unaided scenario displayed a different person/context. There were zero earlier-history elements in the active screen; the policy trace was hidden and its text empty. Review contained the actual own responses, initial reading and selected strategy. Its inline record showed schema v3, five reflections, ordered minimal events, and `notResearchData: true`.
- Independent/plans and Direct/plans routes both reached review. Independent supplied no candidate reading/action/draft. Direct displayed its authored example and inserted the candidate into the editable response field. Both required strategy/own response and an explicit new-task transition.
- Reset cleared visible progress/history/record, hid the trace, unlocked controls and cycled mode. Reload restored ready state with no response textbox or prior text. Back-cache behavior is implemented but was not separately retested in this pass.
- Opening Home’s embed loaded the same real prototype. A typed initial answer survived a width change to 390px; the measured iframe was 388px inside its bordered wrapper, with a 373px content viewport/scroll width. The full scaffold flow then reached review in the narrow frame. Switching to full width preserved the review phase. This is a desktop iframe viewport check, not a physical-phone test.
- Shared Actors and Impact opened via project links. The proposed shared-study schematic and existing architecture loaded at natural width 980. The existing video loaded with readyState 4 and duration 42 seconds. This pass verified media loading/metadata, not continuous playback or caption usability.
- Impact displayed four sourced contribution records and explicitly labeled self-reported 1M+/100k+ cumulative views. No unique-viewer, participant-total or evaluated-benefit claim was added.
- The new shared-study schematic and updated flow/architecture were visually inspected, without observed clipping of their labels. No page-level horizontal overflow was observed on Home, Shared Actors and Impact; the narrow active demo also had no horizontal overflow. Research source integrity was checked; all individual external links and protected-page live layouts were not exhaustively rechecked.

The tooling initially returned a prior-state Home screenshot immediately after a radio switch; a later checked-state/content observation confirmed the new mode. Inspection uses the verified DOM state rather than that lagging image. A heading query unsupported by the browser wrapper was replaced with an explicit `h1` selector. Captured error messages came from a browser extension, not the portfolio; no portfolio error is inferred from them. These observations do not constitute an exhaustive console/security/accessibility audit.

Local SVG rasterization was unavailable because its optional conversion library was not installed. Exact SVG XML checks and visual inspection in the actual browser were used instead. No replacement imagery was fabricated. The initial missing report link was resolved before publication.

Human usability feedback, pilot data, experimental manipulation validity and confirmatory outcomes remain untested. No claim of simulated human behavior is converted into evidence of social impact. Physical mobile, other browsers and screen readers were not tested.

## Evidence categories

1. **Completed and source-verified:** successful live deployment, all three complete demo routes, empty-input/strategy guards, reset/reload, transfer display boundary, embedded narrow flow and state retention, exact diagrams, source-labeled records, 24 tests and static integrity checks.
2. **Implemented but not fully verified:** responsive/focus/ARIA implementation has limited desktop and narrow-frame checks; physical mobile, other browsers, screen readers and back-cache behavior were not fully rechecked. Production security is not supplied by the static demo. Continuous video playback/caption usability were not tested.
3. **Simulated or illustrative:** authored “AI” responses, fictional situations, single-visitor group/payoff preview, early seven-day handoff, qualitative research schematics. Existing video is assembled from real UI captures, not a continuous human-study recording.
4. **Proposed, not implemented:** LLM adapter/classification/scoring, randomized study deployment, recruitment/consent/backend, linked groups, real follow-up scheduling/payments, human learning/relational/norm effects.
