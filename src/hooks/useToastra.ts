import { useSyncExternalStore } from "react";
import { store } from "../core/store";
import type { StoreSnapshot } from "../types";

export function useToastra(): StoreSnapshot {
  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
}
