"use client";

import { useEffect, useRef } from "react";
import { confirmStore } from "../core/confirm";
import type { ConfirmDialogData } from "../types";
import { ToastIcon } from "./ToastIcon";

export function ConfirmDialog({ dialog }: { dialog: ConfirmDialogData }) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const target = dialog.danger ? cancelRef.current : confirmRef.current;
    target?.focus();
  }, [dialog.id, dialog.danger]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        confirmStore.cancel();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="toastra__confirm" role="presentation">
      <button
        type="button"
        className="toastra__confirm-backdrop"
        aria-label="Dismiss confirmation"
        onClick={() => confirmStore.cancel()}
      />
      <div
        className="toastra__confirm-card"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={`toastra-confirm-title-${dialog.id}`}
        data-type={dialog.type}
        data-danger={dialog.danger ? "true" : "false"}
      >
        <ToastIcon type={dialog.type} icon={dialog.icon} />
        <div className="toastra__body">
          <p className="toastra__title" id={`toastra-confirm-title-${dialog.id}`}>
            {dialog.title}
          </p>
          {dialog.description ? (
            <p className="toastra__description">{dialog.description}</p>
          ) : null}
          <div className="toastra__actions">
            <button
              ref={cancelRef}
              type="button"
              className="toastra__button toastra__button--cancel"
              onClick={() => confirmStore.cancel()}
            >
              {dialog.cancelLabel}
            </button>
            <button
              ref={confirmRef}
              type="button"
              className={[
                "toastra__button",
                "toastra__button--action",
                dialog.danger ? "toastra__button--danger" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => confirmStore.confirm()}
            >
              {dialog.confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
