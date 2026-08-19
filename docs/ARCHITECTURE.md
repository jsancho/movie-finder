# Architecture

## Project structure

```bash
  src/
    api/         # queries to external APIs.
    hooks/       # shared hooks that can be used across the app.
    components/  # shared/generic components that don't belong to specific features.
    constants/   # hardcored configuration values to be re-used.
    features/    # parent folder for all features; features are self-contained in a subfolder.
    logging/     # module used to log to a 3rd party service.
    navigation/  # navigation configuration and routes shared across the app.
```

## Shared Folders

The `hooks` and `components` folders are to be used by truly shareable code that does not belong semantically to any feature in particular.

## Architectural Decisions

All significant decisions need to be added to the [DECISIONS.md](./DECISIONS.md) log following the specified format.

## Features

Prefer feature-based organisation over functional organisation.
Every feature folder should be self-contained to promote high cohesion.
It is easier to add an iterate features when all related files are close together.

It's simplifies the use of feature flags, refactors, and even deletion when not required.
