import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { store } from "../src/core/store";

afterEach(() => {
  store.reset();
});
