import type { CSSProperties, ReactNode } from "react";

export type ToastType = "default" | "success" | "error" | "warning" | "info" | "loading";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type ToastTheme = "light" | "dark" | "system";

export type ToastAnimation = "slide" | "fade" | "scale";

export type SwipeDirection = "horizontal" | "vertical" | "left" | "right" | "up" | "down";

export interface ToastAction {
  label: ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export interface ToastOptions {
  id?: string;
  type?: ToastType;
  title?: ReactNode;
  description?: ReactNode;
  duration?: number;
  position?: ToastPosition;
  icon?: ReactNode;
  action?: ToastAction;
  cancel?: ToastAction;
  closeButton?: boolean;
  dismissible?: boolean;
  pauseOnHover?: boolean;
  pauseOnFocusLoss?: boolean;
  showProgress?: boolean;
  className?: string;
  style?: CSSProperties;
  data?: unknown;
}

export type ToastCustomRender = (toast: ToastData) => ReactNode;

export interface ToastData {
  id: string;
  type: ToastType;
  title?: ReactNode;
  description?: ReactNode;
  duration: number;
  position: ToastPosition;
  icon?: ReactNode;
  action?: ToastAction;
  cancel?: ToastAction;
  closeButton: boolean;
  dismissible: boolean;
  pauseOnHover: boolean;
  pauseOnFocusLoss: boolean;
  showProgress: boolean;
  className?: string;
  style?: CSSProperties;
  data?: unknown;
  createdAt: number;
  visible: boolean;
  paused: boolean;
  remaining: number;
  customRender?: ToastCustomRender;
}

export interface ToastraProps {
  position?: ToastPosition;
  duration?: number;
  maxToasts?: number;
  theme?: ToastTheme;
  closeButton?: boolean;
  richColors?: boolean;
  showProgress?: boolean;
  pauseOnHover?: boolean;
  pauseOnFocusLoss?: boolean;
  expand?: boolean;
  gap?: number;
  offset?: number | string;
  className?: string;
  toastOptions?: Partial<ToastOptions>;
  swipeDirection?: SwipeDirection;
  animation?: ToastAnimation;
}

export interface ToastConfigureOptions extends Partial<ToastraProps> {
  duration?: number;
  position?: ToastPosition;
}

export interface PromiseMessages<T> {
  loading: ReactNode | ToastOptions;
  success: ReactNode | ToastOptions | ((data: T) => ReactNode | ToastOptions);
  error: ReactNode | ToastOptions | ((error: unknown) => ReactNode | ToastOptions);
}

export type ToastInput = ReactNode | (ToastOptions & { message?: ReactNode });

export interface StoreSnapshot {
  toasts: readonly ToastData[];
  config: Required<
    Pick<
      ToastraProps,
      | "position"
      | "duration"
      | "maxToasts"
      | "theme"
      | "closeButton"
      | "richColors"
      | "showProgress"
      | "pauseOnHover"
      | "pauseOnFocusLoss"
      | "expand"
      | "gap"
      | "offset"
      | "swipeDirection"
      | "animation"
    >
  > & {
    toastOptions: Partial<ToastOptions>;
  };
}
