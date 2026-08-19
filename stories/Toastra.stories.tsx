import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toastra, toast } from "../src";

const buttonStyle: CSSProperties = {
  border: "1px solid rgba(48, 36, 18, 0.12)",
  background: "#fffdf8",
  color: "#1a1713",
  borderRadius: 999,
  minHeight: 40,
  padding: "0 16px",
  fontWeight: 700,
  fontFamily: "Avenir Next, Segoe UI, sans-serif",
  cursor: "pointer",
};

function Playground() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "56px 28px 80px",
        fontFamily: "Avenir Next, Segoe UI, sans-serif",
        background:
          "radial-gradient(circle at top right, rgba(201, 162, 39, 0.16), transparent 30%), #f4efe6",
      }}
    >
      <Toastra position="top-right" theme="system" showProgress />
      <p style={{ letterSpacing: "0.18em", textTransform: "uppercase", fontSize: 12, color: "#6b6258", margin: 0 }}>
        React · TypeScript · Next.js
      </p>
      <h1 style={{ margin: "10px 0 0", fontSize: 64, letterSpacing: "-0.05em" }}>Toastra</h1>
      <p style={{ margin: "12px 0 0", fontSize: 20, color: "#4a433b", maxWidth: 440 }}>
        Beautiful notifications for React.
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 32, maxWidth: 560 }}>
        <button
          type="button"
          style={buttonStyle}
          onClick={() =>
            toast.success({
              title: "Changes saved",
              description: "Your employee record is up to date.",
            })
          }
        >
          Success
        </button>
        <button type="button" style={buttonStyle} onClick={() => toast.error({ title: "Could not save", description: "Check the form and try again." })}>
          Error
        </button>
        <button type="button" style={buttonStyle} onClick={() => toast.warning({ title: "Missing fields", description: "Email and department are required." })}>
          Warning
        </button>
        <button type="button" style={buttonStyle} onClick={() => toast.info({ title: "Update available", description: "Version 2.0 is ready to install." })}>
          Info
        </button>
        <button type="button" style={buttonStyle} onClick={() => toast.loading({ title: "Uploading file…", description: "This stays until you update it." })}>
          Loading
        </button>
        <button
          type="button"
          style={buttonStyle}
          onClick={() =>
            void toast.promise(new Promise((resolve) => setTimeout(resolve, 1200)), {
              loading: { title: "Saving employee…", description: "Please wait a moment." },
              success: { title: "Employee created", description: "Ada Lovelace was added." },
              error: { title: "Save failed", description: "The request did not complete." },
            })
          }
        >
          Promise
        </button>
        <button
          type="button"
          style={buttonStyle}
          onClick={() =>
            toast({
              type: "info",
              title: "New version available",
              description: "Version 2.0 is ready. You can keep working until you update.",
              action: { label: "Update now", onClick: () => toast.success("Updated to 2.0") },
              cancel: { label: "Later", onClick: () => {} },
            })
          }
        >
          Action
        </button>
        <button
          type="button"
          style={buttonStyle}
          onClick={() =>
            toast({
              type: "success",
              title: "Employee deleted",
              description: "You can bring this record back.",
              action: { label: "Undo", onClick: () => toast.success("Employee restored") },
            })
          }
        >
          Undo
        </button>
        <button
          type="button"
          style={buttonStyle}
          onClick={() =>
            toast.custom({
              title: <strong>New teammate</strong>,
              description: <span>Mohammad has joined the team.</span>,
            })
          }
        >
          Custom
        </button>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => {
            void toast
              .confirm({
                title: "Delete this employee?",
                description: "Ada Lovelace will be removed. This cannot be undone.",
                confirm: "Delete",
                cancel: "Keep",
                type: "error",
              })
              .then((ok) => {
                if (ok) toast.success({ title: "Employee deleted", description: "Ada Lovelace was removed." });
                else toast.info("Delete cancelled");
              });
          }}
        >
          Delete
        </button>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => {
            void toast
              .confirm({
                title: "Log out?",
                description: "You will need to sign in again to continue.",
                confirm: "Log out",
                cancel: "Stay",
                type: "warning",
              })
              .then((ok) => {
                if (ok) toast.success("You have been logged out");
                else toast.info("Still signed in");
              });
          }}
        >
          Logout
        </button>
        {(
          [
            ["pop", "pop"],
            ["bounce", "bounce"],
            ["flip", "flip"],
            ["blur", "fade"],
            ["slide-x", "slide-x"],
            ["zoom", "scale"],
          ] as const
        ).map(([enter, exit]) => (
          <button
            key={enter}
            type="button"
            style={buttonStyle}
            onClick={() =>
              toast.success({
                title: `${enter} in`,
                description: `${exit} out`,
                animation: { enter, exit },
              })
            }
          >
            {enter}
          </button>
        ))}
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
    <div style={{ background: "#16130f", minHeight: "100vh", color: "#f6efe4", padding: 56 }}>
      <Toastra theme="dark" position="bottom-right" showProgress />
      <h2 style={{ marginTop: 0 }}>Dark mode</h2>
      <button
        type="button"
        style={{ ...buttonStyle, background: "#201b16", color: "#f6efe4", borderColor: "#3a3229" }}
        onClick={() =>
          toast.success({
            title: "Night shift saved",
            description: "The schedule is live for tomorrow.",
          })
        }
      >
        Show toast
      </button>
    </div>
  ),
};
export const Progress: Story = {
  render: () => (
    <div style={{ padding: 56, background: "#f4efe6", minHeight: "100vh" }}>
      <Toastra showProgress duration={6000} />
      <button type="button" style={buttonStyle} onClick={() => toast.info({ title: "Watch the bar", description: "It pauses if you hover." })}>
        Progress
      </button>
    </div>
  ),
};
export const Confirm: Story = {
  render: () => (
    <div style={{ padding: 56, background: "#f4efe6", minHeight: "100vh" }}>
      <Toastra />
      <h2 style={{ marginTop: 0 }}>Confirm dialogs</h2>
      <p style={{ color: "#4a433b", maxWidth: 420 }}>
        SweetAlert-style prompts for delete and logout. Confirm returns a boolean.
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => {
            void toast
              .confirm({
                title: "Delete this employee?",
                description: "This cannot be undone.",
                confirm: "Delete",
                cancel: "Keep",
                type: "error",
              })
              .then((ok) => {
                if (ok) toast.success("Employee deleted");
              });
          }}
        >
          Delete
        </button>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => {
            void toast
              .confirm({
                title: "Log out?",
                description: "You will need to sign in again.",
                confirm: "Log out",
                cancel: "Stay",
                type: "warning",
              })
              .then((ok) => {
                if (ok) toast.success("Logged out");
              });
          }}
        >
          Logout
        </button>
      </div>
    </div>
  ),
};
export const Persistent: Story = {
  render: () => (
    <div style={{ padding: 56, background: "#f4efe6", minHeight: "100vh" }}>
      <Toastra />
      <button type="button" style={buttonStyle} onClick={() => toast.loading({ title: "Still working…", description: "This stays until you dismiss it." })}>
        Persistent loading
      </button>
    </div>
  ),
};
