# Anqi Chen — Portfolio

A responsive, dependency-free portfolio for a software and cloud engineer. Built with HTML, CSS, and JavaScript, with a dark/amber theme, an optional light theme, expandable career entries, and a résumé download.

## Preview locally

```sh
python3 -m http.server 8080
```

Open http://localhost:8080. There is no build step or package installation.

## Free hosting with GitHub Pages

Target address: **https://onlyanqi.github.io/portfolio/**

1. Push the site to the `main` branch of `onlyanqi/portfolio`.
2. In the repository, open **Settings → Pages**.
3. Choose **Deploy from a branch**, then **main** and **/ (root)**. Save.
4. Wait for the Pages deployment to finish, then open the address above.

GitHub provides the `github.io` address and HTTPS for free for public repositories. No custom domain purchase is necessary. `.nojekyll` serves the static site directly. All local asset links are relative so they work under `/portfolio/`.

## Editing

- `index.html`: biography, work experience, explorations, skills, certifications, and contact links.
- `styles.css`: responsive layout and theme tokens.
- `script.js`: theme preference, mobile navigation, section highlighting, footer year.
- `files/resume.pdf`: existing résumé. Replace this file to update the download.
- `favicon.svg`: browser icon.

Career descriptions and metrics are drawn from the existing résumé. Creative projects retain their original experiment/concept/idea status; they are not presented as shipped products. Certification entries describe earned credentials, not independently verified current validity.

## Validation

Run `python3 scripts/check_site.py` to validate local assets, anchor targets, document structure, and deployment paths. CI runs these checks and JavaScript syntax validation on pushes and pull requests.

The design takes inspiration from the typographic hierarchy, warm accent color, and professional structure of https://swetanksubham.com/, with original code, illustration, and layouts.
