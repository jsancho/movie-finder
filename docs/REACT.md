# React Guidelines

These are general JS/React best practices that must be followed whenever React-specific code is being edited.

If any of these rules contradict each other, or are not consistent with existing code in the project. Flag the issue so the developer can make a conscious decision and update these rules to remove ambiguity.

## React Compiler Enabled

This project uses React 19 and relies on the React Compiler for automated memoization.
DO NOT use any of the memoization APIs (useMemo, useCallback, and React.memo) from previous React versions, they won't provide any performance benefit and will make the codebase less legible.

## React Native Specifics

### Co-locate styles in a separate module

Do not define styles in the component file. Co-locate them in a `styles.ts` file that has a default export.

## Modern React Practices

### Infer component return types

Let function components infer their return type; do not annotate them with `React.JSX.Element`, `ReactNode`, or similar types.

### useEffectEvent

Leverage `useEffectEvent` when an Effect needs to read latest state or props, but changes to that state or props shouldn't a trigger the Effect to re-run.

Typical use cases are handling non-reactive logic that needs latest values, e.g: websocket connections, timers, notifications, analytics.

```typescript
import { useEffectEvent } from 'react';

function useWindowEvent(event: string, handler: () => void) {
  const onEvent = useEffectEvent(handler);

  useEffect(() => {
    window.addEventListener(event, onEvent);
    return () => window.removeEventListener(event, onEvent);
  }, [event]);
}
```

### Use Activity Component for Show/Hide

Use React's `<Activity>` to preserve state/DOM for expensive components that frequently toggle visibility.

```typescript
import { Activity } from 'react'

function Dropdown({ isOpen }: Props) {
  return (
    <Activity mode={isOpen ? 'visible' : 'hidden'}>
      <ExpensiveMenu />
    </Activity>
  )
}
```

Avoids expensive re-renders and state loss.

## Standard Best Practices

### Use Functional setState Updates

When updating state based on the current state value, use the functional update form of setState instead of directly referencing the state variable. This prevents stale closures, eliminates unnecessary dependencies, and creates stable callback references.

Incorrect (requires state as dependency):

```typescript
function TodoList() {
  const [items, setItems] = useState(initialItems)

  // Callback must depend on items, recreated on every items change
  const addItems = useCallback((newItems: Item[]) => {
    setItems([...items, ...newItems])
  }, [items])  // ❌ items dependency causes recreations

  // Risk of stale closure if dependency is forgotten
  const removeItem = useCallback((id: string) => {
    setItems(items.filter(item => item.id !== id))
  }, [])  // ❌ Missing items dependency - will use stale items!

  return <ItemsEditor items={items} onAdd={addItems} onRemove={removeItem} />
}
```

The first callback is recreated every time items changes, which can cause child components to re-render unnecessarily. The second callback has a stale closure bug—it will always reference the initial items value.

Correct (stable callbacks, no stale closures):

```typescript
function TodoList() {
  const [items, setItems] = useState(initialItems)

  // Stable callback, never recreated
  const addItems = useCallback((newItems: Item[]) => {
    setItems(curr => [...curr, ...newItems])
  }, [])  // ✅ No dependencies needed

  // Always uses latest state, no stale closure risk
  const removeItem = useCallback((id: string) => {
    setItems(curr => curr.filter(item => item.id !== id))
  }, [])  // ✅ Safe and stable

  return <ItemsEditor items={items} onAdd={addItems} onRemove={removeItem} />
}
```

Benefits:

Stable callback references - Callbacks don't need to be recreated when state changes
No stale closures - Always operates on the latest state value
Fewer dependencies - Simplifies dependency arrays and reduces memory leaks
Prevents bugs - Eliminates the most common source of React closure bugs
When to use functional updates:

Any setState that depends on the current state value
Inside useCallback/useMemo when state is needed
Event handlers that reference state
Async operations that update state
When direct updates are fine:

Setting state to a static value: setCount(0)
Setting state from props/arguments only: setName(newName)
State doesn't depend on previous value
Note: If your project has React Compiler enabled, the compiler can automatically optimize some cases, but functional updates are still recommended for correctness and to prevent stale closure bugs.

