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
