# TypeScript Conventions

## Type Safety

- No implicit any types (use defined types or 'unknown' as last resource)
- Strict null checks enabled and properly handled
- Type assertions (as) justified and minimal
- Generic constraints properly defined
- Discriminated unions for error handling
- Return types explicitly declared for public APIs

## TypeScript Best Practices

- Prefer interface over type for object shapes (better error messages)
- Use const assertions for literal types
- Leverage type guards and predicates
- Avoid type gymnastics when simpler solution exists
- Template literal types used appropriately
- Branded types for domain primitives
- Use string literal unions over enums

## Performance Considerations

- Type complexity doesn't cause slow compilation
- No excessive type instantiation depth
- Avoid complex mapped types in hot paths

## Module System

- Consistent import/export patterns
- No circular dependencies
- Do not use barrel exports, they hurt tree-shaking and can generate circular deps
- Dynamic imports for code splitting

## Error Handling Patterns

- Result types or discriminated unions for errors
- Custom error classes with defined inheritance
- Type-safe error boundaries
- Exhaustive switch cases with never type

## Code Organization

- Types co-located with implementation
- Shared types in dedicated modules
- Avoid global type augmentation when possible
- Do not add `.d.ts` files. Prefer typed implementation code, supported package types, or refactoring unsupported imports rather than ambient declarations.

## References

[Cheatsheet](https://github.com/davila7/claude-code-templates/blob/main/cli-tool/components/skills/development/typescript-expert/references/typescript-cheatsheet.md)

[TypeScript Expert Skill](https://aitmpl.com/component/skill/development/typescript-expert)
