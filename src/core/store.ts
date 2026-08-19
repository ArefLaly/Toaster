import type { StoreSnapshot, ToastConfigureOptions, ToastData, ToastraProps, ToastOptions } from "../types";
import { isFiniteDuration } from "../utils/helpers";
import { createEmitter } from "./events";
import { applyQueue } from "./queue";

export const DEFAULT_CONFIG: StoreSnapshot["config"] = {
  position: "top-right",
  duration: 4000,
  maxToasts: 5,
  theme: "system",
  closeButton: true,
  richColors: false,
  showProgress: false,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  expand: false,
  gap: 12,
  offset: 16,
  swipeDirection: "horizontal",
  animation: "slide",
  toastOptions: {},
};

function createSnapshot(toasts: ToastData[], config: StoreSnapshot["config"]): StoreSnapshot {
  return { toasts, config };
}

export function createStore() {
  let toasts: ToastData[] = [];
  let config: StoreSnapshot["config"] = { ...DEFAULT_CONFIG, toastOptions: {} };
  let snapshot = createSnapshot(toasts, config);
  const emitter = createEmitter();

  function publish(): void {
    snapshot = createSnapshot(toasts, config);
    emitter.emit();
  }

  function requeue(): void {
    toasts = applyQueue(toasts, config.maxToasts);
  }

  return {
    subscribe: emitter.subscribe,
    getSnapshot(): StoreSnapshot {
      return snapshot;
    },
    getServerSnapshot(): StoreSnapshot {
      return createSnapshot([], config);
    },
    configure(next: ToastConfigureOptions): void {
      config = {
        ...config,
        ...pickConfig(next),
        toastOptions: { ...config.toastOptions, ...next.toastOptions },
      };
      requeue();
      publish();
    },
    setHostProps(props: ToastraProps): void {
      const next = {
        ...config,
        ...pickConfig(props),
        toastOptions: props.toastOptions
          ? { ...config.toastOptions, ...props.toastOptions }
          : config.toastOptions,
      };
      if (sameConfig(config, next)) return;
      config = next;
      requeue();
      publish();
    },
    add(toast: ToastData): ToastData {
      const existing = toasts.find((item) => item.id === toast.id);
      if (existing) {
        toasts = toasts.map((item) => (item.id === toast.id ? { ...item, ...toast, id: item.id } : item));
        requeue();
        publish();
        return toasts.find((item) => item.id === toast.id) ?? toast;
      }
      toasts = [...toasts, toast];
      requeue();
      publish();
      return toasts.find((item) => item.id === toast.id) ?? toast;
    },
    update(id: string, patch: Partial<ToastData>): ToastData | null {
      const current = toasts.find((item) => item.id === id);
      if (!current) return null;
      toasts = toasts.map((item) => (item.id === id ? { ...item, ...patch, id: item.id } : item));
      requeue();
      publish();
      return toasts.find((item) => item.id === id) ?? null;
    },
    dismiss(id?: string): void {
      if (!id) {
        toasts = [];
        publish();
        return;
      }
      toasts = toasts.filter((item) => item.id !== id);
      requeue();
      publish();
    },
    isActive(id: string): boolean {
      return toasts.some((item) => item.id === id);
    },
    defaults(): StoreSnapshot["config"] {
      return config;
    },
    reset(): void {
      toasts = [];
      config = { ...DEFAULT_CONFIG, toastOptions: {} };
      publish();
    },
    resolveOptions(options: ToastOptions): Pick<
      ToastData,
      | "duration"
      | "position"
      | "closeButton"
      | "dismissible"
      | "pauseOnHover"
      | "pauseOnFocusLoss"
      | "showProgress"
    > {
      const merged = { ...config.toastOptions, ...options };
      const type = merged.type ?? "default";
      const configuredDuration = merged.duration ?? config.duration;
      const duration =
        type === "loading" && merged.duration === undefined
          ? Number.POSITIVE_INFINITY
          : isFiniteDuration(configuredDuration)
            ? configuredDuration
            : config.duration;

      return {
        duration,
        position: merged.position ?? config.position,
        closeButton: merged.closeButton ?? config.closeButton,
        dismissible: merged.dismissible ?? true,
        pauseOnHover: merged.pauseOnHover ?? config.pauseOnHover,
        pauseOnFocusLoss: merged.pauseOnFocusLoss ?? config.pauseOnFocusLoss,
        showProgress: merged.showProgress ?? config.showProgress,
      };
    },
  };
}

function sameConfig(left: StoreSnapshot["config"], right: StoreSnapshot["config"]): boolean {
  return (
    left.position === right.position &&
    left.duration === right.duration &&
    left.maxToasts === right.maxToasts &&
    left.theme === right.theme &&
    left.closeButton === right.closeButton &&
    left.richColors === right.richColors &&
    left.showProgress === right.showProgress &&
    left.pauseOnHover === right.pauseOnHover &&
    left.pauseOnFocusLoss === right.pauseOnFocusLoss &&
    left.expand === right.expand &&
    left.gap === right.gap &&
    left.offset === right.offset &&
    left.swipeDirection === right.swipeDirection &&
    left.animation === right.animation &&
    left.toastOptions === right.toastOptions
  );
}

function pickConfig(value: ToastConfigureOptions | ToastraProps): Partial<StoreSnapshot["config"]> {
  const next: Partial<StoreSnapshot["config"]> = {};
  if (value.position) next.position = value.position;
  if (isFiniteDuration(value.duration)) next.duration = value.duration;
  if (typeof value.maxToasts === "number" && value.maxToasts > 0) next.maxToasts = Math.floor(value.maxToasts);
  if (value.theme) next.theme = value.theme;
  if (typeof value.closeButton === "boolean") next.closeButton = value.closeButton;
  if (typeof value.richColors === "boolean") next.richColors = value.richColors;
  if (typeof value.showProgress === "boolean") next.showProgress = value.showProgress;
  if (typeof value.pauseOnHover === "boolean") next.pauseOnHover = value.pauseOnHover;
  if (typeof value.pauseOnFocusLoss === "boolean") next.pauseOnFocusLoss = value.pauseOnFocusLoss;
  if (typeof value.expand === "boolean") next.expand = value.expand;
  if (typeof value.gap === "number") next.gap = value.gap;
  if (value.offset !== undefined) next.offset = value.offset;
  if (value.swipeDirection) next.swipeDirection = value.swipeDirection;
  if (value.animation) next.animation = value.animation;
  return next;
}

export const store = createStore();
