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
