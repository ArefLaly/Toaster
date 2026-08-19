import type { ReactNode } from "react";
import type {
  PromiseMessages,
  ToastConfigureOptions,
  ToastConfirmOptions,
  ToastCustomRender,
  ToastData,
  ToastInput,
  ToastOptions,
  ToastType,
} from "../types";
import { createToastId } from "../utils/id";
import { normalizeInput, resolveMessage } from "../utils/helpers";
import { confirmStore } from "./confirm";
import { store } from "./store";

function buildToast(options: ToastOptions, customRender?: ToastCustomRender): ToastData {
  const resolved = store.resolveOptions(options);
  return {
    id: options.id ?? createToastId(),
    type: options.type ?? "default",
    title: options.title,
    description: options.description,
    icon: options.icon,
    action: options.action,
    cancel: options.cancel,
    className: options.className,
    style: options.style,
    data: options.data,
    createdAt: Date.now(),
    visible: false,
    paused: false,
    remaining: resolved.duration,
    customRender,
    ...resolved,
  };
}

function push(options: ToastOptions, customRender?: ToastCustomRender): string {
  return store.add(buildToast(options, customRender)).id;
}

function typed(type: ToastType) {
  return (input: ToastInput, options?: ToastOptions): string => {
    return push(normalizeInput(input, { ...options, type }, type));
  };
}

function promiseToast<T>(
  source: Promise<T> | (() => Promise<T>),
  messages: PromiseMessages<T>,
): Promise<T> & { id: string } {
  const loading = normalizeInput(messages.loading, { type: "loading" }, "loading");
  const id = push(loading);
  const run = typeof source === "function" ? source() : source;

  const wrapped = run.then(
    (data) => {
      if (store.isActive(id)) {
        store.update(id, {
          ...buildToast({ ...resolveMessage(messages.success, data, "success"), id }),
          id,
        });
      }
      return data;
    },
    (error: unknown) => {
      if (store.isActive(id)) {
        store.update(id, {
          ...buildToast({ ...resolveMessage(messages.error, error, "error"), id }),
          id,
        });
      }
      throw error;
    },
  ) as Promise<T> & { id: string };

  wrapped.id = id;
  return wrapped;
}

function custom(
  input: ToastOptions | ToastCustomRender,
  options?: ToastOptions,
): string {
  if (typeof input === "function") {
    return push({ ...options, type: options?.type ?? "default" }, input);
  }
  return push(normalizeInput(input, options, options?.type ?? "default"));
}

export const toast = Object.assign(
  (input: ToastInput, options?: ToastOptions): string => push(normalizeInput(input, options)),
  {
    success: typed("success"),
    error: typed("error"),
    warning: typed("warning"),
    info: typed("info"),
    loading: typed("loading"),
    custom,
    promise: promiseToast,
    update(id: string, options: ToastOptions): string {
      if (!id || !store.isActive(id)) return id;
      const current = store.getSnapshot().toasts.find((item) => item.id === id);
      store.update(id, {
        ...buildToast({
          title: current?.title,
          description: current?.description,
          ...options,
          id,
          type: options.type ?? current?.type,
        }),
        id,
      });
      return id;
    },
    dismiss(id?: string): void {
      store.dismiss(id);
    },
    dismissAll(): void {
      store.dismiss();
    },
    isActive(id: string): boolean {
      return Boolean(id) && store.isActive(id);
    },
    configure(options: ToastConfigureOptions): void {
      store.configure(options);
    },
    confirm(input: ToastConfirmOptions | string): Promise<boolean> {
      return confirmStore.open(input);
    },
  },
);

export type ToastApi = typeof toast;

export function getToasts(): readonly ToastData[] {
  return store.getSnapshot().toasts;
}

export type { ReactNode };
