export class PauseableTimer {
  private remaining: number;
  private startedAt: number | null = null;
  private handle: ReturnType<typeof setTimeout> | null = null;
  private readonly onDone: () => void;

  constructor(duration: number, onDone: () => void) {
    this.remaining = duration;
    this.onDone = onDone;
  }

  start(): void {
    if (this.remaining === Number.POSITIVE_INFINITY || this.remaining <= 0 || this.handle) return;
    this.startedAt = Date.now();
    this.handle = setTimeout(() => {
      this.handle = null;
      this.remaining = 0;
      this.onDone();
    }, this.remaining);
  }

  pause(): void {
    if (!this.handle || this.startedAt === null) return;
    clearTimeout(this.handle);
    this.handle = null;
    this.remaining = Math.max(0, this.remaining - (Date.now() - this.startedAt));
    this.startedAt = null;
  }

  getRemaining(): number {
    if (this.handle && this.startedAt !== null) {
      return Math.max(0, this.remaining - (Date.now() - this.startedAt));
    }
    return this.remaining;
  }

  clear(): void {
    if (this.handle) clearTimeout(this.handle);
    this.handle = null;
    this.startedAt = null;
  }
}
