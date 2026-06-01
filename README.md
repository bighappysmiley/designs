# BigHappySmiley Designs

The official website for **BigHappySmiley Designs** — a graphic design studio
offering logos, print, presentations, websites, and physical products.

A clean, professional, Apple-inspired single-page site built with **React + Vite**,
ready for one-click deployment on **Netlify**.

## Tech stack

- [React 18](https://react.dev/)
- [Vite 6](https://vitejs.dev/) (dev server + build)
- Plain CSS (design tokens in `:root`), no UI framework

## Project structure

| Path | Purpose |
|------|---------|
| `index.html` | Vite entry HTML |
| `src/main.jsx` | App bootstrap |
| `src/App.jsx` | Page sections (Nav, Hero, Services, Products, Reviews, Contact, Footer) |
| `src/styles.css` | Styling and responsive layout |
| `public/logo.svg` | Brand logo + favicon |
| `netlify.toml` | Netlify build + SPA redirect config |

## Local development

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
```

## Production build

```bash
npm run build    # outputs static site to dist/
npm run preview  # preview the built site locally
```

## Deploy to Netlify

This repo is preconfigured (`netlify.toml`) — Netlify auto-detects the build
command (`npm run build`) and publish directory (`dist`).

**Option A — Git-based (recommended, continuous deploy):**

1. Push this branch to GitHub (already done).
2. In the [Netlify dashboard](https://app.netlify.com/) → **Add new site → Import an existing project**.
3. Connect the `bighappysmiley/designs` repo and pick this branch.
4. Netlify reads `netlify.toml` — just click **Deploy**. Every push redeploys.

**Option B — Netlify CLI:**

```bash
npm install -g netlify-cli
netlify deploy --build            # draft/preview URL
netlify deploy --build --prod     # production
```

## Content sections

- **Hero** — brand intro and primary call to action
- **Services** — Logos & Icons, Posters & Flyers, Presentations, Wix Websites, Business Cards & Stickers
- **Products** — physical product offering
- **Reviews** — client testimonial
- **Contact** — designs@bighappysmiley.com · (845) 213-2071

## Editing

Service copy lives in the `SERVICES` array in `src/App.jsx`. Brand colors and
spacing are CSS custom properties at the top of `src/styles.css` (`:root`).
