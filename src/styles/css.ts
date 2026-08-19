export const TOASTRA_CSS = `
:root {
  --toastra-background: #fffdf8;
  --toastra-foreground: #1c1915;
  --toastra-border: #e8dfd2;
  --toastra-shadow: 0 18px 40px rgba(48, 32, 12, 0.12);
  --toastra-radius: 16px;
  --toastra-success: #0f7a4f;
  --toastra-error: #c0362c;
  --toastra-warning: #b45309;
  --toastra-info: #1d4e89;
  --toastra-muted: #6b6258;
  --toastra-progress: #c9a227;
  --toastra-action: #1c1915;
  --toastra-action-fg: #fffdf8;
  --toastra-cancel-border: #d9cfc0;
  --toastra-width: min(22.5rem, calc(100vw - 1.5rem));
  --toastra-font: "Iowan Old Style", "Palatino Linotype", Palatino, "Times New Roman", ui-serif, Georgia, serif;
  --toastra-sans: "Sora", "Avenir Next", "Segoe UI", ui-sans-serif, system-ui, sans-serif;
}

[data-toastra-theme="dark"] {
  --toastra-background: #16130f;
  --toastra-foreground: #f6efe4;
  --toastra-border: #322a22;
  --toastra-shadow: 0 20px 48px rgba(0, 0, 0, 0.42);
  --toastra-success: #3dcb8a;
  --toastra-error: #f07167;
  --toastra-warning: #f0b429;
  --toastra-info: #7eb6ff;
  --toastra-muted: #c4b8a8;
  --toastra-progress: #e4c56a;
  --toastra-action: #f6efe4;
  --toastra-action-fg: #16130f;
  --toastra-cancel-border: #4a3f34;
}

.toastra {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  inset: 0;
}

.toastra__viewport {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: var(--toastra-gap, 12px);
  width: var(--toastra-width);
  max-width: 100%;
  pointer-events: none;
}

.toastra__viewport--top-left {
  top: calc(var(--toastra-offset, 16px) + env(safe-area-inset-top, 0px));
  left: calc(var(--toastra-offset, 16px) + env(safe-area-inset-left, 0px));
}

.toastra__viewport--top-center {
  top: calc(var(--toastra-offset, 16px) + env(safe-area-inset-top, 0px));
  left: 50%;
  transform: translateX(-50%);
}

.toastra__viewport--top-right {
  top: calc(var(--toastra-offset, 16px) + env(safe-area-inset-top, 0px));
  right: calc(var(--toastra-offset, 16px) + env(safe-area-inset-right, 0px));
}

.toastra__viewport--bottom-left {
  bottom: calc(var(--toastra-offset, 16px) + env(safe-area-inset-bottom, 0px));
  left: calc(var(--toastra-offset, 16px) + env(safe-area-inset-left, 0px));
  flex-direction: column-reverse;
}

.toastra__viewport--bottom-center {
  bottom: calc(var(--toastra-offset, 16px) + env(safe-area-inset-bottom, 0px));
  left: 50%;
  transform: translateX(-50%);
  flex-direction: column-reverse;
}

.toastra__viewport--bottom-right {
  bottom: calc(var(--toastra-offset, 16px) + env(safe-area-inset-bottom, 0px));
  right: calc(var(--toastra-offset, 16px) + env(safe-area-inset-right, 0px));
  flex-direction: column-reverse;
}

.toastra__toast {
  pointer-events: auto;
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.75rem 0.85rem;
  width: 100%;
  padding: 0.9rem 0.95rem 0.95rem;
  border: 1px solid var(--toastra-border);
  border-radius: var(--toastra-radius);
  background: var(--toastra-background);
  color: var(--toastra-foreground);
  box-shadow: var(--toastra-shadow);
  font-family: var(--toastra-sans);
  transform-origin: center;
  will-change: transform, opacity;
}

.toastra__toast[data-type="success"] { --toastra-accent: var(--toastra-success); }
.toastra__toast[data-type="error"] { --toastra-accent: var(--toastra-error); }
.toastra__toast[data-type="warning"] { --toastra-accent: var(--toastra-warning); }
.toastra__toast[data-type="info"] { --toastra-accent: var(--toastra-info); }
.toastra__toast[data-type="loading"] { --toastra-accent: var(--toastra-progress); }
.toastra__toast[data-type="default"] { --toastra-accent: var(--toastra-foreground); }

.toastra[data-rich="true"] .toastra__toast[data-type="success"] {
  background: color-mix(in srgb, var(--toastra-success) 10%, var(--toastra-background));
}
.toastra[data-rich="true"] .toastra__toast[data-type="error"] {
  background: color-mix(in srgb, var(--toastra-error) 10%, var(--toastra-background));
}
.toastra[data-rich="true"] .toastra__toast[data-type="warning"] {
  background: color-mix(in srgb, var(--toastra-warning) 10%, var(--toastra-background));
}
.toastra[data-rich="true"] .toastra__toast[data-type="info"] {
  background: color-mix(in srgb, var(--toastra-info) 10%, var(--toastra-background));
}

.toastra__icon {
  color: var(--toastra-accent);
  width: 1.5rem;
  height: 1.5rem;
  margin-top: 0.05rem;
}

.toastra__glyph {
  width: 1.5rem;
  height: 1.5rem;
  display: block;
}

.toastra__glyph--spin {
  animation: toastra-spin 0.9s linear infinite;
}

.toastra__body {
  min-width: 0;
}

.toastra__title {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.35;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.toastra__description {
  margin: 0.28rem 0 0;
  color: var(--toastra-muted);
  font-size: 0.875rem;
  line-height: 1.45;
}

.toastra__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.7rem;
}

.toastra__button {
  appearance: none;
  border: 0;
  border-radius: 999px;
  min-height: 1.85rem;
  padding: 0 0.75rem;
  font: inherit;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
}

.toastra__button--action {
  background: var(--toastra-action);
  color: var(--toastra-action-fg);
}

.toastra__button--cancel {
  background: transparent;
  color: var(--toastra-foreground);
  border: 1px solid var(--toastra-cancel-border);
}

.toastra__close {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--toastra-muted);
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 999px;
  cursor: pointer;
  font-size: 1.05rem;
  line-height: 1;
}

.toastra__close:hover,
.toastra__button:hover {
  filter: brightness(1.05);
}

.toastra__close:focus-visible,
.toastra__button:focus-visible,
.toastra__toast:focus-visible {
  outline: 2px solid var(--toastra-accent);
  outline-offset: 2px;
}

.toastra__progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: color-mix(in srgb, var(--toastra-accent) 16%, transparent);
  overflow: hidden;
}

.toastra__progress-bar {
  height: 100%;
  width: 100%;
  transform-origin: left center;
  background: var(--toastra-accent);
}

.toastra__toast[data-animation="slide"][data-edge="top"] {
  animation: toastra-in-top 280ms cubic-bezier(0.22, 1, 0.36, 1);
}
.toastra__toast[data-animation="slide"][data-edge="bottom"] {
  animation: toastra-in-bottom 280ms cubic-bezier(0.22, 1, 0.36, 1);
}
.toastra__toast[data-animation="fade"] {
  animation: toastra-in-fade 220ms ease;
}
.toastra__toast[data-animation="scale"] {
  animation: toastra-in-scale 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

.toastra__toast[data-leaving="true"][data-animation="slide"][data-edge="top"] {
  animation: toastra-out-top 180ms ease forwards;
}
.toastra__toast[data-leaving="true"][data-animation="slide"][data-edge="bottom"] {
  animation: toastra-out-bottom 180ms ease forwards;
}
.toastra__toast[data-leaving="true"][data-animation="fade"] {
  animation: toastra-out-fade 160ms ease forwards;
}
.toastra__toast[data-leaving="true"][data-animation="scale"] {
  animation: toastra-out-scale 160ms ease forwards;
}

@keyframes toastra-in-top {
  from { opacity: 0; transform: translateY(-12px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes toastra-in-bottom {
  from { opacity: 0; transform: translateY(12px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes toastra-in-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes toastra-in-scale {
  from { opacity: 0; transform: scale(0.92); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes toastra-out-top {
  to { opacity: 0; transform: translateY(-10px) scale(0.98); }
}
@keyframes toastra-out-bottom {
  to { opacity: 0; transform: translateY(10px) scale(0.98); }
}
@keyframes toastra-out-fade {
  to { opacity: 0; }
}
@keyframes toastra-out-scale {
  to { opacity: 0; transform: scale(0.94); }
}
@keyframes toastra-spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 640px) {
  .toastra__viewport {
    width: calc(100vw - 1.25rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .toastra__toast,
  .toastra__glyph--spin,
  .toastra__progress-bar {
    animation: none !important;
    transition: none !important;
  }
}
`;
