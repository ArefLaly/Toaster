import { describe, expect, it } from "vitest";
import { confirmStore } from "../src/core/confirm";
import { toast } from "../src/core/manager";

describe("toast.confirm", () => {
  it("resolves true when confirmed", async () => {
    const pending = toast.confirm({
      title: "Delete this employee?",
      confirm: "Delete",
      type: "error",
    });
    expect(confirmStore.isOpen()).toBe(true);
    expect(confirmStore.getSnapshot().dialog?.title).toBe("Delete this employee?");
    confirmStore.confirm();
    await expect(pending).resolves.toBe(true);
    expect(confirmStore.isOpen()).toBe(false);
  });

  it("resolves false when cancelled", async () => {
    const pending = toast.confirm("Log out?");
    expect(confirmStore.getSnapshot().dialog?.title).toBe("Log out?");
    confirmStore.cancel();
    await expect(pending).resolves.toBe(false);
  });

  it("cancels the previous dialog when a new one opens", async () => {
    const first = toast.confirm("First");
    const second = toast.confirm("Second");
    expect(confirmStore.getSnapshot().dialog?.title).toBe("Second");
    await expect(first).resolves.toBe(false);
    confirmStore.confirm();
    await expect(second).resolves.toBe(true);
  });
});
