# Shared Artificial Social Actor — Prototype 01

Working browser MVP, version 0.1.0. **Scripted interaction, not an LLM or participant study.**

## Run

No package installation or build is required. From the repository root:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/prototype.html`. Use an HTTP server rather than opening the file directly because the app imports ES modules. The published prototype is at [xuechuzhang.github.io/prototype.html](https://xuechuzhang.github.io/prototype.html).

## Try the core assumption

1. Select shared identity, slot 1, and a rotation. Start after acknowledging demo mode; choose **Sketch a plan**.
2. Open the slot 2 link in a separate tab with the same settings; choose **Ask what people need**. The name is the same and the scripted response differs.
3. Switch to separate identity before starting a fresh session: the three slots receive different character names.
4. Finish three turns. Inspect the public handoff; it excludes the private choices and transcript.
5. Choose seven days in a fresh walkthrough. The interface computes a real eligibility timestamp but labels the early handoff as a **clock simulation**.
6. Explore the payoff calculator. Its three sliders are illustrative inputs from one visitor, not the choices of connected participants.
7. Select **Inspect demo record · JSON** to review this page's choices, transcript and events without a download. The view updates as the session advances and is cleared by reset. Illustrative payoff inputs are not recorded.
8. Request a JSON download if needed. The page cannot confirm the browser saved it; the same record remains inspectable on the page. Nothing is uploaded, and files already downloaded remain on your device after reset.

Public query parameters: `identity=shared|separate`, `delay=0|7`, `slot=1|2|3`, `rotation=0|1|2`. Parameters contain configuration only, not conversation data.

## Interface walkthrough

[Watch the 42-second captioned demo](../assets/demo/prototype01-walkthrough.mp4). It is assembled from actual live interface captures, not a continuous recording or a human study. See [capture provenance](../assets/demo/README.md).

## Test

```sh
node --test tests/prototype.test.mjs
node --check prototype/app.mjs
python3 tests/check-site.py
```

Tests cover configuration, identity mapping/rotation, branch personalization, independent state, handoff fields, transition guards, seven-day arithmetic/simulation labeling, event/export copying, and payoff rules. These are software checks, not psychological validation. See the [verification report](../docs/verification.md).

## What works and what does not

Implemented: independent page instances; stable identity; three-turn choice-based personalization; condition controls and locking; state management; ordered events; inline record inspection and local JSON export; reset of private text and record disclosures; handoff timing; facilitator/task preview; illustrative payoff arithmetic.

Not implemented: open-ended generation, relational efficacy, authentication, durable research storage, randomized recruitment, follow-up scheduling, linked groups, synchronous human conversation, or participant payments. The public page is a reviewer walkthrough and reveals condition controls. Do not recruit participants through it as a confirmatory study system.

Browser-memory separation is not an authorization/security boundary. No research server receives the transcript, but the browser owner can inspect local state. Ordinary web hosting receives page requests.

## Architecture and research documents

- [Architecture SVG](../assets/research/prototype-architecture.svg)
- [Technical specification](../docs/prototype-spec.md)
- [Draft pilot protocol](../docs/pilot-protocol.md)
- [Iteration log](../docs/iteration-log.md)
- [Portfolio audit and file plan](../docs/upgrade-plan.md)

## Provenance

Research question and temporal extension: Xuechu Zhang, with Dr. Chen Zhou, building on the lab's existing shared-character paradigm. This code is a new AI-assisted implementation developed with Codex during the portfolio upgrade. It is not attributed to Xuechu as an earlier independently completed engineering project, nor claimed to be an approved lab implementation. Review and understanding of the code should precede claims of personal technical expertise.
