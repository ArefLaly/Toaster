# Toastra

<p align="center">
  <img src="https://raw.githubusercontent.com/ArefLaly/toastra/main/docs/media/app.png" alt="Toastra toast types" width="720" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/toastra"><img alt="npm" src="https://img.shields.io/npm/v/toastra?color=1a1713" /></a>
  <a href="https://github.com/ArefLaly/toastra"><img alt="GitHub" src="https://img.shields.io/badge/github-ArefLaly%2Ftoastra-1a1713" /></a>
  <a href="https://github.com/ArefLaly/toastra/blob/main/LICENSE"><img alt="MIT" src="https://img.shields.io/badge/license-MIT-0d8052" /></a>
</p>

**Beautiful notifications for React.**

Toastra is a lightweight, accessible, and highly customizable toast library for React 18+, React 19, Vite, and Next.js. It ships with a premium default look, CSS variable theming, and a small API you can learn in a minute.

```tsx
import { Toastra, toast } from "toastra";

toast.success("Successfully saved!");
```

## Features

- Simple `toast.success()` API — no provider required
- Success, error, warning, info, loading, and custom toasts
- Promise helpers with typed success/error messages
- Actions, cancel, and undo patterns
- Queue + `maxToasts` without rendering unused DOM
- Duplicate prevention via stable IDs
- Progress bar, swipe-to-dismiss, keyboard, and reduced motion
- Light, dark, and system themes
- CSS variables — no Tailwind required
- First-class TypeScript and Next.js App Router support

## Installation

```bash
npm install toastra
```

Styles are injected automatically when `<Toastra />` mounts. You can also import them yourself:

```ts
import "toastra/styles.css";
```

## Quick Start

Mount Toastra once, then call `toast` from any client component.

```tsx
import { Toastra } from "toastra";

export default function App() {
  return (
    <>
      <YourApp />
      <Toastra />
    </>
  );
}
```

```tsx
import { toast } from "toastra";

toast.success("Successfully saved!");
```

`toast(...)` must run in client-side code. The renderer is a client component and is safe to place in a Next.js `"use client"` provider.

## Basic Usage

```ts
toast.success("Successfully saved");
toast.error("Something went wrong");
toast.warning("Please check your information");
toast.info("New update available");
toast.loading("Uploading...");
toast("Hello world");
```

Object syntax:

```ts
toast.success({
  title: "Employee Created",
  description: "The employee was successfully created.",
});

toast({
  type: "success",
  title: "Success",
  description: "Operation completed successfully.",
});
```

## Toast Types

`default` · `success` · `error` · `warning` · `info` · `loading`

Loading toasts stay on screen until you update or dismiss them.

```ts
const id = toast.loading("Processing...");

toast.update(id, {
  type: "success",
  title: "Done",
});
```

## Promise Toasts

```ts
await toast.promise(saveEmployee(), {
  loading: "Saving employee...",
  success: (data) => `Employee ${data.name} created!`,
  error: (error) => error.message,
});
```

The returned promise is the original result and also exposes `id`.

## Confirm dialogs

Ask before a destructive action. `toast.confirm()` returns `true` if the user confirms and `false` if they cancel, press Escape, or click the backdrop.

```ts
const ok = await toast.confirm({
  title: "Delete this employee?",
  description: "This cannot be undone.",
  confirm: "Delete",
  cancel: "Keep",
  type: "error",
});

if (ok) {
  await deleteEmployee();
  toast.success("Employee deleted");
}
```

Logout:

```ts
const leave = await toast.confirm({
  title: "Log out?",
  description: "You will need to sign in again.",
  confirm: "Log out",
  cancel: "Stay",
  type: "warning",
});

if (leave) signOut();
```

A string is treated as the title:

```ts
if (await toast.confirm("Remove this record?")) {
  removeRecord();
}
```

## Actions

```ts
toast({
  type: "info",
  title: "New version available",
  description: "Version 2.0 is ready.",
  action: {
    label: "Update",
    onClick: () => updateApplication(),
  },
});
```

Undo:

```ts
toast({
  type: "success",
  title: "Employee deleted",
  action: {
    label: "Undo",
    onClick: restoreEmployee,
  },
});
```

## Custom Toasts

```tsx
toast.custom({
  title: <strong>New Employee</strong>,
  description: <span>Mohammad has joined the team.</span>,
});

toast.custom((item) => <MyCustomToast toast={item} />);
```

Content is rendered as React nodes. Toastra never uses `dangerouslySetInnerHTML`.

## Updating Toasts

