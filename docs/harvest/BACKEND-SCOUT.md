# Backend scout

**proposed**: Vendor-neutral responsibilities for a future backend. No backend was implemented or connected.

Use the typed frontend service boundary to replace fixtures after product and permission contracts are agreed.

## Proposed structure

Route components → typed view models and service interfaces → query/command layer → validation and authorization → persistence or integration adapters.

A server-rendered view is an alternative where it fits the target stack. No database, auth vendor, queue or hosting service is selected.

## Feature responsibilities

### `/w/:workspace/home`

**observed**: 10 captured states; evidence cfe4904ae3ec4242, 94cb4634d80448a2, b94f3cd25a8747e8, 13a39c11347248d4, af6aa9a9581f49d8, 3103f0ee9cff419c, d9153a777ae34800, 647dc839ad7f4a8f, 0fc8354d59c54ba1, 75522dff307243a2.

**proposed**: Serve a permission-filtered route view model. Candidate entities are Workspace, Membership and ViewRecord; actual record types and fields remain **unknown**.

**proposed**: `loadView(workspaceId, viewId, cursor?)` returns title, items, permissions and pageInfo. Validate IDs and limits; authorize membership and object scope on every request. Keep storage behind an adapter. Writes, background jobs and integrations require a separate agreed contract.

**unknown**: Loading, empty, error and recovery behavior beyond observed states. Verify these cases plus unauthorized and cross-workspace access before replacing fixtures.

### `/w/:workspace/discover`

**observed**: 4 captured states; evidence 4d26908d1a064a0d, 13f6a8104bad48e4, 1767c54b16014b48, 0e95c2c4ac3a4fe4.

**proposed**: Serve a permission-filtered route view model. Candidate entities are Workspace, Membership and ViewRecord; actual record types and fields remain **unknown**.

**proposed**: `loadView(workspaceId, viewId, cursor?)` returns title, items, permissions and pageInfo. Validate IDs and limits; authorize membership and object scope on every request. Keep storage behind an adapter. Writes, background jobs and integrations require a separate agreed contract.

**unknown**: Loading, empty, error and recovery behavior beyond observed states. Verify these cases plus unauthorized and cross-workspace access before replacing fixtures.

### `/w/:workspace/all-items`

**observed**: 4 captured states; evidence 99c484be1ee8491a, 7a1b9806d73e45ff, 8a6c35d4200645d8, bd7e25f116db4df6.

**proposed**: Serve a permission-filtered route view model. Candidate entities are Workspace, Membership and ViewRecord; actual record types and fields remain **unknown**.

**proposed**: `loadView(workspaceId, viewId, cursor?)` returns title, items, permissions and pageInfo. Validate IDs and limits; authorize membership and object scope on every request. Keep storage behind an adapter. Writes, background jobs and integrations require a separate agreed contract.

**unknown**: Loading, empty, error and recovery behavior beyond observed states. Verify these cases plus unauthorized and cross-workspace access before replacing fixtures.

### `/w/:workspace/custom-ai`

**observed**: 2 captured states; evidence e1f675fb620541b7, f553cbf4f99e441c.

**proposed**: Serve a permission-filtered route view model. Candidate entities are Workspace, Membership and ViewRecord; actual record types and fields remain **unknown**.

**proposed**: `loadView(workspaceId, viewId, cursor?)` returns title, items, permissions and pageInfo. Validate IDs and limits; authorize membership and object scope on every request. Keep storage behind an adapter. Writes, background jobs and integrations require a separate agreed contract.

**unknown**: Loading, empty, error and recovery behavior beyond observed states. Verify these cases plus unauthorized and cross-workspace access before replacing fixtures.

### `/w/:workspace/chat`

**observed**: 1 captured states; evidence 130b181ba9e84cf4.

**proposed**: Serve a permission-filtered route view model. Candidate entities are Workspace, Membership and ViewRecord; actual record types and fields remain **unknown**.

**proposed**: `loadView(workspaceId, viewId, cursor?)` returns title, items, permissions and pageInfo. Validate IDs and limits; authorize membership and object scope on every request. Keep storage behind an adapter. Writes, background jobs and integrations require a separate agreed contract.

**unknown**: Loading, empty, error and recovery behavior beyond observed states. Verify these cases plus unauthorized and cross-workspace access before replacing fixtures.