### Move State down or Lift Content Up

Move State Down
What it means: Put the changing state inside the lowest possible component that actually uses it.
Why do it: When state lives at the top of a large component tree, updating it forces every single child below it to re-render. Moving the state down shrinks the blast radius of the update.
Example: Move an isOpen toggle state out of a massive page component and place it directly inside a small AccordionItem component.

Lift Content Up
What it means: Pass a heavy subtree into a parent component as children props instead of rendering it directly inside the component that holds the changing state.
Why do it: When a high-level parent needs state but also contains a slow, expensive child component that doesn't depend on that state, passing that child as children prevents it from re-rendering when the state changes.Example:
Pass an `<ExpensiveChart />` component down as children into a Card wrapper so changing a local input inside the Card doesn't trigger a redraw of the chart.

see [Before you memo()](https://overreacted.io/before-you-memo/)

### Subscribe to Derived State

Subscribe to derived boolean state instead of continuous values to reduce re-render frequency.

Incorrect (re-renders on every pixel change):

```typescript
function Sidebar() {
  const width = useWindowWidth()  // updates continuously
  const isMobile = width < 768
  return <nav className={isMobile ? 'mobile' : 'desktop'}>
}
```

```typescript
Correct (re-renders only when boolean changes):

function Sidebar() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  return <nav className={isMobile ? 'mobile' : 'desktop'}>
}
```

### Hoist Static JSX Elements

Incorrect (recreates element every render):

```typescript
function LoadingSkeleton() {
  return <div className="animate-pulse h-20 bg-gray-200" />
}

function Container() {
  return (
    <div>
      {loading && <LoadingSkeleton />}
    </div>
  )
}
```

Correct (reuses same element):

```typescript
const loadingSkeleton = (
  <div className="animate-pulse h-20 bg-gray-200" />
)

function Container() {
  return (
    <div>
      {loading && loadingSkeleton}
    </div>
  )
}
```

### Early Return from functions

Return early when result is determined to skip unnecessary processing.
This also helps remove indentation in if-else chains that are more difficult to read.

Incorrect (processes all items even after finding answer):

```typescript
function validateUsers(users: User[]) {
  let hasError = false;
  let errorMessage = '';

  for (const user of users) {
    if (!user.email) {
      hasError = true;
      errorMessage = 'Email required';
    }
    if (!user.name) {
      hasError = true;
      errorMessage = 'Name required';
    }
    // Continues checking all users even after error found
  }

  return hasError ? { valid: false, error: errorMessage } : { valid: true };
}
```

Correct (returns immediately on first error):

```typescript
function validateUsers(users: User[]) {
  for (const user of users) {
    if (!user.email) {
      return { valid: false, error: 'Email required' };
    }
    if (!user.name) {
      return { valid: false, error: 'Name required' };
    }
  }

  return { valid: true };
}
```

### Use immutable functions when handling arrays

Props/state mutations break React's immutability model - React expects props and state to be treated as read-only.
Causes stale closure bugs - Mutating arrays inside closures (callbacks, effects) can lead to unexpected behavior.

```typescript
.map()        # instead of .push() to a temp array
.filter()     # to remove elements
.toSorted()   # immutable sort
.toReversed() # immutable reverse
.toSpliced()  # immutable splice
.with()       # immutable element replacement
```

For older runtimes you can use the spread operator instead.

```typescript
const sorted = [...items].sort((a, b) => a.value - b.value);
```

### Use Set/Map for O(1) Lookups

Convert arrays to Set/Map for repeated membership checks.

Incorrect (O(n) per check):

```typescript
const allowedIds = ['a', 'b', 'c', ...]
items.filter(item => allowedIds.includes(item.id))
```

Correct (O(1) per check):

```typescript
const allowedIds = new Set(['a', 'b', 'c', ...])
items.filter(item => allowedIds.has(item.id))
```

## References

Consider adding this [skill](https://github.com/davila7/claude-code-templates/blob/main/cli-tool/components/skills/development/react-best-practices/SKILL.md) for performance best practices
