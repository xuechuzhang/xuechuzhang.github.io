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

`ffprobe` verified the exported file as H.264, 1120 × 852 pixels, and exactly 42 seconds. The source screenshots and an extracted video frame were visually inspected; playback was not verified in this initial pass. Later checks are recorded below.

Not completed in the initial live pass: JSON download, final completion/reset, delayed-condition UI, mobile/cross-browser checks, and final video playback. The browser's credential-state restriction blocked the download check and further observation; a fresh runtime did not restore access during that pass. This is a tool limitation, not evidence that the app's download fails. Export copying, state transitions, and seven-day logic passed the stated engine tests, but those do not substitute for missing UI checks.

Local browser QA was not run: the managed preview environment lacks its required browser-control skill. Source checks preceded deployment; the live checks above are limited to the observed desktop Chrome actions. No broad browser-compatibility claim is made.

## Follow-up desktop checks — 9 October 2026

Browser access was available again when the portfolio refinement was reviewed. The Pages build for interface commit `9678f463f8bacff3e22e3c2510397309474119d6` completed successfully; the matching-asset update `561dc55fb236b816c5826ad5e754752ff877d450` also deployed successfully.

Observed through the published interface:

- The new **Inspect demo record · JSON** control opened an inline, parseable record after one choice. It named `local_demo_interaction`, set `notResearchData: true`, and showed only the page's own choice and transcript.
- Separate shared-character tabs for slots 1 and 2 used Aster, distinct local IDs, and respectively `plan` and `listen` choices. Their visible records did not contain the other slot's visitor choice.
- The inline record updated through three turns, immediate handoff, and completion. Completion recorded `walkthrough_completed` and `phase: complete`.
- The public handoff excluded choices, transcript, and events. Setting all three illustrative contributions to ten displayed 45 pooled tokens and a 15-token share.
- With private-record, event-log and public-handoff disclosures open, reset cleared all three text areas, closed all three disclosures, restored zero slider values, unlocked settings, and returned to the welcome view.
- In the separate condition with rotation 1, the mapping was Rowan / Marlow / Aster for slots 1 / 2 / 3. A slot 2, seven-day exchange used Marlow. Its handoff eligibility was exactly 604,800,000 ms after conversation completion. An early preview set `clockSimulated: true` and explicitly said no week had elapsed.
- The homepage architecture disclosure opened and closed, and the working walkthrough was placed before it. Video playback started, advanced past 26 seconds of its 42-second duration, and reported no media error during that observation. The complete playback endpoint and caption-control interaction were not checked.

Live review found a real presentation defect: new homepage HTML initially used cached earlier CSS. The video figure had 40 px side margins and a 16 px caption rather than the revised layout. Versioned asset references resolved the observed mismatch: a fresh load used the matching stylesheet, zero figure margins and an 11 px caption. The refreshed prototype also loaded the matching stylesheet/script URLs and returned to its initial state.

The nine engine tests, JavaScript syntax check and static integrity check passed for this refinement. The six-page, 138-link check still preserved the three empirical case descriptions and the protected About, Publications, CV, PDF and navigation files.

Still unverified: completion of a JSON file save, the download fallback in a browser that rejects object URLs, a full video playback/caption-control check, mobile and cross-browser behavior. Inline inspection now allows record review without depending on the unverified download path. The responsive CSS was changed, but no phone usability claim is made. These are agent-operated software checks, not participant feedback or research data.

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