**source-defined**: The semantic frontend defines AppShell, HomeView, LibraryView, DiscoverView, CustomAIView and ChatView in src/App.tsx. AppShell owns the shared navigation layout. ObservedButton and ObservedLink bind known controls to IDs in the current captured scenario; src/service.ts::ScenarioStore owns navigation state. There is no fixed-position LayoutNode scene renderer in the running app. (evidence: 2b23a96ac39b460d)

**source-defined**: src/service.ts::Scenario contains stateId, drafts, lastTransition, notice, sidebar and revision. ScenarioStore replays a matching captured edge or uses local route navigation. Synthetic drafts are written to localStorage; reset clears drafts and increments revision so local view state also remounts. Unimplemented operations display a preview notice. No network call, authentication, production save or successful backend mutation is implemented. (evidence: 2b23a96ac39b460d)

**source-defined**: src/content-service.ts::FixtureContentService returns ContentViewModel with route, source=synthetic, status=ready, LibraryItem[] and FeedPost[]. LibraryItem supplies id, title, subtitle, paragraphs, kind and updatedAt; FeedPost supplies synthetic author, handle, age, body, illustration kind and engagement labels. LibraryView renders items and DiscoverView renders posts; Home, Custom AI and Chat use static interface copy and local scenario state. Loading/error service outcomes are not implemented. Illustrations are original SVG fixtures, not copied reference media. (evidence: 2b23a96ac39b460d)

**observed**: The supplied flow records mark Home navigation through Library, back Home, through Custom AI and back Home as an observed sequence. They also mark mobile Open sidebar → Library → Home as observed. Component records associate these actions with transition references; context.json does not include transition endpoint payloads or result screenshots, limiting independently assessable outcomes to this recorded sequence metadata. (evidence: 50a4c5d798224414, 547bb80a3b7a42d9, 5812ee8901554c3f, 396cbf155fb64d62, 5ee1efd12904432a, 9b94dfb3beb64ea4, b421751128f24a27)

**proposed**: For the shared workspace shell, propose workspaceId, workspaceName, currentRoute, capabilities and requestStatus from an authorized workspace query; sidebarOpen and viewportMode should be client presentation state. A workspace-access service could resolve User–Membership–Workspace relationships. Acceptance requires consistent desktop/mobile navigation, explicit denied/not-found states, and server authorization independent of route parameters or hidden controls. (evidence: 42a01742a3b64394, cfe4904ae3ec4242, 0fc8354d59c54ba1)

**observed**: /w/:workspace/home contains View recents and several unnamed links. View recents has a transition associated with a flow marked sequence_observed=true. The links have no recorded transitions or identified purpose; neither their destinations nor any home-specific creation or submission result is established. (evidence: cfe4904ae3ec4242, 0b7a8efad8024499)

**conflicting**: Home's View recents has an inferred purpose of open-chat-history, while ScenarioStore's fallback maps View recents to /w/local/all-items. An exact transition takes precedence, but its destination is not supplied here. These signals disagree about the intended destination; they do not establish whether recents means conversations, workspace items or a combined activity history. (evidence: aac79571fba945e6, 0b7a8efad8024499, 42a01742a3b64394)

**proposed**: For /w/:workspace/home, propose a recent-activity query returning entries{id,kind,title,lastActivityAt,target}, cursor and status from persisted activity metadata, with labels from static copy. A candidate Activity references an authorized workspace resource. Resolve recents semantics before implementation; acceptance should cover ordering, inaccessible/deleted targets, initial loading, no activity and retryable failure without inventing content for unnamed links. (evidence: cfe4904ae3ec4242, aac79571fba945e6, 42a01742a3b64394)

**observed**: /w/:workspace/discover exposes search and unlock guidance, feed filters, Creators/Brands/Lists, Posts/Ads, ranking chips, Hidden creators, Media only, Refresh feed and Dismiss. Home → Discover and a subsequent Discover action appear in flows marked observed; longer Discover/sidebar sequences are explicitly marked unobserved. Most feature controls have no transition references, so successful filtering, refresh and dismissal are untested here. (evidence: 4d26908d1a064a0d, b2d30a2fc9f74c95, 89f5fa8dc911421a, c5170ab520ab40a0, 61d01b6b1ce64f16)

TypeSafe review flag: classifier disagreement or incomplete factual support. See the recorded probabilities and evidence in app-map.json; this is not a verified backend fact.

