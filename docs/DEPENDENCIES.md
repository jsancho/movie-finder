# Dependency Management

All dependencies must be install with fixed versions to ensure we create consistent artifacts.

## Protect Against Supply Chain Attacks

To protect from supply chain attacks a minimum of 7 days must have passed since the version published date.
Warn about the recency of the package before installing anything more recent than 14 days.

## Expo Dependencies

The Expo framework has frequent releases which include major changes.
When installing dependencies from Expo ensure that we use a fixed version that matches the patch version that is provided as part of the current Expo SDK.

## Decisions

Whenever a dependency is introduced, replaced, or removed an accompanying decision log must be added to [DECISIONS.md](./DECISIONS.md).
