import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { describe, expect, it, vi } from "vitest";
import { Toastra } from "../src/components/Toastra";
import { toast } from "../src/core/manager";

describe("Toastra UI", () => {
  it("renders typed toasts and accessible roles", async () => {
    render(<Toastra />);
    act(() => {
      toast.success({ title: "Employee Created", description: "The employee was successfully created." });
      toast.error("Something went wrong");
    });
    expect(await screen.findByText("Employee Created")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
    expect(screen.getByRole("status")).toHaveTextContent("Employee Created");
  });

  it("renders action and close buttons", async () => {
    const onAction = vi.fn();
    render(<Toastra closeButton />);
    act(() => {
      toast({
        type: "info",
        title: "New version available",
        description: "Version 2.0 is ready.",
        action: { label: "Update", onClick: onAction },
      });
    });
    await userEvent.click(screen.getByRole("button", { name: "Update" }));
    expect(onAction).toHaveBeenCalled();
    await userEvent.click(screen.getByRole("button", { name: "Dismiss notification" }));
    await waitFor(() => {
      expect(screen.queryByText("New version available")).not.toBeInTheDocument();
    });
  });

  it("supports custom render functions", async () => {
    render(<Toastra />);
    act(() => {
      toast.custom((item) => <div>Custom {item.id}</div>);
    });
    expect(await screen.findByText(/Custom toastra-/)).toBeInTheDocument();
  });

  it("dismisses the latest toast with Escape", async () => {
    render(<Toastra />);
    act(() => {
      toast.success("Keep");
      toast.info("Gone");
    });
    await screen.findByText("Gone");
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByText("Gone")).not.toBeInTheDocument();
    expect(screen.getByText("Keep")).toBeInTheDocument();
  });

  it("applies theme and progress", async () => {
    const { container } = render(<Toastra theme="dark" showProgress duration={4000} />);
    act(() => {
      toast.success("Saved successfully");
    });
    expect(container.querySelector("[data-toastra-theme='dark']")).toBeTruthy();
    expect(await screen.findByText("Saved successfully")).toBeInTheDocument();
    expect(container.querySelector(".toastra__progress")).toBeTruthy();
  });
});
