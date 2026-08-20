# Decisions

A lightweight ADR (Architectural Decision Record) log: the _why_ behind the architectural choices, with the alternatives
considered. The static structure is in [ARCHITECTURE.md](./ARCHITECTURE.md)

Each entry: **Context → Decision → Alternatives → Why → Trade-off**.

---

## ADR-001 — Data layer: TanStack Query

- **Context.** The app needs infinite pagination, request de-duplication, caching and
  loading/error states.
- **Decision.** Use TanStack Query.
- **Alternatives.** Hand-rolled `fetch` + `useEffect` + `useState`.
- **Why.** It removes the code (and bugs) we'd otherwise write by hand:
  - **Simple API** - The {loading, error, data} pattern has become a de facto standard.
  - **Caching with defined policies** - Saves round-trips for same data, achieves a snappier UI. Data will automatically become stale and be garbage collected.
  - **De-duplication** — consolidates multiple requests for the same data into a single query.
  - **Extra Goodies** — Pagination and lazy loading is provided out-of-the-box.
- **Trade-off.** One dependency (~12 KB). Worth it for the surface it removes.

---

## ADR-002 — Navigation: React Navigation 7

- **Context.** The app needs explicit, code-configured navigation rather than file-based routing.
- **Decision.** Use React Navigation 7's static bottom-tab navigator with typed Home and Explore routes and linking for app and web URLs.
- **Alternatives.** Expo Router's file-based routing and native-tab APIs.
- **Why.** It keeps route registration, navigation behavior, and linking configuration together in a familiar React Navigation model while supporting the same two-tab experience across native and web.
- **Trade-off.** New screens must be registered manually rather than becoming routes automatically from their filenames.

---

## ADR-003 — Linting: ESLint 9.39.5

- **Context.** `eslint-config-expo` uses the `eslint/config` API, which was unavailable in the previously pinned ESLint 9.0.0 release.
- **Decision.** Pin ESLint to 9.39.5.
- **Alternatives.** Retain an incompatible ESLint release or replace Expo's lint configuration.
- **Why.** It provides the configuration API required by the installed Expo lint preset while preserving the project's flat-config setup.
- **Trade-off.** The project now uses a newer ESLint 9 patch release, with the lockfile updated accordingly.

## ADR-004 — TMDB client: @lorenzopant/tmdb

- **Context.** The Home tab needs typed access to TMDB's weekly trending movies endpoint.
- **Decision.** Use `@lorenzopant/tmdb` with the app's existing TanStack Query data-layer decision.
- **Alternatives.** Direct `fetch` calls and manually defined response types.
- **Why.** TMDB lists this package among its TypeScript community libraries, and it provides typed endpoint responses while TanStack Query supplies the loading, error, caching, and request lifecycle management already selected for this app.
- **Trade-off.** The temporary Expo client integration exposes its `EXPO_PUBLIC_*` bearer token in the built app; a backend proxy will replace it before the credential is treated as secret.

## ADR-005 — Deprecated API enforcement: type-aware ESLint

- **Context.** TypeScript surfaces `@deprecated` annotations in editors but does not fail `tsc`; the project needs CLI enforcement before deprecated APIs become additional technical debt.
- **Decision.** Use Expo's bundled TypeScript ESLint support and enable `@typescript-eslint/no-deprecated` as an error for TypeScript source files using the project's TypeScript configuration.
- **Alternatives.** Manually restrict selected imports; rely on editor diagnostics; add a baseline that permits current violations.
- **Why.** Type-aware linting detects every visible `@deprecated` declaration, including dependency APIs, without maintaining a hand-curated denylist.
- **Trade-off.** Linting uses TypeScript project information and is slower; current deprecated uses intentionally make `npm run lint` fail until migrated.

## ADR-006 — Core app shell: four task-oriented tabs

- **Context.** Movie Finder now centres on forming personal taste, finding a title, choosing from a pending queue, and keeping availability settings current.
- **Decision.** Replace the starter Home and Explore tabs with a custom React Navigation bottom bar: For you, Search, Next up, and Profile. Keep the screen state in a small in-memory movie-library provider while the product flow is being developed.
- **Alternatives.** Retain generic starter tabs; introduce a multi-stack route structure and persistence immediately.
- **Why.** The four destinations reflect the user's recurring jobs and allow taste, favourites, and pending-list actions to share a single source of truth without adding authentication or a storage dependency prematurely.
- **Trade-off.** Favourites, the pending list, and preferences reset on app restart. Durable persistence and fully live TMDB search should be added with the production data layer.
