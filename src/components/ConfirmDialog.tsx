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
        <div className="toastra__confirm-main">
          <div className="toastra__confirm-badge">
            <ToastIcon type={dialog.type} icon={dialog.icon} />
          </div>
          <h2 className="toastra__confirm-title" id={`toastra-confirm-title-${dialog.id}`}>
            {dialog.title}
          </h2>
          {dialog.description ? (
            <p className="toastra__confirm-text">{dialog.description}</p>
          ) : null}
        </div>
        <div className="toastra__confirm-footer">
          <button
            ref={cancelRef}
            type="button"
            className="toastra__confirm-btn toastra__confirm-btn--ghost"
            onClick={() => confirmStore.cancel()}
          >
            {dialog.cancelLabel}
          </button>
          <button
            ref={confirmRef}
            type="button"
            className={[
              "toastra__confirm-btn",
              "toastra__confirm-btn--solid",
              dialog.danger ? "toastra__confirm-btn--danger" : "",
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
  );
}
