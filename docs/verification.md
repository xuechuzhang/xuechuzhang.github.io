# Verification report — Prototype 01 / portfolio upgrade

## Completed source checks

- Baseline: all 24 existing files were hash-verified against GitHub commit `0a41db3f340320a12195b083ef5aa273d3911bf9` before modification.
- Nine engine tests passed: shared identity and rotation, separate identity mapping, invalid input, within-session personalization, handoff whitelist, transition guards, seven-day eligibility/simulation marking, copied demo exports and event sequences, and bounded payoff arithmetic.
- `node --check prototype/app.mjs` passed.
- Static checks passed across six HTML pages and 138 local/artifact links and anchors after adding the walkthrough. The five-item navigation is intact. The three empirical case descriptions are unchanged apart from display numbering; About, Publications, CV, the CV PDF, and original navigation JavaScript are unchanged.
- Source checks found no persistent storage/collection API or dynamic `innerHTML` in the prototype. This is not a penetration test or network-level audit.

## Live Chrome checks — 9 October 2026

The GitHub Pages build for commit `b7367ac527b92e82f1f62a88e535276b8f910b14` completed successfully. The published prototype was opened and operated through its visible controls.

Observed:
- Acknowledging demo mode and starting a session displayed Aster, slot 1, and the first prompt; configuration controls locked.
- A slot 1 planning choice produced the planning response. A separately opened slot 2 page used the same Aster identity but produced the listening response from its own choice. Visible transcripts retained their own choices; neither contained the other slot's choice.
- Completing all three slot 1 turns displayed an immediate handoff, with the character absent from the later phase.
- The group preview disclosed that no other people were connected. Setting all three illustrative sliders to ten displayed a pool of 45 and 15 tokens per player.
- The visible public handoff contained slot, character, condition, timing and stage fields, with no transcript or private choices.

Five actual interface screenshots were assembled into a **42-second captioned walkthrough**. This is a sequence of real interface states, not a continuous recording or behavioral data. See [capture provenance](../assets/demo/README.md).

`ffprobe` verified the exported file as H.264, 1120 × 852 pixels, and exactly 42 seconds. The source screenshots and an extracted video frame were visually inspected; live browser playback remains unverified.

Not completed in the live browser: JSON download, final completion/reset, delayed-condition UI, mobile/cross-browser checks, and final video playback. The browser's credential-state restriction blocked the download check and further observation; a fresh runtime did not restore access. This is a tool limitation, not evidence that the app's download fails. Export copying, state transitions, and seven-day logic passed the stated engine tests, but those do not substitute for the missing UI checks.

Local browser QA was not run: the managed preview environment lacks its required browser-control skill. Source checks preceded deployment; the live checks above are limited to the observed desktop Chrome actions. No broad browser-compatibility claim is made.

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
| Interface demonstration | Yes: observed desktop actions and actual 42-second captures | Only the interface behavior shown; not human effects |
| Human usability feedback | No | Not yet assessable |
| Manipulation pilot | No | Not yet assessable |
| Confirmatory behavioral evidence | No | No claim of social effects |

Implementation provenance: new AI-assisted code developed with Codex during this upgrade; behavioral framing/temporal design from Xuechu's project with Dr. Chen Zhou. No independent prior engineering authorship or lab approval is asserted.
