import type { ConfirmDialogData, ToastConfirmOptions, ToastType } from "../types";
import { createToastId } from "../utils/id";
import { createEmitter } from "./events";

export interface ConfirmSnapshot {
  dialog: ConfirmDialogData | null;
}

type ConfirmResolver = (value: boolean) => void;

const DEFAULT_TITLE = "Are you sure?";
const DEFAULT_CONFIRM = "Confirm";
const DEFAULT_CANCEL = "Cancel";

function createConfirmStore() {
  let dialog: ConfirmDialogData | null = null;
  let resolveCurrent: ConfirmResolver | null = null;
  let snapshot: ConfirmSnapshot = { dialog: null };
  const emitter = createEmitter();

  function publish(): void {
    snapshot = { dialog };
    emitter.emit();
  }

  function close(value: boolean): void {
    const resolve = resolveCurrent;
    resolveCurrent = null;
    dialog = null;
    publish();
    resolve?.(value);
  }

  return {
    subscribe: emitter.subscribe,
    getSnapshot(): ConfirmSnapshot {
      return snapshot;
    },
    getServerSnapshot(): ConfirmSnapshot {
      return { dialog: null };
    },
    open(input: ToastConfirmOptions | string): Promise<boolean> {
      if (resolveCurrent) {
        resolveCurrent(false);
        resolveCurrent = null;
      }

      const options: ToastConfirmOptions = typeof input === "string" ? { title: input } : input;
      const type: ToastType = options.type ?? (options.danger ? "error" : "warning");
      const danger = options.danger ?? (type === "error" || type === "warning");

      dialog = {
        id: createToastId(),
        title: options.title ?? DEFAULT_TITLE,
        description: options.description,
        confirmLabel: options.confirm ?? DEFAULT_CONFIRM,
        cancelLabel: options.cancel ?? DEFAULT_CANCEL,
        type,
        icon: options.icon,
        danger,
      };

      return new Promise<boolean>((resolve) => {
        resolveCurrent = resolve;
        publish();
      });
    },
    confirm(): void {
      close(true);
    },
    cancel(): void {
      close(false);
    },
    isOpen(): boolean {
      return dialog !== null;
    },
  };
}

export const confirmStore = createConfirmStore();
