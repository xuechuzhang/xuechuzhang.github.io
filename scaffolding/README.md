# Scaffolding AI — Prototype 02

**Status:** working, hand-authored interaction-design demonstration. It is not an LLM, recruited pilot, competence assessment, or approved research deployment. Developed with Codex assistance during the portfolio update on 10 October 2026.

## Question and current implementation

When assistance is removed, which interaction pattern better supports independent interpersonal competence?

The public demo makes a candidate manipulation visible:

- **Substitution:** a fixed interpretation, recommendation, and editable draft. The visitor can adopt or rewrite the draft.
- **Scaffolding:** six successive prompts for uncertainty, evidence, perspective, alternatives, checking a conclusion, and an owned response. The visitor writes every answer.
- **Withdrawal:** both routes lead to a distinct situation with another person. The active screen provides no interpretive prompts, suggested action, or draft.
- **Review:** the visitor can compare their two drafts and inspect a clearly labeled local demonstration record. No score or learning inference is produced.

Two fictional scenario pairs are included. Each mode uses the same training case and associated transfer case when the same scenario is selected. These examples are newly authored materials, not anonymized participant conversations or validated experimental stimuli.

## Run and inspect

No framework, credentials, dependency installation, or build is required. From the repository root:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/scaffolding.html`. An HTTP server is needed for native ES modules. The public page is [scaffolding.html](https://xuechuzhang.github.io/scaffolding.html).

Try one complete route, then select **Try the other mode**. This clears the earlier local state and preselects the other mode; it does not retain a within-person experimental comparison. The public control panel reveals conditions, and no randomization is implemented.

## Architecture and state

| Component | Responsibility |
| --- | --- |
| `scaffolding.html` | Semantic setup form, radio controls, scenario selector, accessible status region, research links |
| `scenarios.mjs` | Two authored scenario pairs; no visitor text |
| `policies.mjs` | Versioned, immutable assistance policies and public configuration routing |
| `engine.mjs` | Pure state transitions, validation, ordered events, a phase-specific view whitelist, copied records |
| `preview.mjs` | First-state homepage preview, using the same engine as the full demo |
| `app.mjs` | Reusable DOM builders for headings, buttons, and response forms; safe text-node rendering; control locking and focus management |
| `demo.css` | Responsive setup/interaction layout, keyboard focus styles, comparison and record views |

Version 0.2.0 separates authored interaction policy from state and rendering. State sequence: assistance → withdrawal → transfer → review. Scaffold mode requires all six reflections; substitution mode requires an adopted or rewritten response. Text is bounded to 3–1,200 characters. Illegal transitions and empty answers are rejected.

The transfer view exposes only its new situation, title, and phase. Earlier prompts and responses remain in this page's memory for the final review but are not rendered during the unaided task. The technical trace is also withheld during transfer. Reset, reload, and navigation discard the local state; a browser back-cache restore starts fresh. This is a UI-level withdrawal demonstration, not a guarantee that a participant cannot remember help, inspect client code, or open another tab.

## Policy and event trace

`policyFor(mode)` resolves a versioned authored package. The system does **not** infer which prompt a visitor needs: routing is determined by public configuration, phase, and step. Query parameters can select only `mode` and a known scenario; they cannot inject visitor responses or change progress.

Each accepted transition appends an event with sequence, a caller-supplied timestamp, type, and minimal metadata. Reflection events name the step and character count; they do not duplicate free text. The engine rejects invalid or decreasing event times and returns new state objects. The live inspector exposes policy version, phase, and copied event objects. Full local response text is inspectable only in the completed demonstration record, labeled `notResearchData: true`.

The trace supports reproducing software transitions. It is not an attention, effort, competence, or treatment-fidelity measure. A client clock and client state can be altered; real studies need server-side records and assignment.

[Architecture SVG](../assets/research/scaffolding-architecture.svg) · [Combined prototype audit and file plan](../docs/invention-upgrade.md)

## Data boundaries

There is no persistent browser storage, collection endpoint, model request, analytics integration, synchronization, or automatic file export. Visitor text is inserted as text nodes. The inspectable record states `notResearchData: true` and contains only this page's local demonstration inputs. Ordinary hosting handles page requests; local memory is not a production security boundary.

Do not enter real interpersonal disclosures or recruit a confirmatory sample through this public reviewer walkthrough. A study version needs an approved consent/data-management flow, access controls, server-side assignment, standardized exposure and timing, and suitable compensation.

## Proposed study, separate from the demo

**Hypothesis:** following matched exposure, scaffolding produces stronger independently generated responses on new tasks than substitution. This is a proposed hypothesis, not a finding. The whole prompt package is compared; a two-condition contrast would not isolate which prompt causes an effect.

1. Pilot stimulus clarity, interpretation ambiguity, task difficulty, and perceived support. Decide pilot criteria and revision rules before recruiting.
2. Randomly assign participants to the two assistance packages; consider a no-assistance reference to distinguish benefits from costs. Balance scenario order, response quality, duration, and task demands as far as the theory permits.
3. Obtain an unaided baseline, immediate transfer on a novel case, and a prespecified delayed transfer task. Repeated training is future work; the demo contains only one assisted case.
4. Prespecify a rubric for perspective differentiation, evidence-sensitive interpretation, acknowledgment of uncertainty, and appropriateness of an independently written response. Develop reliable ratings with coders blind to condition. Ownership is a separate self-report, not a competence score.
5. Test a subsequent standardized human–human interaction to assess spillover. Drafts in a public walkthrough cannot establish real relational effects.
6. Choose a primary outcome and contrast before collection. Estimate sample size from a defensible target effect and expected missingness; for repeated tasks, account for participant and scenario dependence. Report estimates and confidence intervals, adherence, attrition, and deviations. Avoid interpreting a nonsignificant contrast as equivalence without a planned criterion.

### Current limitations and next version

The prompt routes differ in effort, reading, time, and practice opportunities. Those are potential mechanisms and confounds requiring a defensible design; the current demo does not match them. Different task contexts make individual draft comparisons illustrative. No model quality, participant experience, reliable rating, or learning effect has been evaluated.

The next version should improve stimulus matching and pilot comprehension before adding generative responses or repeated-session infrastructure. A helpful-looking interaction is not evidence of improved competence.

## Verify

```sh
node --test tests/scaffolding.test.mjs
node --check scaffolding/app.mjs
python3 scripts/render-research.py --check
python3 tests/check-site.py
```

Software checks address allowed transitions, input bounds, assisted/unaided separation, new situations, independent state, copied records, and absence of scoring. They are distinct from usability feedback and behavioral evidence. See [verification report](../docs/verification.md).

## Scripted, model-generated, or hybrid?

| Approach | Benefit | Trade-off / status |
| --- | --- | --- |
| Authored scripts | Inspectable policy, identical prompts, no model dependency | Implemented; limited responsiveness and unvalidated stimuli |
| Model-generated | Can respond to a visitor's interpretation | Proposed; output quality, safety, exposure, and reproducibility need evaluation |
| Hybrid | Fixed policy sequence with bounded model phrasing | Proposed; still requires a versioned adapter and behavioral pilot |

A future adapter would construct prompts from the selected policy, public scenario, and **that session's** private input only. It would validate structured output against an allowed schema, reject extra fields or unusable responses, apply bounded retries/timeouts, and log model/prompt versions. No prompt builder, response parser, model call, or model evaluation is claimed for v0.2.0. Never put an API secret in this static client.

## Research provenance

The conceptual question follows Xuechu's described AI-assisted interpersonal communication work. Prototype 02 is a new AI-assisted software artifact created for the portfolio. It is not represented as prior solo engineering, a USC lab implementation, a validated intervention, or a result of the empirical study. No participant input from the USC research is included.
