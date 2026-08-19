import type { ToastData } from "../types";

export function applyQueue(toasts: ToastData[], maxToasts: number): ToastData[] {
  const limit = Math.max(1, Math.floor(maxToasts) || 5);
  let visibleCount = 0;

  return toasts.map((toast) => {
    if (visibleCount < limit) {
      visibleCount += 1;
      if (toast.visible) return toast;
      return { ...toast, visible: true };
    }
    if (!toast.visible) return toast;
    return { ...toast, visible: false };
  });
}

export function visibleToasts(toasts: readonly ToastData[]): ToastData[] {
  return toasts.filter((toast) => toast.visible);
}

export function queuedToasts(toasts: readonly ToastData[]): ToastData[] {
  return toasts.filter((toast) => !toast.visible);
}
