export const TOASTRA_CSS = `
:root {
  --toastra-background: rgba(255, 253, 248, 0.92);
  --toastra-foreground: #1a1713;
  --toastra-border: rgba(48, 36, 18, 0.08);
  --toastra-shadow:
    0 1px 1px rgba(48, 32, 12, 0.04),
    0 12px 28px rgba(48, 32, 12, 0.1),
    0 28px 56px rgba(48, 32, 12, 0.08);
  --toastra-radius: 18px;
  --toastra-success: #0d8052;
  --toastra-error: #c4332b;
  --toastra-warning: #b45309;
  --toastra-info: #1b4f8a;
  --toastra-muted: #6a6258;
  --toastra-progress: #c9a227;
  --toastra-action: #1a1713;
  --toastra-action-fg: #fffdf8;
  --toastra-cancel-border: rgba(48, 36, 18, 0.12);
  --toastra-icon-well: color-mix(in srgb, var(--toastra-accent) 12%, transparent);
  --toastra-width: min(24rem, calc(100vw - 1.75rem));
  --toastra-sans: "Sora", "Avenir Next", "Segoe UI", ui-sans-serif, system-ui, sans-serif;
}

[data-toastra-theme="dark"] {
  --toastra-background: rgba(22, 19, 15, 0.92);
  --toastra-foreground: #f7f0e6;
  --toastra-border: rgba(255, 248, 236, 0.08);
  --toastra-shadow:
    0 1px 1px rgba(0, 0, 0, 0.2),
    0 16px 36px rgba(0, 0, 0, 0.38);
  --toastra-success: #4ad496;
  --toastra-error: #f27b72;
  --toastra-warning: #f0b429;
  --toastra-info: #8ec0ff;
  --toastra-muted: #c8bcae;
  --toastra-progress: #e4c56a;
  --toastra-action: #f7f0e6;
  --toastra-action-fg: #16130f;
  --toastra-cancel-border: rgba(255, 248, 236, 0.14);
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
  gap: var(--toastra-gap, 14px);
  width: var(--toastra-width);
  max-width: 100%;
  pointer-events: none;
}

.toastra__viewport--top-left {
  top: calc(var(--toastra-offset, 20px) + env(safe-area-inset-top, 0px));
  left: calc(var(--toastra-offset, 20px) + env(safe-area-inset-left, 0px));
}

.toastra__viewport--top-center {
  top: calc(var(--toastra-offset, 20px) + env(safe-area-inset-top, 0px));
  left: 50%;
  transform: translateX(-50%);
}

.toastra__viewport--top-right {
  top: calc(var(--toastra-offset, 20px) + env(safe-area-inset-top, 0px));
  right: calc(var(--toastra-offset, 20px) + env(safe-area-inset-right, 0px));
}

.toastra__viewport--bottom-left {
  bottom: calc(var(--toastra-offset, 20px) + env(safe-area-inset-bottom, 0px));
  left: calc(var(--toastra-offset, 20px) + env(safe-area-inset-left, 0px));
  flex-direction: column-reverse;
}

.toastra__viewport--bottom-center {
  bottom: calc(var(--toastra-offset, 20px) + env(safe-area-inset-bottom, 0px));
  left: 50%;
  transform: translateX(-50%);
  flex-direction: column-reverse;
}

.toastra__viewport--bottom-right {
  bottom: calc(var(--toastra-offset, 20px) + env(safe-area-inset-bottom, 0px));
  right: calc(var(--toastra-offset, 20px) + env(safe-area-inset-right, 0px));
  flex-direction: column-reverse;
}

.toastra__toast {
  pointer-events: auto;
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: start;
  gap: 0.85rem 1rem;
  width: 100%;
  padding: 1rem 1rem 1.05rem 1.05rem;
  border: 1px solid var(--toastra-border);
  border-radius: var(--toastra-radius);
  background: var(--toastra-background);
  color: var(--toastra-foreground);
  box-shadow: var(--toastra-shadow);
  backdrop-filter: blur(18px);
  font-family: var(--toastra-sans);
  transform-origin: center;
  will-change: transform, opacity;
}

.toastra__toast[data-progress="true"] {
  padding-bottom: 1.3rem;
}

.toastra__toast::before {
  content: "";
  position: absolute;
  inset: 10px auto 10px 0;
  width: 3px;
  border-radius: 999px;
  background: var(--toastra-accent);
  opacity: 0.9;
}

.toastra__toast[data-type="success"] { --toastra-accent: var(--toastra-success); }
.toastra__toast[data-type="error"] { --toastra-accent: var(--toastra-error); }
.toastra__toast[data-type="warning"] { --toastra-accent: var(--toastra-warning); }
.toastra__toast[data-type="info"] { --toastra-accent: var(--toastra-info); }
.toastra__toast[data-type="loading"] { --toastra-accent: var(--toastra-progress); }
.toastra__toast[data-type="default"] { --toastra-accent: var(--toastra-foreground); }

.toastra[data-rich="true"] .toastra__toast[data-type="success"] {
  background: color-mix(in srgb, var(--toastra-success) 9%, var(--toastra-background));
}
.toastra[data-rich="true"] .toastra__toast[data-type="error"] {
  background: color-mix(in srgb, var(--toastra-error) 9%, var(--toastra-background));
}
.toastra[data-rich="true"] .toastra__toast[data-type="warning"] {
  background: color-mix(in srgb, var(--toastra-warning) 9%, var(--toastra-background));
}
.toastra[data-rich="true"] .toastra__toast[data-type="info"] {
  background: color-mix(in srgb, var(--toastra-info) 9%, var(--toastra-background));
}

.toastra__icon {
  display: grid;
  place-items: center;
  width: 2.15rem;
  height: 2.15rem;
  margin-top: 0.05rem;
  border-radius: 12px;
  color: var(--toastra-accent);
  background: var(--toastra-icon-well);
}

.toastra__glyph {
  width: 1.2rem;
  height: 1.2rem;
  display: block;
}

.toastra__glyph--spin {
  animation: toastra-spin 0.85s linear infinite;
}

.toastra__body {
  min-width: 0;
  padding-top: 0.12rem;
}

.toastra__title {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.4;
  font-weight: 700;
  letter-spacing: -0.025em;
}

.toastra__description {
  margin: 0.35rem 0 0;
  color: var(--toastra-muted);
  font-size: 0.84rem;
  line-height: 1.5;
}

.toastra__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.85rem;
}

.toastra__button {
  appearance: none;
  border: 0;
  border-radius: 999px;
  min-height: 2rem;
  padding: 0 0.9rem;
  font: inherit;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1), background 180ms ease, border-color 180ms ease;
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

.toastra__button:hover {
  transform: translateY(-1px);
}

.toastra__button:active {
  transform: translateY(0);
}

.toastra__close {
  appearance: none;
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  color: var(--toastra-muted);
  width: 1.85rem;
  height: 1.85rem;
  border-radius: 999px;
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease, transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
}

.toastra__close svg {
  width: 0.85rem;
  height: 0.85rem;
}

.toastra__close:hover {
  background: color-mix(in srgb, var(--toastra-foreground) 7%, transparent);
  color: var(--toastra-foreground);
  transform: scale(1.04);
}

.toastra__close:focus-visible,
.toastra__button:focus-visible,
.toastra__toast:focus-visible {
  outline: 2px solid var(--toastra-accent);
  outline-offset: 2px;
}

.toastra__progress {
  position: absolute;
  left: 1.05rem;
  right: 1.05rem;
  bottom: 0.45rem;
  height: 3px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--toastra-accent) 16%, transparent);
  overflow: hidden;
}

.toastra__progress-bar {
  height: 100%;
  width: 100%;
  transform-origin: left center;
  background: var(--toastra-accent);
  border-radius: inherit;
}

.toastra__toast[data-animation="slide"][data-edge="top"] {
  animation: toastra-in-top 460ms cubic-bezier(0.16, 1, 0.3, 1);
}
.toastra__toast[data-animation="slide"][data-edge="bottom"] {
  animation: toastra-in-bottom 460ms cubic-bezier(0.16, 1, 0.3, 1);
}
.toastra__toast[data-animation="fade"] {
  animation: toastra-in-fade 320ms cubic-bezier(0.16, 1, 0.3, 1);
}
.toastra__toast[data-animation="scale"] {
  animation: toastra-in-scale 420ms cubic-bezier(0.16, 1, 0.3, 1);
}

.toastra__toast[data-leaving="true"][data-animation="slide"][data-edge="top"] {
  animation: toastra-out-top 260ms cubic-bezier(0.4, 0, 1, 1) forwards;
}
.toastra__toast[data-leaving="true"][data-animation="slide"][data-edge="bottom"] {
  animation: toastra-out-bottom 260ms cubic-bezier(0.4, 0, 1, 1) forwards;
}
.toastra__toast[data-leaving="true"][data-animation="fade"] {
  animation: toastra-out-fade 220ms ease forwards;
}
.toastra__toast[data-leaving="true"][data-animation="scale"] {
  animation: toastra-out-scale 220ms cubic-bezier(0.4, 0, 1, 1) forwards;
}

@keyframes toastra-in-top {
  from { opacity: 0; transform: translate3d(0, -18px, 0) scale(0.96); }
  to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes toastra-in-bottom {
  from { opacity: 0; transform: translate3d(0, 18px, 0) scale(0.96); }
  to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes toastra-in-fade {
  from { opacity: 0; transform: translate3d(0, 4px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes toastra-in-scale {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes toastra-out-top {
  to { opacity: 0; transform: translate3d(0, -12px, 0) scale(0.97); }
}
@keyframes toastra-out-bottom {
  to { opacity: 0; transform: translate3d(0, 12px, 0) scale(0.97); }
}
@keyframes toastra-out-fade {
  to { opacity: 0; transform: translate3d(0, -4px, 0); }
}
@keyframes toastra-out-scale {
  to { opacity: 0; transform: scale(0.94); }
}
@keyframes toastra-spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 640px) {
  .toastra__viewport {
    width: calc(100vw - 1.5rem);
  }
  .toastra__toast {
    padding: 0.95rem 0.95rem 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .toastra__toast,
  .toastra__glyph--spin,
  .toastra__progress-bar,
  .toastra__button,
  .toastra__close {
    animation: none !important;
    transition: none !important;
  }
}

`;
