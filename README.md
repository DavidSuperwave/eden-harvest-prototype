# Eden Harvest prototype

A local React, TypeScript and Vite prototype of five Eden routes, rebuilt from a bounded, read-only Harvest capture. It uses synthetic content and local state. It has no backend, authentication, Eden API calls, account connections or external saves.

## Run locally

```sh
npm ci --ignore-scripts
npm run dev -- --port 5181
```

Open <http://127.0.0.1:5181/w/local/home>. Run `npm run build` to check TypeScript and create a production bundle.

The included routes are Home, Library, Discover, Custom AI and Chat. Library search and view changes use local fixtures. Chat accepts a draft and shows a local preview notice without sending it. Browser back and forward navigate local routes. `window.__harvestResetScenario(stateId)` resets local scenario state for review.

## Source and evidence

- `src/App.tsx`, `src/styles.css`: responsive route components and styling.
- `src/service.ts`, `src/scenarios.json`, `src/transitions.json`: local route and scenario state.
- `src/content-service.ts`: synthetic Library and Discover content.
- `docs/harvest/APP-MAP.md`, `docs/harvest/app-map.json`: captured scope and source bindings.
- `docs/harvest/BACKEND-SCOUT.md`, `docs/harvest/CURSOR-HANDOFF.md`: proposed integration points and open decisions.
- `docs/harvest/TRIAL-RESULTS.md`: historical verification results and fidelity gaps from the September 19, 2026 Harvest trial.

The raw browser evidence, private Harvest session files, generated runtime files and dependencies remain in the local Harvest workspace. The structured map retains evidence IDs; the raw records are not part of this repository.

This is a prototype of the captured subset. Visual and interaction parity failed parts of the historical verification, motion remained inconclusive, and human visual approval was not granted. Current repository builds can confirm compilation, not those broader outcomes. No production service is implemented.
