# Eden visual rebuild results

_Historical Harvest trial record from September 19, 2026. The local URLs below work only when their servers are running. Results describe the retained build at the recorded content hash, not a fresh verification of this repository._

**The five-route visual rebuild is running and ready for review. Exact visual fidelity remains partial; human visual approval has not been granted.** This replaces the rejected fixed-coordinate scene renderer with semantic, responsive React components. The previous failed trial remains available in [TRIAL-RESULTS-before-visual-rebuild.md](TRIAL-RESULTS-before-visual-rebuild.md).

[Open prototype](http://127.0.0.1:5181/w/local/home) · [Review routes and scout](http://127.0.0.1:5182)

Content hash: `ba4f63703e77baa7c21182badef5dad1f5789ba4b5e962a38cc25d5c49dc972c`. Build evidence: `592a245bd01f453f`.

## What changed

Home, Library, Discover, Custom AI and Chat now use responsive layout components, locally hosted Geist, consistent vector icons, the observed 260 px sidebar, and measured type, card, panel and spacing treatment. The UI no longer renders the historical absolute-coordinate scene tree. Fixture content and original illustrations preserve the local-only boundary. Names, body copy, media and brand/icon details can differ from the reference.

`src/App.tsx` owns AppShell, HomeView, LibraryView, DiscoverView, CustomAIView and ChatView. `src/service.ts::ScenarioStore` owns captured navigation, local drafts and deterministic resets. `src/content-service.ts::FixtureContentService` supplies typed LibraryItem and FeedPost fixtures. Reset now also clears component view state, including Library search and filters. The empty Chat send button is disabled; sending a filled draft displays a local preview notice.

The production JavaScript bundle is 323.17 kB (88.91 kB gzip), down from about 3.45 MB of scene data. This is artifact size, not a measured browser speedup.

## Verification

- TypeScript, Vite production build and static contract validation passed: 5,188 historical occurrences, 21 states, 22 captured edges.
- All 15 responsive checks passed across five routes at 1440 × 900, 1291 × 691 and 390 × 844. No horizontal overflow or legacy scene nodes were found; Geist loaded locally.
- All 22 local behavior checks passed: desktop/mobile route navigation, Library empty search and reset, local Chat composer, and reduced-motion preference. One earlier harness attempt timed out during a local page readiness call; a clean serial rerun completed.
- The 35 Harvest core/release tests passed again. The prior controlled-browser release suite passed 10 regressions; it was not rerun for this frontend-only rebuild.
- Independent graph replay: 22 scenarios; navigation consequence results `{'pass': 41}`. Verification evidence: `8e7e730cea48473a`. Some assembled graph sequences are inferred, not contiguous observed journeys.

| Dimension | Result | Checks |
|---|---|---|
| Visual | fail | 29283 pass; 2491 inconclusive; 4214 fail |
| Interaction | fail | 8441 pass; 651 inconclusive; 253 fail |
| Motion | inconclusive | 41 inconclusive |
| Backend documentation | reference-valid proposals | 38 authored claims; three changed source-defined claims freshly checked by Jev |
| Human visual approval | not granted | A human must approve this exact hash and scope |

These totals include repeated controls across flow steps, and missing bindings remain inconclusive. They are not counts of independent features. Geometry primitives replaced by semantic components are explicitly excluded from one-to-one DOM claims. Navigation checks do not establish complete behavior or motion fidelity.

## Fresh TypeSafe / Jev comparison

The final change after this Home comparison repaired a Discover control binding; Home markup/styles were unchanged. The live Eden Home snapshot was compared with the rebuilt local Home at 1440 × 900, using the existing authenticated Chrome session and `jev-1.13.0`. Reference operations were read-only. Match run: `e1928fd56c6d`.

| Home element outcome | Rejected prototype | Rebuilt prototype |
|---|---:|---:|
| Pass | 0 | 7 |
| Fail | 39 | 20 |
| Inconclusive | 1 | 13 |

No font-family, font-size or line-height failures remain among the matched elements. Remaining reported failures include spacing, geometry, shadow and border/color treatment. Correspondence is probabilistic: the run also pairs some unlike region wrappers and includes a browser-extension shadow element. Those are retained as matcher limitations rather than silently removed. More inconclusive results are not passes; these figures do not establish a pixel-perfect reproduction. Synthetic copy/media and the lower Home sections also retain visible differences.

The full result summaries and failed-property counts are in [TRIAL-RESULTS.json](TRIAL-RESULTS.json); individual correspondence judgments and checks are in [JEV-REBUILD-COMPARISON.json](JEV-REBUILD-COMPARISON.json). Local-only screenshots and test receipts are in `~/HarvestRuns/eden/visual-rebuild-checks`; no private reference screenshots were persisted.

## Coverage and backend scout

The current map has 5 routes, 21 states and 651 captured control occurrences: 111 implemented navigation occurrences, 540 unresolved behaviors, and 0 excluded controls. Across those states, 452 controls have actual rendered source bindings; rendering does not establish an implemented backend outcome. Another 4,537 historical decorative geometry occurrences are excluded from one-to-one DOM claims with replacement reasons. No captured record was deleted.

Read [APP-MAP.md](APP-MAP.md), [BACKEND-SCOUT.md](BACKEND-SCOUT.md), [CURSOR-HANDOFF.md](CURSOR-HANDOFF.md), then [app-map.json](app-map.json). File/symbol bindings point to the semantic components. The three changed source-defined claims were rechecked by TypeSafe/Jev against the new source and received support judgments. The other claim labels, disagreements and evidence references remain visible. Deterministic reference validation reports **0 errors**.

Recommendations remain vendor-neutral proposals for workspace access, recents, Library items and relationships, Discover/search, optional imports and conditional AI/chat services. **No backend, service provisioning or Eden API connection was implemented.** No reference prompts, uploads, account connections, invites, settings changes, purchases, creates or saves occurred.

Mobile Home/Library have source observations. Other mobile adaptations were tested locally but remain inferred. Existing board/detail views, canvas internals, inaccessible frames and hidden permission/account states remain unobserved. Production loading/error states, persistence, authentication, creation, imports and AI outcomes require product decisions and future implementation. Reference motion coverage is still partial.

## Original capture and release measurement

| Pass | Run | Actual navigation actions | Viewport | Measured duration |
|---|---|---:|---|---|
| Desktop discovery | acab5f68226f | 15 | 1440 × 900 | Final 8-action pass: 23.71 s; earlier per-pass timing history is incomplete |
| Representative detail | 4f1f334e5d14 | 4 | 1440 × 900 | 15.51 s including enrichment finish |
| Representative mobile | b6a20eee68eb | 3 | 390 × 844 | 11.35 s including enrichment finish |

Discovery began with a 30-action/300-second bound. Subsequent targeted grants covered visible navigation gaps. Total desktop actions stayed below 120; detailed and mobile passes stayed below 20 actions/180 seconds each. Mobile covered sidebar opening and Home/Library navigation. Other mobile routes and arbitrary intermediate breakpoints remain unobserved. The desktop elapsed total was approximately 64 seconds from invocation output, but the persisted early timing history is incomplete; it is not a precise cumulative benchmark.

The retained action journal has 22 confirmed reference actions and no uncertain actions. Operations were viewing/navigation/sidebar dismissal. No prompts, creates, uploads, invites, account connections, settings changes, purchases or saves were dispatched. Existing board/detail views were not exercised; creation entry points were excluded. Canvas internals, inaccessible frames, hidden account and permission states are not established. Most blocked controls were denied by the read-only policy, not browser failures. No private reference screenshots were persisted.


Benchmark: one warm-up and three measured trials per version on the same local fixture, viewport and four detailed-motion actions. Baseline median 4.1481 s; updated median 3.9673 s. Full snapshots fell from 13 to 5; browser round trips from 70 to 54. Control coverage was identical: [12, 14, 13, 14], final 13. Provider latency is excluded, so these measurements do not establish an overall workflow speedup. Raw trials are retained in the release backup folder.

Durable job receipts and usage are in TRIAL-RESULTS.json and SQLite. Cached occurrences can share provider receipts; summing receipts is not a billing estimate. Initial build timing and some early discovery timings were not recorded before instrumentation landed. Raw evidence remains available; compressed full exports are optional.

The source and historical evidence were backed up at `~/HarvestRuns/harvest-release-backup/20260919-115443`. Transactional schema 1→2 migration preserved all 4834 historical evidence records and their hashes. No historical evidence was deleted.


The separately authorized rebuild preserved the rejected prototype in `~/HarvestRuns/eden/visual-rebuild-before.tgz`. Exact visual acceptance remains the user's decision. Resolve the remaining fidelity gaps and backend product contracts before claiming parity or production readiness.
