# Research narrative upgrade — 10 October 2026

## Audit and priorities

The existing site is buildless HTML, CSS, and native JavaScript/ES modules. Five top-level HTML pages form the navigation; project demos are subpages. GitHub Pages deploys `main` from the repository root. There is no application framework, package manager, backend, build/type-check configuration, or runtime content service.

**Keep:** accurate samples, self-report terminology and preliminary status; personal contribution boundaries; existing four research cases; the shared-character demo, video, architecture and protocol; Publications, About, CV and PDF; restrained rose typography and supplied photos.

**Change:** the homepage opened with identity and the shared-character build before presenting its central question or flagship empirical finding. Several later sections repeated the same overview. The new hierarchy is question → mechanisms → empirical evidence → proposed learning test → community extension → supporting research/background.

**Add:** an implemented two-mode interaction-design demo, a withdrawal/transfer schematic, one shared evidence data source and static rendering component, and explicit study/implementation boundaries.

P0 is the revised hero, core framework, and flagship case. P1 is the new functioning demo and documented proposed evaluation. P2 is additive typography, responsive layouts, semantic controls, focus management, and asset reuse. No animation or dependency installation is necessary.

## File-by-file implementation

| Files | Change |
| --- | --- |
| `index.html` | Six-section research narrative, concise preliminary finding in the hero, empirical flagship, demo, shared-character vision/video, support/background; tiger photograph moves to the background section |
| `research.html` | Flagship first; Problem → Idea → Build/Method → Evidence → What This Opens; existing shared-character documentation and two foundational cases retained |
| `assets/portfolio.css` | Scoped editorial layouts, framework/trajectory, evidence component, responsive flow diagrams and reduced dependency on repeated cards |
| `assets/content/ai-communication.json`, `scripts/render-research.py` | One documented source for samples, methods, and preliminary finding directions; generate the same static evidence block on Home and Research; check mode catches drift |
| `assets/research/scaffolding-transfer.svg` | Original, labeled schematic separating current demo behavior from future behavioral evaluation |
| `scaffolding.html`, `scaffolding/*` | Scripted interaction routes, own-response entry, explicit withdrawal, new situation, review, local record, reset, README and study proposal |
| `tests/scaffolding.test.mjs` | Meaningful transition, privacy/view-boundary, validation, and independent-state tests |
| `tests/check-site.py`, `tests/baseline-integrity.json` | Preserve unchanged secondary files/foundational cases; pin the explicitly authorized revised flagship case; check both demos' code boundaries |
| `README.md`, `docs/iteration-log.md`, `docs/verification.md` | New entry points, actual design decisions, checks and remaining limitations |

## Evidence integrity

The previous site at commit `5bec755e4ae19ee453b4d815a42fe4e141e9abf7` is the source for documented research descriptions. Existing samples are Pilot 1 = 55, Pilot 2 = 45, Main = 222. Perceived sincerity, willingness to use AI support, ownership and perspective-taking remain preliminary reported outcomes. No effect sizes, statistical significance, or independent-competence claim is reconstructed from missing raw data.

The future scaffold/substitution comparison is motivated by those findings but was not part of the existing empirical evidence. New scenario text is fictional and authored for the demo. The community extension builds on the existing lab paradigm and Xuechu's temporal-development work, with no disclosed confidential lab slides or unpublished results.

The code is new and developed with Codex assistance. Software tests, reviewer walkthroughs, participant feedback, pilot manipulation evidence and confirmatory research remain separate categories. No recruited usability or behavioral results are claimed.

## Deployment and verification approach

Use the installed GitHub connector to create a tree from the latest remote base and update `main` with an expected-head lease. Upload only changed/new files, not the stale local Git history. Retain public access and the five-item navigation. Run source checks first, then inspect the deployed pages in the existing cloud Chrome browser. No local browser preview is improvised in the managed environment.

The verification report records actual completed checks, not planned checks. A broad mobile/cross-browser, accessibility conformance, security, or behavioral-validity claim requires further work.
