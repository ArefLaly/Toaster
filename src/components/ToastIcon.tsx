import type { ReactNode } from "react";
import { DefaultIcon } from "../icons/DefaultIcon";
import { ErrorIcon } from "../icons/ErrorIcon";
import { InfoIcon } from "../icons/InfoIcon";
import { LoadingIcon } from "../icons/LoadingIcon";
import { SuccessIcon } from "../icons/SuccessIcon";
import { WarningIcon } from "../icons/WarningIcon";
import type { ToastType } from "../types";

const ICONS: Record<ToastType, () => ReactNode> = {
  default: DefaultIcon,
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon,
  loading: LoadingIcon,
};

export function ToastIcon({ type, icon }: { type: ToastType; icon?: ReactNode }) {
  if (icon === null) return null;
  if (icon !== undefined) return <div className="toastra__icon">{icon}</div>;
  const Glyph = ICONS[type];
  return (
    <div className="toastra__icon" data-type={type}>
      <Glyph />
    </div>
  );
}
