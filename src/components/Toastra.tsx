"use client";

import { useEffect } from "react";
import { store } from "../core/store";
import { toast } from "../core/manager";
import { useConfirm } from "../hooks/useConfirm";
import { useToastra } from "../hooks/useToastra";
import { ensureToastraStyles } from "../styles/inject";
import type { ToastPosition, ToastraProps } from "../types";
import { formatOffset } from "../utils/helpers";
import { ConfirmDialog } from "./ConfirmDialog";
import { ToastViewport } from "./ToastViewport";

const POSITIONS: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

export function Toastra(props: ToastraProps) {
  const snapshot = useToastra();
  const { dialog } = useConfirm();

  useEffect(() => {
    ensureToastraStyles();
    store.setHostProps(props);
  }, [props]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (dialog) return;
      const latest = [...snapshot.toasts].reverse().find((item) => item.visible && item.dismissible);
      if (latest) toast.dismiss(latest.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [snapshot.toasts, dialog]);

  const theme = resolveTheme(snapshot.config.theme);
  const visible = snapshot.toasts.filter((item) => item.visible);

  return (
    <div
      className={["toastra", props.className].filter(Boolean).join(" ")}
      data-toastra-theme={theme}
      data-rich={snapshot.config.richColors ? "true" : "false"}
      style={{
        ["--toastra-gap" as string]: `${snapshot.config.gap}px`,
        ["--toastra-offset" as string]: formatOffset(snapshot.config.offset),
      }}
    >
      {POSITIONS.map((position) => (
        <ToastViewport
          key={position}
          position={position}
          toasts={visible.filter((item) => item.position === position)}
          animation={snapshot.config.animation}
          swipeDirection={snapshot.config.swipeDirection}
        />
      ))}
      {dialog ? <ConfirmDialog dialog={dialog} /> : null}
    </div>
  );
}

function resolveTheme(theme: ToastraProps["theme"]): "light" | "dark" {
  if (theme === "light" || theme === "dark") return theme;
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
