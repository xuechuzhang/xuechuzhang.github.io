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

## About and Publications update — 9 October 2026

User-requested changes add the shared-social-reality manuscript under **Manuscript in preparation**, the exact Beyond Research sentence, the supplied portrait and tiger-art photographs, and a scoped rose accent stylesheet. The two source photographs are copied byte-for-byte, with no photo manipulation. Both supplied JPEGs contain no EXIF metadata.

The existing static checker passed across six HTML pages and 142 local/artifact links and anchors. The original three empirical case descriptions, CV page/PDF, and navigation script still match their protected snapshots. About and Publications now match explicitly authorized updated snapshots; their existing academic descriptions and prior publication entries are retained. Rose text (#99475f) has a calculated 6.14:1 contrast against white. Responsive breakpoints are present; no mobile-browser observation is claimed.

Live desktop appearance and image loading remain to be checked after this deployment. No behavioral evidence, prototype implementation, or publication status was upgraded by this presentation change.


## Narrative upgrade and Prototype 02 — 10 October 2026

### Completed source checks

- Before modification, the 46 local repository files matched the remote tree at commit `5bec755e4ae19ee453b4d815a42fe4e141e9abf7`.
- All 14 engine tests passed: nine existing shared-character checks and five new scaffolding checks. The new checks cover invalid/empty inputs, required reflections, allowed transitions, withholding assisted content in the transfer view, novel situations, independent state, copied records, and no competence score.
- Native JavaScript syntax checks passed for the three new modules: app, engine and scenarios.
- The seven-page static check passed across 161 local/artifact links and anchors; the five-item navigation, protected secondary pages, CV PDF, original navigation script, and two foundational research cases are intact. The flagship case matches an explicitly authorized narrative revision.
- Shared evidence rendering/check mode passed: Home and Research display the same sample sizes and preliminary construct directions from one JSON source. The new diagram parsed as valid SVG.
- Static inspection found no persistent-storage/collection API or dynamic HTML insertion in either demo. This is not a security audit.

There is no framework build, package dependency, type-check or lint configuration to run. The native static/ES-module deployment model is retained. Local browser preview is not available in the managed environment; no browser installation or substitute local automation was used.

### Evidence limits

No new recruited usability feedback, pilot sample, randomized behavioral experiment, competence validation, repeated-session learning, or human–human spillover result exists. Prototype 02 implements one assisted situation and a new unaided one; its demonstration record is explicitly not research data. Scenarios are fictional authored examples, not participant excerpts. The response routes differ in time, effort, practice, and information; matched stimuli and a justified manipulation need pilot work.

Responsive breakpoints and keyboard/focus handling are implemented. Mobile, cross-browser, screen-reader conformance, production authorization/security, and backend data handling are not established by source tests. Live deployment and desktop UI results will be recorded separately after they are observed.

### Published desktop checks — 10 October 2026

The GitHub Pages build and deployment for commit `f73da316f43349de2e05fff11ca6045216b07a8b` completed successfully. The following checks were performed through the published interface in desktop Chrome (1348 × 926 viewport):

- Home displays the new research question, the two-mechanism framework, the 55/45/222 study samples, the four preliminary self-report directions, and the next Scaffolding AI question. The flagship anchor remained below the fixed navigation. The hero, evidence section, and current-demo/future-study diagram were visually inspected; no page-level horizontal overflow was observed in those views.
- Research displays the empirical flagship first, followed by the shared-character build and the two foundational cases. The flagship uses Problem → Idea → Build & Method → Evidence → What This Opens. Its workflow and sample strip loaded. An already-open tab initially retained the older Research HTML; one reload displayed the published version. This was not reported as a failed deployment or a compatibility test.
- In the substitution route, keyboard Enter started the demonstration, locked configuration, and focused the stage heading. The authored interpretation, action, and editable draft appeared. Using the draft populated the response field. Completing assistance led to withdrawal and a different unaided situation, with no previous guidance or reflection prompts in that view.
- Entering a fictional unaided response opened review with both responses and an explicit warning against inferring learning or competence. Inline record inspection identified `scripted_interaction_design_demo`, set `notResearchData: true`, and contained no competence score. Switching modes cleared the visible responses and record, unlocked configuration, and selected scaffolding.
- In the scaffolding route, the second fictional situation advanced through all four reflection steps. Attempting to continue with an empty reflection showed the 3–1200-character requirement, kept the first step active, and focused the response field. After the four authored test responses, assistance was withdrawn. The new unaided situation contained no prior guidance; entering a response led to review.
- Reloading the demo cleared the agent's fictional test text and returned the page to its initial configuration. No recruited participant or sensitive personal input was used in these checks.

These are agent-operated interface checks and software tests, not usability feedback, pilot data, or evidence that either interaction mode improves people. Mobile, cross-browser, screen-reader behavior, production data handling, repeated exposure, and human outcomes remain unverified. The existing shared-character walkthrough remains a separate 42-second artifact; no video of Prototype 02 is claimed.


## Research + Invention / policy v0.2.0 — 10 October 2026

Before modification, all 58 local repository files matched remote commit `f68e18de9ca440e313d7e236b02501c5940cbba5`. The baseline 14 tests passed.

Completed after implementation:

- All **18 engine tests passed**: nine unchanged shared-character checks and nine policy/scaffolding checks. New checks address six required reflections, mode/version/phase/step rejection, allowlisted public configuration, immutable policies, nondecreasing event times, prior-state preservation, minimal event payloads, detached records, and trace withholding during transfer.
- Syntax checks passed for **seven native ES modules** across both prototypes, including the Home preview. All research SVGs parse as XML.
- The static check passed for **seven HTML pages and 183 local/artifact links and anchors**, five-item navigation, protected About/Publications/CV/PDF/navigation files, and the two foundational cases. It now also checks local module imports and scans all prototype modules for persistent storage/collection APIs and dynamic HTML insertion.
- Home and Research still render identical documented samples and preliminary directions from the existing JSON source. No empirical effect size or significance claim was added.

No framework build, lint configuration, type-check project, or dependency installation is applicable. Local preview was not run because the managed environment lacks its required browser-control skill. Source tests do not validate behavioral efficacy, production isolation, mobile layout, or screen-reader conformance.

### Published desktop review

The GitHub Pages workflow for implementation commit `b19365a799c9840f12494908fcac7ac09cb9e648` completed successfully. The published site was operated in desktop Chrome at a 1363 × 936 viewport.

- Home visibly presents Observe → Build → Scale, both working-demo links, and the first state of the actual policy engine. Switching its radios changes the authored guidance, policy ID, and continuation URL between `answer-supply` and `guided-judgment`, version 0.2.0. Returning to scaffolding restores its first prompt. No page-level horizontal overflow was observed.
- Keyboard Enter started the full scaffolding route, locked configuration, and focused its heading. An empty reflection displayed the character-limit message and did not advance. All six fictional test responses led to withdrawal; the trace recorded six reflections followed by `assistance_completed`, with only step IDs and character counts in response-event payloads.
- Starting the new unaided situation displayed a different person and context. The trace disclosure was hidden and its text cleared; the visible stage included no previous prompt, assisted response, or interpretation. Submitting a fictional response reached review, with both drafts and an explicit limit on inferring competence.
- Inline record inspection showed `prototype02.demo.v2`, `notResearchData: true`, six reflections, ordered transition events, and no score field. Reset removed the visible drafts and record, hid and cleared the trace, unlocked controls, and selected the other mode.
- The substitution route with the second scenario displayed its authored interpretation, recommendation, and editable draft. Using the draft, finishing assistance, withdrawing help, and responding to the different unaided scenario reached review.
- Navigating to Research and back returned the demo to its ready state with no prior input or record. Reloading likewise cleared the agent's fictional test text. No sensitive or recruited-participant input was used.
- Research showed the five intended cases in order. Its loaded images had no observed failures or page-level horizontal overflow. The new architecture and Home Build section were visually inspected. The unchanged shared-character prototype opened with its configuration and explicit implementation limits.

Automation limitation: two semantic pointer attempts on the last reflection did not advance the visible stage. Keyboard Enter and a native click on the visibly unobstructed button both completed that transition. The successful final step was observed through the interface; this limited pass does not establish uniform automation or cross-browser behavior.

These are agent-operated software/interface checks. Human usability feedback, manipulation validation, learning, repeated exposure, and human–human spillover remain untested. Mobile and screen-reader review were not performed. Both prototypes still use authored scripts with page-local memory, not a connected model, authenticated multi-user service, or persistent study backend.
