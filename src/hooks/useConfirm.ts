import { useSyncExternalStore } from "react";
import { confirmStore, type ConfirmSnapshot } from "../core/confirm";

export function useConfirm(): ConfirmSnapshot {
  return useSyncExternalStore(
    confirmStore.subscribe,
    confirmStore.getSnapshot,
    confirmStore.getServerSnapshot,
  );
}
