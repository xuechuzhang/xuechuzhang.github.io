# Research + Build + Study upgrade

## A. Audit of the existing portfolio

Baseline: commit `0a41db3f340320a12195b083ef5aa273d3911bf9`, 24 files verified against the GitHub tree before editing.

The website is buildless HTML/CSS/JavaScript, hosted by GitHub Pages from `main` at the repository root. There is no React application, package installation, API service, database, model connection, or implemented agent in the baseline. `assets/site.js` manages the mobile navigation. The five main pages are Home, Research, Publications, About, and CV. Assets include a two-page CV PDF, explanatory SVGs, and research summaries. The original shared-character project describes protocol development; it contains no experimental outcomes.

**Keep:** the five-item navigation, white editorial layout and single accent color; central question; outward research trajectory; accurate samples (55, 45, 222; 69 eligible meta-analyses); existing empirical descriptions, publication statuses, diagrams, and CV.

**Change:** feature the shared-character project only after a working prototype exists; distinguish a technical case study from the empirical cases; add precise implementation and evidence labels. Keep the overarching identity grounded in behavioral research instead of claiming independent engineering experience.

**Add:** a browser prototype, architecture diagram, technical specification, source code, runnable instructions, meaningful software tests, draft pilot protocol, verification record, and a demonstration walkthrough when captured from the real interface.

## B. Priorities and delivery gates

| Priority | Work | Completion criterion |
| --- | --- | --- |
| P0 | Preserve source and inspect links/research claims | Baseline file hashes match GitHub; no unrelated deletion |
| P1 | Implement scripted Prototype 01 | Same public identity can coexist with different private choices in separate page instances |
| P1 | Document and test state/data boundaries | Tests cover conditions, independent states, transitions, delayed eligibility, export, and payoff |
| P2 | Integrate Featured Build and technical case template | Live demo, architecture, code, and study-plan links resolve |
| P2 | Capture a short walkthrough | Actual interface states; synthetic demo clearly identified |
| P3 | Usability and manipulation pilot | Supervisor/ethics approval first; real feedback recorded as pilot evidence, never software evidence |
| P4 | Research backend and study-ready interaction | Authenticated isolated sessions, approved storage/retention, scheduling, and human-group administration |
| P5 | Preregistered experiment and replication | Adequately powered independent groups; no outcome claims before data |

Prototype 01 answers a technical question, not the full psychological question. A public scripted demonstration is insufficient to establish a relationship with a character, a valid shared-reality manipulation, or cooperation effects.

## C. Smallest defensible prototype

Use native HTML forms and ES modules on the existing host. A deterministic response engine is transparent and reproducible, requires no credentials or model charges, and isolates basic interaction logic before adding generation. Its limited conversational flexibility is explicit.

Each opened page runs one participant slot. A public character registry and condition configuration determine identity. Private choices, transcript, and events stay in that page's memory. The engine branches on that session's choices only. No private state is placed in a URL, browser storage, shared character object, server, analytics tool, or another session. Downloading a record is a deliberate local action; exports identify themselves as demo interactions.

The public configuration is shared/separate identity × immediate/seven-day handoff, slot 1–3, and character rotation 0–2. Rotation makes it possible to balance names across a future study. Matching principles and branch responses hold this component constant; they do not prove perceptual equivalence.

After three turns, a timestamp computes handoff eligibility. The seven-day shortcut is a labeled clock simulation, not follow-up data or real scheduling. The group phase is facilitator instructions plus a payoff explanation, not synchronous multi-user conversation or a paid task.

See [technical specification](prototype-spec.md) and [pilot protocol](pilot-protocol.md).

## D. File-by-file plan

| File | Change and reason |
| --- | --- |
| `index.html` | Featured Build before trajectory; project order; methods/architecture and current-study links |
| `research.html` | Shared-character technical case: Question → Original Idea → What I Built → How It Works → Study Design → Evidence → What Failed or Was Learned → Next Version; empirical cases retained |
| `assets/style.css` | Small additive rules for build sections and evidence labels; preserve existing identity |
| `prototype.html` | Accessible demo configuration, interaction, handoff, payoff explanation, export/reset |
| `prototype/engine.mjs` | Pure session/state functions, character mapping, branching, timing, event/export schema |
| `prototype/app.mjs` | Browser rendering, configuration locks, local download, link generation, reset |
| `prototype/prototype.css` | Responsive layout for the actual working interface |
| `prototype/README.md` | Run/configure instructions, technical limits, implementation provenance |
| `assets/research/prototype-architecture.svg` | Implemented components separated from future infrastructure |
| `assets/shared-social-reality-case-summary.txt` | Update artifact stage without inventing results |
| `docs/prototype-spec.md` | Architecture, state logic, requirements, boundaries, trade-offs |
| `docs/pilot-protocol.md` | Draft hypotheses, variables, operational definitions, confounds, analysis, ethics |
| `docs/verification.md` | Tested software behavior versus untested psychological assumptions |
| `docs/iteration-log.md` | Design decisions and observed defects/fixes |
| `tests/prototype.test.mjs` | Meaningful state, privacy-shape, timing, and payment-rule checks |
| `tests/check-site.py`, `tests/baseline-integrity.json` | Static link/anchor checks and pinned integrity of protected empirical facts |
| `README.md` | Root run instructions, evidence stages, source navigation |
| `assets/demo/` | Real interface walkthrough only when captured and verified |

`about.html`, `publications.html`, `cv.html`, the CV PDF, and empirical schematics are preserved unless a concrete defect requires a targeted fix.

## Attribution and application use

The research question, behavioral framing, and temporal extension come from Xuechu's described work with Dr. Chen Zhou, building on the lab's existing paradigm. This prototype is new, AI-assisted implementation developed with Codex during the portfolio upgrade. It is not presented as a previously completed independent build, a lab-approved study system, or a new ML model. Xuechu should review the code and be able to explain or modify it before claiming implementation expertise in an application.

Application alignment reference: [MIT Cyborg Psychology applicant information](https://www.media.mit.edu/groups/cyborg-psychology/applicant-information/). Its emphasis on prototyping, iteration, and human flourishing motivates visible build evidence; it does not imply MIT affiliation or endorsement.
