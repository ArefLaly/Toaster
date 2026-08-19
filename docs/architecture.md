# Architecture

Toastra uses a singleton store so `toast()` can be called without a React provider.

1. `toast.*` writes into `src/core/store.ts`
2. `<Toastra />` subscribes with `useSyncExternalStore`
3. Visible toasts are capped by `maxToasts`; the rest stay queued
4. Each visible toast owns its own pauseable timer

`<Toastra />` props are the live defaults while it is mounted. `toast.configure()` writes the same store so you can set defaults before mount.

Mount a single instance. Additional instances subscribe to the same store and will render the same notifications.