**inferred**: On /w/:workspace/discover, the labeled categories and ranking chips suggest an intent to browse different content classes and narrow or reorder a feed. Their names do not establish ranking formulas, entity schemas or whether every control selects a tab versus applies a filter; the inventory itself assigns different intent categories to some desktop variants. (evidence: 4d26908d1a064a0d, 1767c54b16014b48)

**proposed**: For Discover browsing, propose category, contentType, rankingMode, mediaOnly, creatorVisibility and cursor as validated query inputs, with selected values owned by client route state. A catalog service could return items, facets, nextCursor, refreshedAt and status from indexed catalog data. Candidate Creator and Brand records relate to Content; ListMembership relates Lists to Content. Acceptance requires stable pagination and distinct loading, no-results, stale-data and error states. (evidence: 4d26908d1a064a0d, 42a01742a3b64394)

**unknown**: Discover search is labeled 'Starter and above' and accompanied by unlock guidance, but actual entitlement enforcement, account eligibility, upgrade navigation and successful search are not demonstrated. Pricing tiers, entitlement ownership, search scope and ranking definitions are material product decisions. No verified loading, empty-result or search-error outcome is supplied. (evidence: 4d26908d1a064a0d, 1767c54b16014b48)

**proposed**: For Discover search, propose queryDraft from client input and canSearch, restrictionReason, results, cursor and status from an entitlement-aware search service. Validate query length, allowed filters and page limits; enforce capabilities server-side. Begin with database search, adding a dedicated index only for demonstrated scale or ranking needs. Acceptance requires denied requests to reveal no restricted results and stale responses never to replace newer queries. (evidence: 4d26908d1a064a0d, 42a01742a3b64394)

**proposed**: For Discover Refresh feed, propose an idempotent requery of the current filter snapshot, with refreshing, lastSuccessfulAt and error fields from request state. Hidden-creator preferences could relate a user or workspace to Creator; scope requires a decision. Dismiss could remain session-local or persist a notice acknowledgment. Test refresh failure with retained results and explicitly test preference persistence before promising it. (evidence: 4d26908d1a064a0d)

**observed**: /w/:workspace/all-items contains Grid/Graph/Index navigation, a second Grid/List presentation group, New, workspace search, Filter Library, Recents and Sources view on desktop and mobile. These feature controls have no transition references in their supplied records. Their presence establishes available affordances, not completed searches, graph generation, preference persistence or item creation. (evidence: 99c484be1ee8491a, bd7e25f116db4df6)

**proposed**: For Library retrieval, propose queryDraft, filters, sort, viewMode and displayMode as client state; items{id,title,kind,sourceId,updatedAt}, nextCursor and status should come from an authorized item-query service. Candidate Workspace owns Items, each optionally linked to a Source. Validate filter vocabulary and cursor scope. Acceptance should distinguish an empty workspace, no search matches, initial loading and failed refresh while preserving previous results. (evidence: 99c484be1ee8491a, 42a01742a3b64394)

**proposed**: For Library's Grid/Graph/Index and Grid/List controls, reuse one authorized item dataset where possible and keep presentation choice client-owned. If Graph requires real relationships, introduce ItemRelation{fromItemId,toItemId,type} and a bounded neighborhood query returning nodes, edges and truncation status. Acceptance requires equivalent item access across views, explicit empty graphs and capped traversal; a graph database is optional, not implied by the button. (evidence: 99c484be1ee8491a, bd7e25f116db4df6)

**unknown**: Library's New is inferred as create-item, but supported item types, required fields, upload behavior, ownership and post-create navigation remain unknown. Open Welcome to Eden has no recorded destination or detail result. Graph edge semantics, Index semantics, Recents ordering and whether the two view-control groups are independent also require product decisions. (evidence: 99c484be1ee8491a, 03b2aabc9b598bfb)

**proposed**: If item creation is confirmed, propose CreateItem(workspaceId,type,payload,idempotencyKey) and GetItem(workspaceId,itemId). Expose draft, fieldErrors, submitting, createdItemId and error; the draft is client input and the result is persisted service data. Require create/read permission, type-specific size validation and atomic metadata writes. Acceptance requires retry deduplication and a durable returned identifier before the UI reports success. (evidence: 99c484be1ee8491a, 03b2aabc9b598bfb)

**observed**: Library shows Sources view and controls labeled Kindle, Readwise and Chrome extension, plus Dismiss. Their records contain no transitions establishing account connection, external navigation, installation or imported data. These labels identify potential source entry points only; the supplied evidence does not demonstrate any working integration. (evidence: 99c484be1ee8491a, bd7e25f116db4df6)

