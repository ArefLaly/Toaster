import { useState } from "react";
import { Toastra, toast, type ToastMotion, type ToastPosition, type ToastTheme } from "toastra";

const MOTIONS: ToastMotion[] = [
  "pop",
  "bounce",
  "slide",
  "slide-x",
  "fade",
  "scale",
  "flip",
  "blur",
  "rise",
  "zoom",
];

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
  const [enter, setEnter] = useState<ToastMotion>("pop");
  const [exit, setExit] = useState<ToastMotion>("blur");

  return (
    <div className="page">
      <Toastra
        position={position}
        theme={theme}
        duration={duration}
        maxToasts={maxToasts}
        animation={{ enter, exit }}
        showProgress
        richColors
      />

      <header>
        <p className="eyebrow">React · TypeScript · Next.js</p>
        <h1>Toastra</h1>
        <p className="tagline">Beautiful notifications for React.</p>
      </header>

      <div className="actions">
        <button type="button" onClick={() => toast.success({ title: "Changes saved", description: "Your employee record is up to date." })}>
          Success
        </button>
        <button type="button" onClick={() => toast.error({ title: "Could not save", description: "Check the form and try again." })}>
          Error
        </button>
        <button type="button" onClick={() => toast.warning({ title: "Missing fields", description: "Email and department are required." })}>
          Warning
        </button>
        <button type="button" onClick={() => toast.info({ title: "Update available", description: "Version 2.0 is ready to install." })}>
          Info
        </button>
        <button type="button" onClick={() => toast.loading({ title: "Uploading file…", description: "This stays until you update it." })}>
          Loading
        </button>
        <button
          type="button"
          onClick={() =>
            void toast.promise(fakeSave(), {
              loading: { title: "Saving employee…", description: "Please wait a moment." },
              success: { title: "Employee created", description: "Ada Lovelace was added." },
              error: { title: "Save failed", description: "The request did not complete." },
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
              title: "New version available",
              description: "Version 2.0 is ready. You can keep working until you update.",
              action: { label: "Update now", onClick: () => toast.success("Updated to 2.0") },
              cancel: { label: "Later", onClick: () => {} },
            })
          }
        >
          Action
        </button>
        <button
          type="button"
          onClick={() =>
            toast({
              type: "success",
              title: "Employee deleted",
              description: "You can bring this record back.",
              action: { label: "Undo", onClick: () => toast.success("Employee restored") },
            })
          }
        >
          Undo
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
          Enter
          <select value={enter} onChange={(event) => setEnter(event.target.value as ToastMotion)}>
            {MOTIONS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label>
          Exit
          <select value={exit} onChange={(event) => setExit(event.target.value as ToastMotion)}>
            {MOTIONS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
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
