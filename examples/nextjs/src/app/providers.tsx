"use client";

import type { ReactNode } from "react";
import { Toastra } from "toastra";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toastra theme="system" position="top-right" showProgress />
    </>
  );
}
