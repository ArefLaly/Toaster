export function ToastProgress({
  duration,
  remaining,
  paused,
}: {
  duration: number;
  remaining: number;
  paused: boolean;
}) {
  if (!Number.isFinite(duration) || duration <= 0) return null;
  const ratio = Math.max(0, Math.min(1, remaining / duration));

  return (
    <div className="toastra__progress" aria-hidden="true">
      <div
        className="toastra__progress-bar"
        style={{
          transform: `scaleX(${ratio})`,
          transition: paused ? "none" : `transform 80ms linear`,
        }}
      />
    </div>
  );
}
