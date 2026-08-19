import type { SwipeDirection, ToastAnimation, ToastData, ToastPosition } from "../types";
import { Toast } from "./Toast";

export function ToastViewport({
  position,
  toasts,
  animation,
  swipeDirection,
}: {
  position: ToastPosition;
  toasts: readonly ToastData[];
  animation: ToastAnimation;
  swipeDirection: SwipeDirection;
}) {
  if (toasts.length === 0) return null;
  const edge = position.startsWith("bottom") ? "bottom" : "top";

  return (
    <div className={`toastra__viewport toastra__viewport--${position}`} data-position={position}>
      {toasts.map((item) => (
        <Toast
          key={item.id}
          data={item}
          animation={animation}
          swipeDirection={swipeDirection}
          edge={edge}
        />
      ))}
    </div>
  );
}
