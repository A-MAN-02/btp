# Bharyat Talent Partners — Website

React + Vite site. Plain CSS (no Tailwind) — variables and BEM-style
classes live in `src/index.css`.

## Structure
```
src/
├── assets/          logo, images
├── components/       one file per component (Header.jsx, ...)
├── pages/            one file per route (Home.jsx, About.jsx, ...)
├── data.js           long-form content (home page copy, stats, etc.)
├── index.css         all styles — variables + BEM classes
├── App.jsx           routes
└── main.jsx          entry point
```

## Run locally
```bash
npm install
npm run dev
```
