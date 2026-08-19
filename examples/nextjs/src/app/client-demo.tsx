"use client";

import { toast } from "toastra";

async function saveData() {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { name: "Ada" };
}

export function ClientDemo() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 24 }}>
      <button
        type="button"
        onClick={() =>
          toast.success({
            title: "Saved!",
            description: "Your changes have been saved.",
          })
        }
      >
        Save
      </button>
      <button
        type="button"
        onClick={() =>
          void toast.promise(saveData(), {
            loading: "Saving...",
            success: (data) => `Employee ${data.name} created!`,
            error: "Could not save data.",
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
            title: "New message",
            description: "You have received a new message.",
            action: { label: "View", onClick: () => toast.info("Opened inbox") },
          })
        }
      >
        Action
      </button>
    </div>
  );
}
