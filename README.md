# Xuechu Zhang — Research + Build + Study

Academic portfolio at [xuechuzhang.github.io](https://xuechuzhang.github.io/).

I study how artificial social actors reshape human judgment, relationships, and communities. This repository preserves the empirical portfolio and adds a small, inspectable research prototype.

## Start here

- [Question-led portfolio](https://xuechuzhang.github.io/): mechanisms, empirical evidence, future study, and community extension.
- [Scaffolding AI — Prototype 02](https://xuechuzhang.github.io/scaffolding.html): two scripted assistance routes, a new unaided situation, and clearly labeled local demo records.
- [Prototype 02 README and proposed evaluation](scaffolding/README.md)
- [Narrative audit and file plan](docs/narrative-upgrade.md)

- [Working Prototype 01](https://xuechuzhang.github.io/prototype.html): stable character identity, separate private choices, scripted responses, event export, and a group-phase preview.
- [Build + Study case](https://xuechuzhang.github.io/research.html#shared-social-reality)
- [Prototype README](prototype/README.md)
- [Technical specification](docs/prototype-spec.md) · [Architecture](assets/research/prototype-architecture.svg)
- [Draft pilot protocol](docs/pilot-protocol.md)
- [Verification report](docs/verification.md) · [Iteration decisions](docs/iteration-log.md)
- [Audit, priorities, and file plan](docs/upgrade-plan.md)

## Run locally

No framework, dependencies, credentials, or build step is required:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/` or `http://localhost:8000/prototype.html`. Use a local server for the ES modules instead of double-clicking the HTML file.

```sh
node --test tests/prototype.test.mjs tests/scaffolding.test.mjs
node --check prototype/app.mjs
node --check scaffolding/app.mjs
python3 scripts/render-research.py --check
python3 tests/check-site.py
```

The static integrity check pins protected empirical text and files to the verified original content; it works without repository history. These are software/content checks, not participant or psychological evidence.

## Evidence and attribution

Prototype 01 is implemented as a **scripted software demonstration**, not an LLM or a study deployment. No recruited participant pilot, human-group outcome, or actual seven-day follow-up is claimed. Private choices and transcripts stay in the current page's memory; an explicit JSON download saves a local file. No collection endpoint or persistent storage is used by the prototype.

The research question and temporal extension are from Xuechu's described work with Dr. Chen Zhou, building on the lab's existing paradigm. The new prototype was developed with Codex assistance during the portfolio upgrade. It is not described as prior independent engineering work or an approved lab system. Existing research samples, preliminary finding directions, publication statuses, personal contributions, and CV have been preserved. The flagship case is reorganized around the reasoning chain; its shared evidence block is generated from `assets/content/ai-communication.json` by `scripts/render-research.py`. Prototype 02 is a new authored manipulation demonstration, not a result of the USC research.

## Pages and deployment

Main navigation remains Home, Research, Publications, About, and CV. `prototype.html` and `scaffolding.html` are linked project subpages, not additional main-navigation items. The website is static HTML/CSS/JavaScript; `.nojekyll` prevents unwanted Jekyll processing. GitHub Pages publishes from `main` at `/(root)`.

The repository is the source for the GitHub Pages website. The earlier ChatGPT-hosted website is a separate snapshot and is not automatically updated by commits here.
