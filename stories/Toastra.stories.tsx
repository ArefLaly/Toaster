import type { Meta, StoryObj } from "@storybook/react";
import { Toastra, toast } from "../src";

function Playground() {
  return (
    <div style={{ minHeight: "100vh", padding: 32, fontFamily: "sans-serif" }}>
      <Toastra position="top-right" theme="system" showProgress />
      <h1>Toastra</h1>
      <p>Beautiful notifications for React.</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button type="button" onClick={() => toast.success("Successfully saved!")}>
          Success
        </button>
        <button type="button" onClick={() => toast.error("Something went wrong")}>
          Error
        </button>
        <button type="button" onClick={() => toast.warning("Please check your information")}>
          Warning
        </button>
        <button type="button" onClick={() => toast.info("New update available")}>
          Info
        </button>
        <button type="button" onClick={() => toast.loading("Uploading...")}>
          Loading
        </button>
        <button
          type="button"
          onClick={() =>
            toast.promise(new Promise((resolve) => setTimeout(resolve, 1200)), {
              loading: "Saving...",
              success: "Saved successfully!",
              error: "Failed to save.",
            })
          }
        >
          Promise
        </button>
        <button
          type="button"
          onClick={() =>
            toast({
              type: "info",
              title: "New version available",
              description: "Version 2.0 is ready.",
              action: { label: "Update", onClick: () => toast.success("Updated") },
            })
          }
        >
          Action
        </button>
        <button
          type="button"
          onClick={() =>
            toast.custom((item) => (
              <strong style={{ padding: 12, display: "block" }}>Custom toast {item.id}</strong>
            ))
          }
        >
          Custom
        </button>
      </div>
    </div>
  );
}

const meta = {
  title: "Toastra",
  component: Playground,
} satisfies Meta<typeof Playground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const DarkMode: Story = {
  render: () => (
    <div style={{ background: "#16130f", minHeight: "100vh", color: "#f6efe4", padding: 32 }}>
      <Toastra theme="dark" position="bottom-right" />
      <button type="button" onClick={() => toast.success("Dark mode toast")}>
        Show toast
      </button>
    </div>
  ),
};
export const Progress: Story = {
  render: () => (
    <div style={{ padding: 32 }}>
      <Toastra showProgress duration={6000} />
      <button type="button" onClick={() => toast.info("Watch the progress bar")}>
        Progress
      </button>
    </div>
  ),
};
export const Persistent: Story = {
  render: () => (
    <div style={{ padding: 32 }}>
      <Toastra />
      <button type="button" onClick={() => toast.loading("Still working...")}>
        Persistent loading
      </button>
    </div>
  ),
};
