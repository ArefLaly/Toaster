import { TOASTRA_CSS } from "./css";

let injected = false;

export function ensureToastraStyles(): void {
  if (injected || typeof document === "undefined") return;
  if (document.getElementById("toastra-styles")) {
    injected = true;
    return;
  }
  const style = document.createElement("style");
  style.id = "toastra-styles";
  style.textContent = TOASTRA_CSS;
  document.head.appendChild(style);
  injected = true;
}
