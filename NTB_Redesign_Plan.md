# NTB.gov.np Style Redesign Detailed Plan

## Information Gathered
- **Current**: Dark glassmorphism, custom cursor, GSAP heavy animations
- **Target**: Clean gov site - light (#f8f9fa bg), blue nav (#005ea2), simple cards, no heavy anims
- **Files**: css/style.css (full rewrite), index.html (add hero bg, footer), js/script.js (disable cursor/GSAP, keep forms)
- **new.html** reference: Light header, hero slider, grid cards, reveal anims (adapt)

## Detailed Code Update Plan

### 1. css/style.css (Full replace with light gov theme)
- **Reset/Base**: Light bg #f8f9fa, #333 text, Inter font
- **Nav**: Fixed white bg, #005ea2 logo/links, shadow
- **Hero**: Full height banner bg image, overlay text, #11998e CTA
- **Sections**: White cards w/ shadow, grid layouts
- **Forms**: Clean borders, #007cba focus, simple submit #11998e
- **Responsive**: Mobile nav hamburger, stack grids
- **Remove**: Cursor, glassmorphism, dark gradients

### 2. index.html (Structure updates)
- Add hero banner image (Unsplash gov/professional)
- Services grid section with cards
- Footer with links/email
- Keep project/contact forms

### 3. js/script.js (Simplify)
- Disable initCursor()
- Replace GSAP with vanilla IntersectionObserver for subtle fade-up
- Keep EmailJS forms, file preview, smooth scroll

## Dependent Files: css/style.css, index.html, js/script.js

## Followup
- Test forms EmailJS
- Responsive check
- Local server test
- Update TODO.md complete
