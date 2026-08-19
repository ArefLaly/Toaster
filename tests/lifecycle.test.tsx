import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it, vi } from "vitest";
import { Toastra } from "../src/components/Toastra";
import { toast } from "../src/core/manager";
import { PauseableTimer } from "../src/utils/timer";

describe("lifecycle", () => {
  it("auto-dismisses after duration and cleans up", async () => {
    render(<Toastra duration={80} />);
    act(() => {
      toast.success("Temporary");
    });
    expect(screen.getByText("Temporary")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText("Temporary")).not.toBeInTheDocument();
    });
  });

  it("does not leak timers after unmount", () => {
    vi.useFakeTimers();
    const view = render(<Toastra duration={2000} />);
    act(() => {
      toast.info("Unmount me");
    });
    view.unmount();
    expect(() => {
      vi.runOnlyPendingTimers();
    }).not.toThrow();
    vi.useRealTimers();
  });

  it("pauses and resumes a timer without losing remaining time", () => {
    vi.useFakeTimers();
    const done = vi.fn();
    const timer = new PauseableTimer(1000, done);
    timer.start();
    vi.advanceTimersByTime(400);
    timer.pause();
    expect(timer.getRemaining()).toBeLessThanOrEqual(600);
    timer.start();
    vi.advanceTimersByTime(600);
    expect(done).toHaveBeenCalledTimes(1);
    timer.clear();
    vi.useRealTimers();
  });
});