**proposed**: For Library sources, propose provider-neutral adapters behind a source-management service. Candidate SourceConnection belongs to a workspace; ImportRun belongs to a connection; ExternalItemMapping links external identifiers to Items. Return sourceType, connectionStatus, lastSyncAt, progress and sanitized errors from persisted integration state. Define ConnectSource, DisconnectSource and RequestSync only after choosing supported authorization/import mechanisms; manual import is an alternative. (evidence: 99c484be1ee8491a)

**proposed**: If source synchronization is required, use background jobs with checkpoints, deduplication and bounded retry/backoff. Keep credentials in restricted secret storage and imported metadata in workspace-scoped persistence; never expose credentials in view models. Acceptance should cover revoked access, rate limits, partial imports, retries without duplicate Items, and clear never-connected, syncing, empty and failed states. Disconnect retention policy remains a product dependency. (evidence: 99c484be1ee8491a, 42a01742a3b64394)

**unknown**: Ask Eden instead appears on /w/:workspace/all-items, but its inventory intent is unknown and no action result is recorded. It could transfer a search into a conversation or invoke a separate assistance flow; neither interpretation is established. Destination, query transfer, resource scope and whether generation occurs immediately are unresolved, as are loading and failure behavior. (evidence: 99c484be1ee8491a, b582bc42ce6e1d44, bd7e25f116db4df6)

**proposed**: If Ask Eden instead is confirmed as conversational handoff, propose an explicit user-triggered transfer of queryDraft and authorized item references into a chat draft. Keep handoffPending and handoffError client-owned until a service returns a conversation identifier. Acceptance should preserve the original query on failure and recheck access to every referenced item. This is a candidate flow, not an Eden API integration. (evidence: 99c484be1ee8491a, 130b181ba9e84cf4)

**observed**: /w/:workspace/custom-ai has two listed state references. Home's Custom AI control and this route's Home control participate in flows marked observed, including an out-and-back sequence. Supplied meaningful labels establish navigation, while remaining anonymous controls do not identify a configuration form, save command, model execution or successful customization result. (evidence: e1f675fb620541b7, f553cbf4f99e441c, c1991fa6965643ea, 99f5b7090dcb4cdb, 5812ee8901554c3f, 396cbf155fb64d62)

**unknown**: Custom AI controls carry a select-model inference, but /w/:workspace/custom-ai does not establish whether the product configures assistants, prompts, model choices or knowledge sources. Editable fields, persistence scope, publication/versioning, execution permissions and provider selection are material unknowns. The ready-only fixture contract supplies no verified configuration loading, empty or error behavior. (evidence: a032cf6323e02ef4, e1f675fb620541b7, 42a01742a3b64394)

**proposed**: If Custom AI means saved assistant configurations, propose an AIProfile belonging to Workspace, with id, name, instructions, modelPolicy, resourceIds and revision. ListProfiles/GetProfile provide persisted fields; draft and dirty state stay client-owned. SaveProfile should validate limits, resource access, allowed model policy and expected revision. Acceptance requires explicit no-profiles/loading/error states, conflict handling and a returned revision before claiming a save. (evidence: e1f675fb620541b7, 42a01742a3b64394)

**observed**: /w/:workspace/chat has one listed captured state. Home's Chat action and the chat route's Home action each have flows marked observed. The supplied records identify shell navigation but do not identify a labeled send action, submitted prompt, returned answer, streaming response or persisted conversation. (evidence: 130b181ba9e84cf4, c417f7a57e7f48d3, a2bbfebae6f24a07)

**proposed**: If conversational assistance is confirmed for /w/:workspace/chat, propose Conversation–Message–GenerationRun entities scoped to Workspace, optionally referencing AIProfile and authorized Items. Query conversations/messages and command SendMessage with an idempotency key. A view model could expose conversationId, messages, cursor and runStatus from persisted service data, composerDraft from client input, and partialResponse from transient generation events. (evidence: 130b181ba9e84cf4, 42a01742a3b64394)

**proposed**: For a future chat service, isolate generation behind a provider-neutral adapter, validate message size and resource access, and enforce usage limits server-side. Choose synchronous requests for short bounded work or queued runs with streaming/polling for longer work. Acceptance should distinguish no conversations, loading history, queued/running/completed/failed generation, disconnect recovery and retry deduplication; completion must come from an authoritative run result. (evidence: 130b181ba9e84cf4, 42a01742a3b64394)

