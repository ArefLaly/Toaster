import { describe, expect, it } from "vitest";
import { resolveMotion } from "../src/utils/motion";

describe("motion", () => {
  it("uses the same preset for enter and exit", () => {
    expect(resolveMotion("bounce", "pop")).toEqual({ enter: "bounce", exit: "bounce" });
  });

  it("allows mixed enter and exit", () => {
    expect(resolveMotion({ enter: "flip", exit: "blur" }, "slide")).toEqual({
      enter: "flip",
      exit: "blur",
    });
  });

  it("falls back when a side is omitted", () => {
    expect(resolveMotion({ enter: "zoom" }, "fade")).toEqual({ enter: "zoom", exit: "zoom" });
    expect(resolveMotion(undefined, "pop")).toEqual({ enter: "pop", exit: "pop" });
  });
});
