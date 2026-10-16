# AFH Portfolio

Personal portfolio for Muhammad Afzal Fulvian Handoni, built with semantic HTML, custom CSS, and vanilla JavaScript.

## Structure

- `index.html` — main page and all portfolio content
- `assets/css/style.css` — visual system, layout, motion, and responsive styles
- `assets/js/script.js` — navigation, filters, accordion, reveal, and scroll interactions
- `assets/files/cv.pdf` — add the final CV at this path to enable downloads
- `assets/images/` — place the final portrait here and replace the hero placeholder

## Local preview

Open `index.html` through a local web server. In this workspace, the existing Vite preview server serves the static site.

## PHP hosting

The portfolio is currently static and does not require backend processing. It can be renamed to `index.php` without changes when deploying to a PHP host. If reusable PHP includes are added later, choose hosting with PHP 8+ support.

## Customization

1. Add the final CV as `assets/files/cv.pdf`.
2. Remove `aria-disabled="true"` from both `.cv-link` elements in `index.html`.
3. Replace the portrait placeholder markup with an optimized personal photo.
4. Add LinkedIn or GitHub links only after the real profile URLs are available.
