# Testing Conventions

Use the AAA (Assert, Act, Assert) structure for tests.
Always add a newline between each "A" section.

## Test Focus

Test behaviour instead of implementation.
For example, services should not expose their state via public functions defined solely to assert internal state or reset values.
Mock collaborators when necessary to verify behaviour with minimal boilerplate.
Suggest refactors when applicable to make services and components more easily testable.

## Imports

Prefer concrete, specific imports over \* imports.
All imports should be at the top of the test file so that code and fixture dependencies are clear.

Overall, we want to mock as little as possible so we can verify actual behaviour.
For example, when creating a spy, do not mock the implementation or returned values if not strictly necessary.

## Mocking

Do not eagerly mock full application modules (files); prefer to use spyOn to mock the precise functions that are explicitly used in the feature.

Use code that is type-aware and uses idiomatic TypeScript patterns instead of relying on type assertions with "as".

When creating mocks and spies, try to use the smallest scope that will allow you to verify the behaviour. For example, rather than creating mocks at the top of the file, create them inside the test cases and only use shared scope (top of file, or before\* blocks) when the mocks need to be reused across tests cases.

## Assertions

Avoid verbose expect statements that require checking many fields or excessive mocking.
Take advantage of partial matches for the data that is relevant to the feature scope.

```javascript
expect(get).toHaveBeenCalledWith(
  "a",
  expect.objectContaining({ trigger: "prefetch" }),
);
```
