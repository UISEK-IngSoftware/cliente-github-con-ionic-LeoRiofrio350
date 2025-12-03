Purpose
-------
This file gives immediate, repository-specific guidance to AI coding agents (and contributors) so they can be productive quickly. It documents the high‑level architecture, developer workflows, important commands, and project conventions discovered in the codebase.

Big picture
-----------
- This is an Ionic + React (Vite) mobile app scaffolded for a GitHub client. Core runtime: `vite` (dev), build output goes to `dist` (see `capacitor.config.ts`).
- UI layout: Ionic Tabs defined in `src/App.tsx` using `IonTabs` + `IonTabBar`. Pages are in `src/pages/*` (Tab1–Tab3).
- Routing: uses `react-router` v5 (see `src/App.tsx` — `Route exact path=...`). Do NOT assume react-router v6 APIs.
- Expected service layer: `src/services/` (mentioned in `readme.md`) — network calls and GitHub API integration should be placed here.

Important files to inspect
--------------------------
- `package.json` — scripts you can call: `dev`, `build`, `preview`, `test.e2e`, `test.unit`, `lint`.
- `readme.md` — lab instructions, environment variables, API endpoints and expected behavior.
- `capacitor.config.ts` — `webDir: 'dist'` (build output used by Capacitor native targets).
- `vite.config.ts` — test config (Vitest using `./src/setupTests.ts`).
- `src/App.tsx`, `src/main.tsx`, `src/pages/*`, `src/components/*`, `src/theme/variables.css` — canonical UI and layout patterns.

Developer workflows & commands
-----------------------------
- Start dev server (web):
  - Preferred (matches `package.json`): `npm run dev`  (starts Vite)
  - Ionic CLI alternative (if available globally): `ionic serve`
- Build for production: `npm run build` (runs `tsc && vite build`). Output is `dist/`.
- Preview production build locally: `npm run preview` (vite preview).
- Unit tests: `npm run test.unit` (Vitest). Vitest is configured in `vite.config.ts`.
- E2E tests: `npm run test.e2e` (runs Cypress tests in `cypress/`).
- Lint: `npm run lint` (eslint configuration at repo root).
- Capacitor + native platforms:
  - Add platform: `npx cap add android` (or `ionic capacitor add android` if using Ionic CLI)
  - Sync web changes to native: `npx cap sync` (or `ionic capacitor sync`)
  - Open native IDE: `npx cap open android` or `ionic capacitor open android`.

Project-specific conventions and patterns
--------------------------------------
- UI: Pages use Ionic structural components (`IonPage`, `IonHeader`, `IonContent`). Copy pattern from `src/pages/Tab1.tsx`.
- Routing: codebase relies on `react-router` v5 patterns (`<Route exact path=...>` and `Redirect`). Keep v5 API semantics.
- Services: `readme.md` refers to `src/services/` for API clients (Axios expected). When adding network clients, place them under `src/services` and export small functions (GET/POST/DELETE/PATCH) that return typed results.
- Environment variables: the project expects `VITE_GITHUB_TOKEN` (see `readme.md`) — use the `VITE_` prefix so Vite exposes them to the client.
- Capacitor: built web app is consumed by Capacitor (`webDir: 'dist'`), so ensure `npm run build` completes before `npx cap sync`.

Testing notes
-------------
- Unit tests: Vitest runs with `jsdom` and uses `src/setupTests.ts` for global setup.
- E2E: Cypress config lives under `cypress/` — look at `cypress/e2e/test.cy.ts` and `cypress/support/` for helpers.

Common pitfalls for agents
-------------------------
- Do not change routing to react-router v6 APIs — search for `react-router` and check `package.json` versions before upgrading.
- Avoid assuming Axios is already present (README mentions Axios, but it's not in `package.json` dependencies). If adding Axios, update `package.json` and the project maintainers should run `npm install`.
- Be conservative with global Ionic CLI assumptions. Prefer `npm`/`npx` scripts that exist in `package.json` for reproducible automation.

Examples (quick references)
---------------------------
- Start dev server: ``npm run dev``
- Build + prepare for Capacitor: ``npm run build`` then ``npx cap sync``
- Create a new API client: add `src/services/github.ts` exporting `getUser()` which calls `GET https://api.github.com/user` and reads `import.meta.env.VITE_GITHUB_TOKEN` for auth header.

When to ask for clarification
-----------------------------
- If a change will add or upgrade a major runtime (React, Router, Vite, Ionic), ask before modifying `package.json` or lockfiles.
- If you need to add native platform support (Android/iOS) confirm whether maintainers expect to manage native projects in this repo.

Next steps for you (maintainer)
-------------------------------
- Tell me whether you want this file committed now. If yes, I will add it and optionally create a small Git commit.
- If you have team conventions (PR labels, commit message format, CI steps) send them and I will add brief rules above.

End of file
