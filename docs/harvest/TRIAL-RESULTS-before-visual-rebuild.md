# Eden trial results

## Outcome

**Visual trial failed. Human visual approval has not been granted.** The user rejected the visual resemblance on September 19. The local frontend and scouting review are available, but neither compilation nor successful navigation makes this an accepted Eden reproduction.

Prototype: http://127.0.0.1:5181/w/local/home

Separate review: http://127.0.0.1:5182

Port 8772 belongs to an older, unrelated prototype.

Prototype content hash: `e46134d65e5be01ead00046ef0c547b992521e295afeb867999b6c9a5ce8a4a6`.

## Captured scope

Five routes: Home, Discover, Library (`all-items`), Custom AI and Chat. The combined map contains 21 states and 651 control occurrences. 117 occurrences have implemented captured behavior; 534 are explicitly unresolved. These are occurrence counts, not unique buttons or whole-app coverage. Every captured control has a state-scoped mapping and a status/reason. 0 documentation reference errors.

| Pass | Run | Actual navigation actions | Viewport | Measured duration |
|---|---|---:|---|---|
| Desktop discovery | acab5f68226f | 15 | 1440 × 900 | Final 8-action pass: 23.71 s; earlier per-pass timing history is incomplete |
| Representative detail | 4f1f334e5d14 | 4 | 1440 × 900 | 15.51 s including enrichment finish |
| Representative mobile | b6a20eee68eb | 3 | 390 × 844 | 11.35 s including enrichment finish |

Discovery began with a 30-action/300-second bound. Subsequent targeted grants covered visible navigation gaps. Total desktop actions stayed below 120; detailed and mobile passes stayed below 20 actions/180 seconds each. Mobile covered sidebar opening and Home/Library navigation. Other mobile routes and arbitrary intermediate breakpoints remain unobserved. The desktop elapsed total was approximately 64 seconds from invocation output, but the persisted early timing history is incomplete; it is not a precise cumulative benchmark.

The retained action journal has 22 confirmed reference actions and no uncertain actions. Operations were viewing/navigation/sidebar dismissal. No prompts, creates, uploads, invites, account connections, settings changes, purchases or saves were dispatched. Existing board/detail views were not exercised; creation entry points were excluded. Canvas internals, inaccessible frames, hidden account and permission states are not established. Most blocked controls were denied by the read-only policy, not browser failures. No private reference screenshots were persisted.

## Independent prototype verification

Two repair cycles were completed. Final replay evidence: `4b2a178606cb4488`. 22 graph scenarios replayed; some assembled sequences are inferred rather than contiguous observed journeys. A total of 41 navigation consequences passed. This is narrower than all interaction behavior passing.

| Dimension | Result | Checks |
|---|---|---|
| Visual | fail | 270708 pass; 22427 fail; 11725 inconclusive |
| Interaction | fail | 12574 pass; 51 role mismatches |
| Motion | inconclusive | 31 unsampled reference cases; 10 insufficient sampling cases |
| Backend documentation | reference-valid proposals | 38 authored claims checked with TypeSafe; disagreements remain visible |
| Human visual approval | not granted | Exact hash and scope approval remains a human decision |

Check counts include repeated controls across scenario steps; they are not independent feature totals. Major visual problems are font substitution, missing or inaccurate padding/margins, generic placeholder icons and flattened fixed-position layouts. Borders and background treatment also differ visibly. The current desktop layout does not adapt faithfully at narrower widths. The large generated scene bundle also produces a Vite chunk-size warning. The app compiled, but this is not an acceptable visual match.

A fresh TypeSafe/Jev snapshot comparison requested by the user (`deef6fb26920`) used resolved model `jev-1.13.0` in six requests: **39 failed element comparisons, one inconclusive**. All 39 matched pairs failed font-family comparison. Snapshot correspondence does not prove interaction or motion parity.

## Backend scout and actual frontend

Read [APP-MAP.md](APP-MAP.md), [BACKEND-SCOUT.md](BACKEND-SCOUT.md), then [CURSOR-HANDOFF.md](CURSOR-HANDOFF.md). [app-map.json](app-map.json) contains individual occurrences, hierarchy, file/symbol bindings, data fields, evidence references and claim-check probabilities. The transitive evidence IDs and heavy build/verification bodies remain in the local Harvest workspace.

The existing generated frontend uses `src/App.tsx::LayoutNode`, `src/service.ts::ScenarioStore` and `src/content-service.ts::FixtureContentService`. It is a synthetic, local scene-based reconstruction. Fixtures and draft state are local; deterministic reset is `window.__harvestResetScenario(stateId?)`. No Eden APIs, production backend or provisioned service is connected.

Recommendations cover workspace access, Home recents, Library items/relationships, Discover catalog/search, potential source imports, and conditional Custom AI/Chat services. All backend architecture is **proposed**. Visible controls do not establish successful mutations, persistence or provider contracts. TypeSafe classifies/checks claims; Codex authored the prose; deterministic validation checks references. Classification disagreement is not silently treated as a fact.

## Release checks and measurement

35 core/release tests and 10 controlled-browser regressions passed. Coverage includes historical migration, repeated locators, more than eight routes, hydration/staleness/occlusion, nested scrolling/frames, interrupted motion, durable queue failures and restart, sanitized caching/provenance, uncertain-action blocking, selector batching, command boundaries and approval invalidation. TypeScript checking and Vite build passed. Passing these checks does not establish Eden fidelity.

Benchmark: one warm-up and three measured trials per version on the same local fixture, viewport and four detailed-motion actions. Baseline median 4.1481 s; updated median 3.9673 s. Full snapshots fell from 13 to 5; browser round trips from 70 to 54. Control coverage was identical: [12, 14, 13, 14], final 13. Provider latency is excluded, so these measurements do not establish an overall workflow speedup. Raw trials are retained in the release backup folder.

Durable job receipts and usage are in TRIAL-RESULTS.json and SQLite. Cached occurrences can share provider receipts; summing receipts is not a billing estimate. Initial build timing and some early discovery timings were not recorded before instrumentation landed. Raw evidence remains available; compressed full exports are optional.

The source and historical evidence were backed up at `~/HarvestRuns/harvest-release-backup/20260919-115443`. Transactional schema 1→2 migration preserved all 4834 historical evidence records and their hashes. No historical evidence was deleted.

## Next decisions

The immediate visual problem calls for semantic layout components with responsive structure, real consistent vector icons, and the measured typography/background/spacing treatment. The current generic geometry renderer should not be represented as finished UI. The agreed two-cycle repair allowance has been used; this trial records the remaining failures explicitly.

Before future backend work, resolve resource and recents semantics, membership/roles, item lifecycle, catalog rights/entitlements, integration scope, AI configuration and conversation contracts, retention, loading/empty/error behavior, and acceptance cases. No backend work is authorized or performed by this trial.
