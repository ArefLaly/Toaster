import type { ToastAnimation, ToastMotion, ToastPosition } from "../types";

export const TOAST_MOTIONS = [
  "slide",
  "slide-x",
  "fade",
  "scale",
  "pop",
  "bounce",
  "flip",
  "blur",
  "rise",
  "zoom",
] as const;

export const MOTION_MS: Record<ToastMotion, { enter: number; exit: number }> = {
  slide: { enter: 460, exit: 280 },
  "slide-x": { enter: 440, exit: 280 },
  fade: { enter: 320, exit: 220 },
  scale: { enter: 420, exit: 240 },
  pop: { enter: 540, exit: 300 },
  bounce: { enter: 620, exit: 340 },
  flip: { enter: 520, exit: 360 },
  blur: { enter: 480, exit: 280 },
  rise: { enter: 500, exit: 280 },
  zoom: { enter: 420, exit: 260 },
};

export function isToastMotion(value: unknown): value is ToastMotion {
  return typeof value === "string" && (TOAST_MOTIONS as readonly string[]).includes(value);
}

export function resolveMotion(
  animation: ToastAnimation | undefined,
  fallback: ToastAnimation,
): { enter: ToastMotion; exit: ToastMotion } {
  const resolved = animation ?? fallback;
  if (typeof resolved === "string") {
    return { enter: resolved, exit: resolved };
  }
  const base = typeof fallback === "string" ? fallback : (fallback.enter ?? "slide");
  const enter = resolved.enter ?? base;
  return {
    enter,
    exit: resolved.exit ?? enter,
  };
}

export function motionSide(position: ToastPosition): "left" | "right" | "center" {
  if (position.endsWith("left")) return "left";
  if (position.endsWith("right")) return "right";
  return "center";
}

export function sameAnimation(left: ToastAnimation, right: ToastAnimation): boolean {
  if (left === right) return true;
  if (typeof left === "string" || typeof right === "string") return false;
  return left.enter === right.enter && left.exit === right.exit;
}
