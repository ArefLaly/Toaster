import type { ReactNode } from "react";
import type { ToastInput, ToastOptions, ToastType } from "../types";

export function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !isReactElement(value);
}

export function isReactElement(value: unknown): boolean {
  return typeof value === "object" && value !== null && "$$typeof" in value;
}

export function normalizeInput(
  input: ToastInput,
  extras: ToastOptions = {},
  fallbackType: ToastType = "default",
): ToastOptions {
  if (typeof input === "string" || typeof input === "number" || isReactElement(input)) {
    return { ...extras, type: extras.type ?? fallbackType, title: input as ReactNode };
  }

  if (isObjectRecord(input)) {
    const options = input as ToastOptions & { message?: ReactNode };
    const title = options.title ?? options.message;
    return {
      ...extras,
      ...options,
      type: options.type ?? extras.type ?? fallbackType,
      title,
    };
  }

  return { ...extras, type: extras.type ?? fallbackType, title: input as ReactNode };
}

export function resolveMessage<T>(
  value: ReactNode | ToastOptions | ((payload: T) => ReactNode | ToastOptions),
  payload: T,
  fallbackType: ToastType,
): ToastOptions {
  const resolved = typeof value === "function" ? value(payload) : value;
  return normalizeInput(resolved, { type: fallbackType }, fallbackType);
}

export function isFiniteDuration(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

export function formatOffset(offset: number | string): string {
  return typeof offset === "number" ? `${offset}px` : offset;
}
