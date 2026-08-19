export type StoreListener = () => void;

export function createEmitter() {
  const listeners = new Set<StoreListener>();

  return {
    subscribe(listener: StoreListener): () => void {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    emit(): void {
      listeners.forEach((listener) => {
        listener();
      });
    },
    size(): number {
      return listeners.size;
    },
  };
}
