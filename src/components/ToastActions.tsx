import type { ToastAction } from "../types";

export function ToastActions({
  action,
  cancel,
}: {
  action?: ToastAction;
  cancel?: ToastAction;
}) {
  if (!action && !cancel) return null;

  return (
    <div className="toastra__actions">
      {cancel ? (
        <button
          type="button"
          className={["toastra__button", "toastra__button--cancel", cancel.className].filter(Boolean).join(" ")}
          onClick={cancel.onClick}
        >
          {cancel.label}
        </button>
      ) : null}
      {action ? (
        <button
          type="button"
          className={["toastra__button", "toastra__button--action", action.className].filter(Boolean).join(" ")}
          onClick={action.onClick}
        >
          {action.label}
        </button>
      ) : null}
    </div>
  );
}
