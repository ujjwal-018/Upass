# Copilot Instructions for Password Manager (Next.js)

## Project Overview
- This is a Next.js app bootstrapped with `create-next-app`.
- Main entry point: `app/page.js` (edit to change homepage logic/UI).
- Global styles: `app/globals.css`.
- App-wide layout: `app/layout.js`.
- Static assets: `public/` (SVGs, icons).
- Configuration: `next.config.mjs`, `jsconfig.json`, `eslint.config.mjs`.

## Developer Workflows
- **Start dev server:**
  - `npm run dev` (or `yarn dev`, `pnpm dev`, `bun dev`)
  - App runs at [http://localhost:3000](http://localhost:3000)
- **Hot reload:** Editing files in `app/` auto-updates the browser.
- **Linting:** Uses ESLint config in `eslint.config.mjs`.
- **Font optimization:** Uses `next/font` for loading Geist font.

## Patterns & Conventions
- **Pages:** Each file in `app/` (e.g., `page.js`) is a route/page.
- **Layout:** Shared UI (header, footer, etc.) goes in `app/layout.js`.
- **Styling:** Use CSS modules (`*.module.css`) for scoped styles, or `globals.css` for global styles.
- **Assets:** Reference images/icons from `public/` using relative paths.
- **Config:** Use `next.config.mjs` for Next.js customizations.

## Integration Points
- No custom backend or API routes detected (add in `app/api/` if needed).
- No database or external service integration found in current files.
- Deployment: Designed for Vercel, but can run locally.

## Examples
- To add a new page: create `app/newpage.js` and visit `/newpage` in browser.
- To add a global style: edit `app/globals.css`.
- To add a favicon: replace `app/favicon.ico`.

## References
- See `README.md` for setup and deployment details.
- See Next.js docs for advanced features: https://nextjs.org/docs

---
**If any conventions or workflows are unclear, please ask for clarification or provide missing details.**
