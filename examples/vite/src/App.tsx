import { useState } from "react";
import { Toastra, toast, type ToastAnimation, type ToastPosition, type ToastTheme } from "toastra";

const POSITIONS: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

export function App() {
  const [position, setPosition] = useState<ToastPosition>("top-right");
  const [theme, setTheme] = useState<ToastTheme>("system");
  const [duration, setDuration] = useState(4000);
  const [maxToasts, setMaxToasts] = useState(5);
  const [animation, setAnimation] = useState<ToastAnimation>("slide");

  return (
    <div className="page">
      <Toastra
        position={position}
        theme={theme}
        duration={duration}
        maxToasts={maxToasts}
        animation={animation}
        showProgress
        richColors
      />

      <header>
        <p className="eyebrow">React · TypeScript · Next.js</p>
        <h1>Toastra</h1>
        <p className="tagline">Beautiful notifications for React.</p>
      </header>

      <div className="actions">
        <button type="button" onClick={() => toast.success({ title: "Saved!", description: "Your changes have been saved." })}>
          Success
        </button>
        <button type="button" onClick={() => toast.error("Something went wrong")}>
          Error
        </button>
        <button type="button" onClick={() => toast.warning("Please check your information")}>
          Warning
        </button>
        <button type="button" onClick={() => toast.info("New update available")}>
          Info
        </button>
        <button type="button" onClick={() => toast.loading("Uploading...")}>
          Loading
        </button>
        <button
          type="button"
          onClick={() =>
            void toast.promise(fakeSave(), {
              loading: "Saving...",
              success: "Saved successfully!",
              error: "Could not save data.",
            })
          }
        >
          Promise
        </button>
        <button
          type="button"
          onClick={() =>
            toast.custom({
              title: <strong>New Employee</strong>,
              description: <span>Mohammad has joined the team.</span>,
            })
          }
        >
          Custom
        </button>
        <button
          type="button"
          onClick={() =>
            toast({
              type: "info",
              title: "New message",
              description: "You have received a new message.",
              action: { label: "View", onClick: () => toast.success("Opened") },
              cancel: { label: "Later", onClick: () => {} },
            })
          }
        >
          Action
        </button>
      </div>

      <section className="controls">
        <label>
          Position
          <select value={position} onChange={(event) => setPosition(event.target.value as ToastPosition)}>
            {POSITIONS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label>
          Theme
          <select value={theme} onChange={(event) => setTheme(event.target.value as ToastTheme)}>
            <option value="system">system</option>
            <option value="light">light</option>
            <option value="dark">dark</option>
          </select>
        </label>
        <label>
          Duration
          <select value={duration} onChange={(event) => setDuration(Number(event.target.value))}>
            <option value={2500}>2500</option>
            <option value={4000}>4000</option>
            <option value={7000}>7000</option>
          </select>
        </label>
        <label>
          Max toasts
          <select value={maxToasts} onChange={(event) => setMaxToasts(Number(event.target.value))}>
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={8}>8</option>
          </select>
        </label>
        <label>
          Animation
          <select value={animation} onChange={(event) => setAnimation(event.target.value as ToastAnimation)}>
            <option value="slide">slide</option>
            <option value="fade">fade</option>
            <option value="scale">scale</option>
          </select>
        </label>
      </section>
    </div>
  );
}

function fakeSave(): Promise<{ ok: true }> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (Math.random() > 0.15) resolve({ ok: true });
      else reject(new Error("network"));
    }, 900);
  });
}
