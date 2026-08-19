# Contributing

Thank you for helping make Toastra better.

## Setup

```bash
npm install
npm run typecheck
npm test
npm run build
```

## Scripts

- `npm test` — Vitest
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript
- `npm run build` — tsup ESM, CJS, and types
- `npm run storybook` — local showcase

## Guidelines

- Do not add runtime dependencies unless they are clearly necessary
- Do not use `any`
- Keep the public API small
- Add tests for new behavior
- Match the existing module layout under `src/`

## Pull requests

Open a PR against `main` with a short summary and a test plan. CI must pass before merge.
