import { ClientDemo } from "./client-demo";

export default function Page() {
  return (
    <main style={{ padding: "4rem 1.5rem", fontFamily: "sans-serif" }}>
      <p>This heading is a server component.</p>
      <h1>Toastra + Next.js</h1>
      <ClientDemo />
    </main>
  );
}
