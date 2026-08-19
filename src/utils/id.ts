let sequence = 0;

export function createToastId(): string {
  sequence += 1;
  return `toastra-${sequence}-${Math.random().toString(36).slice(2, 8)}`;
}
