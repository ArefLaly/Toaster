import { describe, expect, it } from "vitest";
import { toast } from "../src/core/manager";
import { store } from "../src/core/store";

describe("toast core", () => {
  it("creates a toast and returns an id", () => {
    const id = toast("Hello world");
    expect(id).toMatch(/^toastra-/);
    expect(toast.isActive(id)).toBe(true);
    expect(store.getSnapshot().toasts[0]?.title).toBe("Hello world");
  });

  it("supports typed helpers and object syntax", () => {
    toast.success("Saved");
    toast.error({ title: "Failed", description: "Try again" });
    toast({ type: "info", title: "Update", description: "Ready" });
    expect(store.getSnapshot().toasts.map((item) => item.type)).toEqual(["success", "error", "info"]);
  });

  it("prevents duplicate ids by updating the same toast", () => {
    toast.success("Saved", { id: "save-success" });
    toast.success("Saved again", { id: "save-success" });
    expect(store.getSnapshot().toasts).toHaveLength(1);
    expect(store.getSnapshot().toasts[0]?.title).toBe("Saved again");
  });

  it("updates and dismisses by id", () => {
    const id = toast.loading("Processing...");
    toast.update(id, { type: "success", title: "Completed" });
    expect(store.getSnapshot().toasts[0]?.type).toBe("success");
    toast.dismiss(id);
    expect(toast.isActive(id)).toBe(false);
  });

  it("dismissAll clears every toast", () => {
    toast.success("One");
    toast.error("Two");
    toast.dismissAll();
    expect(store.getSnapshot().toasts).toHaveLength(0);
  });

  it("keeps loading toasts until updated", () => {
    const id = toast.loading("Uploading...");
    expect(store.getSnapshot().toasts[0]?.duration).toBe(Number.POSITIVE_INFINITY);
    toast.update(id, { type: "success", title: "Done" });
    expect(store.getSnapshot().toasts[0]?.duration).toBe(4000);
  });

  it("queues toasts beyond maxToasts", () => {
    toast.configure({ maxToasts: 2 });
    const first = toast.success("1");
    const second = toast.success("2");
    const third = toast.success("3");
    const snapshot = store.getSnapshot();
    expect(snapshot.toasts.find((item) => item.id === first)?.visible).toBe(true);
    expect(snapshot.toasts.find((item) => item.id === second)?.visible).toBe(true);
    expect(snapshot.toasts.find((item) => item.id === third)?.visible).toBe(false);
    toast.dismiss(first);
    expect(store.getSnapshot().toasts.find((item) => item.id === third)?.visible).toBe(true);
  });

  it("does not throw when updating or dismissing a missing id", () => {
    expect(() => toast.update("missing", { title: "Nope" })).not.toThrow();
    expect(() => toast.dismiss("missing")).not.toThrow();
    expect(toast.isActive("")).toBe(false);
  });
});

describe("toast.promise", () => {
  it("transitions loading to success", async () => {
    const run = toast.promise(Promise.resolve({ name: "Ada" }), {
      loading: "Saving...",
      success: (data) => `Employee ${data.name} created!`,
      error: "Failed",
    });
    expect(store.getSnapshot().toasts[0]?.type).toBe("loading");
    await run;
    expect(store.getSnapshot().toasts[0]?.type).toBe("success");
    expect(store.getSnapshot().toasts[0]?.title).toBe("Employee Ada created!");
    expect(run.id).toBeTruthy();
  });

  it("transitions loading to error", async () => {
    const run = toast.promise(Promise.reject(new Error("nope")), {
      loading: "Saving...",
      success: "Saved",
      error: (error) => (error instanceof Error ? error.message : "Failed"),
    });
    await expect(run).rejects.toThrow("nope");
    expect(store.getSnapshot().toasts[0]?.type).toBe("error");
    expect(store.getSnapshot().toasts[0]?.title).toBe("nope");
  });
});