```ts
const id = toast.loading("Uploading file...");

toast.update(id, {
  type: "success",
  title: "Upload complete",
});
```

## Dismissal

```ts
toast.dismiss(id);
toast.dismissAll();
toast.isActive(id);
```

Escape dismisses the most recent dismissible toast. Swipe on touch devices also dismisses when the distance passes the threshold.

## Positions

```tsx
<Toastra position="top-right" />
```

```ts
toast.success("Saved!", { position: "bottom-right" });
```

`top-left` · `top-center` · `top-right` · `bottom-left` · `bottom-center` · `bottom-right`

## Themes

```tsx
<Toastra theme="system" />
<Toastra theme="light" />
<Toastra theme="dark" />
```

Default is `system` and follows the OS color scheme.

## Customization

```tsx
<Toastra
  position="top-right"
  theme="system"
  maxToasts={5}
  duration={4000}
  showProgress
  richColors
  swipeDirection="horizontal"
  animation={{ enter: "pop", exit: "blur" }}
/>
```

Or configure globally:

```ts
toast.configure({
  duration: 5000,
  position: "top-right",
});
```

When `<Toastra />` is mounted, its props are the live defaults. `toast.configure()` is useful before mount or for values you are not passing as props.

Motions: `pop` `bounce` `slide` `slide-x` `fade` `scale` `flip` `blur` `rise` `zoom`.

```ts
toast.success("Saved", { animation: "bounce" });
toast.info("Mixed", { animation: { enter: "flip", exit: "fade" } });
```

Override tokens:

```css
:root {
  --toastra-radius: 16px;
  --toastra-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  --toastra-success: #0f7a4f;
}
```

Available tokens: `--toastra-background`, `--toastra-foreground`, `--toastra-border`, `--toastra-shadow`, `--toastra-radius`, `--toastra-success`, `--toastra-error`, `--toastra-warning`, `--toastra-info`, `--toastra-muted`, `--toastra-progress`.

## Accessibility

- `role="alert"` for errors, `role="status"` otherwise
- Labeled close and action buttons
- Keyboard: Tab, Shift+Tab, Enter, Space, Escape
- Contrast-safe type colors plus icons (status is not color-only)
- `prefers-reduced-motion` disables motion
- Safe-area insets on mobile

## Next.js

```tsx
"use client";

import { Toastra } from "toastra";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toastra />
    </>
  );
}
```

Call `toast()` only from client components or event handlers. Toastra does not read `window` or `document` during SSR.

## TypeScript

All public types are exported:

```ts
import type {
  ToastAction,
  ToastData,
  ToastOptions,
  ToastPosition,
  ToastType,
  ToastraProps,
} from "toastra";
```

## API Reference

### `toast`

`toast(message | options, options?)`  
`toast.success` · `toast.error` · `toast.warning` · `toast.info` · `toast.loading`  
`toast.promise` · `toast.confirm` · `toast.custom` · `toast.update` · `toast.dismiss` · `toast.dismissAll` · `toast.isActive` · `toast.configure`

### `useToast()`

Returns the same `toast` API for component use.

### `<Toastra />`

| Prop | Default | Notes |
| --- | --- | --- |
| `position` | `top-right` | Default viewport |
| `duration` | `4000` | Loading is infinite unless set |
| `maxToasts` | `5` | Extra toasts wait in a queue |
| `theme` | `system` | `light` / `dark` / `system` |
| `showProgress` | `false` | Pauses with the timer |
| `pauseOnHover` | `true` | |
| `pauseOnFocusLoss` | `true` | |
| `closeButton` | `true` | |
| `richColors` | `false` | Tinted backgrounds |
| `gap` | `12` | |
| `offset` | `16` | Number or CSS length |
| `swipeDirection` | `horizontal` | `left` `right` `up` `down` `vertical` |
| `animation` | `bounce` | One motion, or `{ enter, exit }` |
| `toastOptions` | `{}` | Defaults merged into every toast |

## Advanced Usage

Mount **one** `<Toastra />`. It uses a global store, so `toast()` works from anywhere after the component is on the page. Multiple instances all render the same store — avoid that unless you intentionally want mirrored viewports.

IDs are unique. Passing the same `id` updates the existing toast instead of stacking another.

```ts
toast.success("Saved", { id: "save-success" });
toast.isActive("save-success");
```

## Examples

- [GitHub](https://github.com/ArefLaly/toastra)
- [Vite demo](https://github.com/ArefLaly/toastra/tree/main/examples/vite)
- [Next.js App Router](https://github.com/ArefLaly/toastra/tree/main/examples/nextjs)

```bash
npm run storybook
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT
