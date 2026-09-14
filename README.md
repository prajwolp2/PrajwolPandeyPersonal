# Prajwol Pandey, Portfolio

Personal portfolio built with React and Framer Motion. Live at
[prajwolp2.github.io/PrajwolPandeyPersonal](https://prajwolp2.github.io/PrajwolPandeyPersonal/).

## Stack

- React 19 (Create React App)
- Framer Motion for scroll reveals, the intro, the mobile menu, accordions, and the lightbox
- Plain CSS with design tokens in `src/styles/global.css`
- Deployed to GitHub Pages with `gh-pages`

## Editing content

All copy, links, experience entries, projects, and skills live in one file:
`src/data/content.js`. Update that file and the sections re-render; no component changes needed.

- Profile photo: `src/images/profile.jpg`
- Project screenshots: `src/images/`
- Resume: `public/resume.pdf`

## Scripts

```bash
npm start       # dev server on http://localhost:3000
npm run build   # production build into build/
npm test        # run tests
npm run deploy  # build and publish build/ to the gh-pages branch
```
