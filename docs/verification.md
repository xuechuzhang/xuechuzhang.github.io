# Verification report — Prototype 01 / portfolio upgrade

## Completed source checks

- Baseline: all 24 existing files were hash-verified against GitHub commit `0a41db3f340320a12195b083ef5aa273d3911bf9` before modification.
- Nine engine tests passed: shared identity and rotation, separate identity mapping, invalid input, within-session personalization, handoff whitelist, transition guards, seven-day eligibility/simulation marking, copied demo exports and event sequences, and bounded payoff arithmetic.
- `node --check prototype/app.mjs` passed.
- Static checks passed across six HTML pages and 132 local/artifact links and anchors. The five-item navigation is intact. The three empirical case descriptions are unchanged apart from display numbering; About, Publications, CV, the CV PDF, and original navigation JavaScript are unchanged.
- Source checks found no persistent storage/collection API or dynamic `innerHTML` in the prototype. This is not a penetration test or network-level audit.

Live-browser verification and a short interface walkthrough will be recorded below once completed. They are not assumed to have passed in advance. Local browser QA was not run: the managed preview environment lacks its required browser-control skill. Source checks were performed before deployment; the live GitHub Pages interface will be checked after publication.

## What the tests establish

The checked engine can preserve identity while maintaining independent state; reject illegal transitions/input; distinguish simulated early handoff; and implement the specified token formula. The export explicitly identifies local demo interaction. These checks concern software logic, not human experience.

## Not tested / not claimed

No recruited usability feedback, relational manipulation check, pilot data, confirmatory experiment, seven-day human follow-up, psychological mediation, community impact, multi-user synchronization, production authorization, penetration test, or model evaluation exists for this implementation.

The brief scripted interaction may fail to produce a meaningful relational experience. Name/persona cues and common-task expectations may explain any future effect. Browser-memory separation is not a production security guarantee. A browser clock is not a study scheduler.

## Reproduce

```sh
node --test tests/prototype.test.mjs
node --check prototype/app.mjs
python3 tests/check-site.py
```

The static preservation check uses pinned hashes of the verified baseline content, so it does not require local Git history. Source-code/public research descriptions are preserved separately from the newly added prototype.

## Evidence taxonomy

| Evidence | Present? | Can support |
| --- | --- | --- |
| Software tests | Yes, stated checks above | Specific implementation behavior |
| Interface demonstration | Working code; capture/verification reported when completed | What the interface actually permits |
| Human usability feedback | No | Not yet assessable |
| Manipulation pilot | No | Not yet assessable |
| Confirmatory behavioral evidence | No | No claim of social effects |

Implementation provenance: new AI-assisted code developed with Codex during this upgrade; behavioral framing/temporal design from Xuechu's project with Dr. Chen Zhou. No independent prior engineering authorship or lab approval is asserted.