**unknown**: Chat history scope, AI response quality criteria, citations, cancellation, message editing, retention and model/provider policy remain unknown. The relationship between Chat, Home recents, Library assistance and Custom AI is also unverified. Route names and inferred intents cannot establish these contracts or prove any production AI capability. (evidence: 130b181ba9e84cf4, aac79571fba945e6, b582bc42ce6e1d44, a032cf6323e02ef4)

TypeSafe review flag: classifier disagreement or incomplete factual support. See the recorded probabilities and evidence in app-map.json; this is not a verified backend fact.

**proposed**: Implement future backend responsibilities initially as modules for workspace access, item retrieval/mutation, discovery, source imports and optional AI configuration/conversations. A modular service avoids premature distributed dependencies; split workers or services only for independent scaling or isolation. Replace the fixture boundary with typed domain adapters while retaining synthetic fixtures for testing. No backend topology is discovered by this evidence. (evidence: 42a01742a3b64394)

**proposed**: Use relational persistence as a candidate home for workspace membership, Items, source mappings, preferences and optional AI/chat records. Add object storage only for confirmed binary-content requirements; add a search index only when query needs exceed database capabilities. Extraction, indexing and catalog refresh jobs should be conditional dependencies, with explicit freshness and processing status rather than silent partial availability. (evidence: 99c484be1ee8491a, 4d26908d1a064a0d, 130b181ba9e84cf4)

**proposed**: Every future query and command should derive actor identity from a trusted session and authorize workspace membership plus resource-level access; search, graph expansion, imports and AI retrieval must apply the same boundary. Validate identifiers, enum values, payload sizes and pagination limits. Acceptance requires cross-workspace denial and proof that labels, URL workspace values and client capabilities cannot grant access. (evidence: 42a01742a3b64394, 99c484be1ee8491a, 4d26908d1a064a0d)

**proposed**: Across all five routes, replace ready-only fixture status with explicit idle/loading/ready/empty/error states and optional refreshing/stale indicators. Normalize service errors into validation, denied, missing, conflict, throttled and unavailable categories with retryability and request identifiers. Preserve drafts and successful prior data on recoverable failure; show mutation success only after authoritative acknowledgment, with deduplicated retries and server-side diagnostic logging. (evidence: 42a01742a3b64394)

**unknown**: Material cross-route decisions remain unresolved: single-user versus collaborative workspaces, role hierarchy, public versus private discovery data, catalog acquisition rights, subscription rules, data retention/deletion, expected scale and latency, and integration support. These determine authorization, schemas, jobs and cost controls; the local fixture implementation cannot settle them. (evidence: 42a01742a3b64394, 4d26908d1a064a0d, 99c484be1ee8491a)

**proposed**: Build in dependency order: resolve workspace/resource and recents semantics; establish authorization and typed loading/error contracts; deliver Library reads and Home recents; add confirmed item commands; implement Discover against an agreed catalog and entitlement model; add approved source adapters and jobs; then implement defined Custom AI and Chat behavior. Graph expansion and generation depend on agreed resource relationships and permissions. (evidence: 42a01742a3b64394, aac79571fba945e6, 99c484be1ee8491a, 4d26908d1a064a0d, e1f675fb620541b7, 130b181ba9e84cf4)

**proposed**: Accept each implemented feature only when its route and controls reach a tested service contract, results survive a fresh read where persistence is promised, permissions hold, and loading/empty/error cases are exercised. Replay the supplied observed navigation sequences separately from backend tests. Add new evidence for currently unobserved search, creation, integration and AI outcomes; prototype implementation status alone must never count as proof of backend completion. (evidence: 42a01742a3b64394, 50a4c5d798224414, 547bb80a3b7a42d9, 5812ee8901554c3f, 396cbf155fb64d62)

Every component has data, ownership, behavior, support requirements, build dependencies and open decisions in [app-map.json](app-map.json).

## Build order and acceptance

1. Resolve material product, lifecycle and role decisions.
2. Inspect the target stack and implement typed read contracts.
3. Implement validation, authorization and persistence behind adapters.
4. Agree writes and asynchronous work separately.
5. Verify loading, success, empty, failure, recovery and isolation. Update component bindings and evidence as implementation lands.
