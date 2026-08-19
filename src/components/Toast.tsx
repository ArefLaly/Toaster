import { useEffect, useRef, useState, type PointerEvent } from "react";
import { toast } from "../core/manager";
import type { SwipeDirection, ToastAnimation, ToastData } from "../types";
import { PauseableTimer } from "../utils/timer";
import { ToastActions } from "./ToastActions";
import { ToastIcon } from "./ToastIcon";
import { ToastProgress } from "./ToastProgress";

const SWIPE_THRESHOLD = 72;

export function Toast({
  data,
  animation,
  swipeDirection,
  edge,
}: {
  data: ToastData;
  animation: ToastAnimation;
  swipeDirection: SwipeDirection;
  edge: "top" | "bottom";
}) {
  const [leaving, setLeaving] = useState(false);
  const [remaining, setRemaining] = useState(data.remaining);
  const [paused, setPaused] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const timer = useRef<PauseableTimer | null>(null);
  const frame = useRef<number | null>(null);
  const pointer = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    timer.current?.clear();
    if (!Number.isFinite(data.duration) || data.duration <= 0 || !data.visible) return;

    const next = new PauseableTimer(data.remaining || data.duration, () => {
      setLeaving(true);
    });
    timer.current = next;
    next.start();

    const tick = () => {
      setRemaining(next.getRemaining());
      frame.current = window.requestAnimationFrame(tick);
    };
    frame.current = window.requestAnimationFrame(tick);

    return () => {
      next.clear();
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, [data.id, data.duration, data.remaining, data.visible, data.type]);

  useEffect(() => {
    if (!data.pauseOnFocusLoss || typeof document === "undefined") return;
    const onVisibility = () => {
      if (document.hidden) {
        timer.current?.pause();
        setPaused(true);
      } else if (!paused) {
        timer.current?.start();
        setPaused(false);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [data.pauseOnFocusLoss, paused]);

  useEffect(() => {
    if (!leaving) return;
    const id = window.setTimeout(() => toast.dismiss(data.id), 260);
    return () => window.clearTimeout(id);
  }, [leaving, data.id]);

  const pause = () => {
    if (!data.pauseOnHover) return;
    timer.current?.pause();
    setPaused(true);
  };

  const resume = () => {
    if (!data.pauseOnHover) return;
    timer.current?.start();
    setPaused(false);
  };

  const requestDismiss = () => {
    if (!data.dismissible) return;
    setLeaving(true);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointer.current = { x: event.clientX, y: event.clientY, active: true };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointer.current.active) return;
    const dx = event.clientX - pointer.current.x;
    const dy = event.clientY - pointer.current.y;
    const next = constrainSwipe(dx, dy, swipeDirection);
    setOffset(next);
  };

  const onPointerUp = () => {
    if (!pointer.current.active) return;
    pointer.current.active = false;
    const distance = Math.abs(offset.x) + Math.abs(offset.y);
    if (distance > SWIPE_THRESHOLD && data.dismissible) {
      setLeaving(true);
      return;
    }
    setOffset({ x: 0, y: 0 });
  };

  if (data.customRender) {
    return (
      <div
        className="toastra__toast toastra__toast--custom"
        data-type={data.type}
        data-leaving={leaving}
        data-animation={animation}
        data-edge={edge}
        role={data.type === "error" ? "alert" : "status"}
        aria-live={data.type === "error" ? "assertive" : "polite"}
      >
        {data.customRender(data)}
      </div>
    );
  }

  return (
    <div
      className={["toastra__toast", data.className].filter(Boolean).join(" ")}
      style={{
        ...data.style,
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      }}
      data-type={data.type}
      data-leaving={leaving}
      data-animation={animation}
      data-edge={edge}
      data-progress={data.showProgress ? "true" : "false"}
      role={data.type === "error" ? "alert" : "status"}
      aria-live={data.type === "error" ? "assertive" : "polite"}
      tabIndex={0}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <ToastIcon type={data.type} icon={data.icon} />
      <div className="toastra__body">
        {data.title ? <p className="toastra__title">{data.title}</p> : null}
        {data.description ? <p className="toastra__description">{data.description}</p> : null}
        <ToastActions
          action={
            data.action
              ? {
                  ...data.action,
                  onClick: (event) => {
                    data.action?.onClick(event);
                    requestDismiss();
                  },
                }
              : undefined
          }
          cancel={
            data.cancel
              ? {
                  ...data.cancel,
                  onClick: (event) => {
                    data.cancel?.onClick(event);
                    requestDismiss();
                  },
                }
              : undefined
          }
        />
      </div>
      {data.closeButton ? (
        <button type="button" className="toastra__close" aria-label="Dismiss notification" onClick={requestDismiss}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M4 4l8 8M12 4l-8 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </button>
      ) : (
        <span />
      )}
      {data.showProgress ? (
        <ToastProgress duration={data.duration} remaining={remaining} paused={paused} />
      ) : null}
    </div>
  );
}

function constrainSwipe(dx: number, dy: number, direction: SwipeDirection): { x: number; y: number } {
  switch (direction) {
    case "left":
      return { x: Math.min(0, dx), y: 0 };
    case "right":
      return { x: Math.max(0, dx), y: 0 };
    case "up":
      return { x: 0, y: Math.min(0, dy) };
    case "down":
      return { x: 0, y: Math.max(0, dy) };
    case "vertical":
      return { x: 0, y: dy };
    default:
      return { x: dx, y: 0 };
  }
}
