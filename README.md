# Arunendra Kumar Shukla — professional portfolio

A responsive, accessible static portfolio for `hrd-ai-arun`, built from his supplied professional resume. It includes recruiter focus tabs, six filterable project stories, a career timeline, regional experience, contact links and a concise recruiter CV.

## Hosting

Publish this repository as `hrd-ai-arun/hrd-ai-arun.github.io`. In **Settings → Pages**, choose **Deploy from a branch**, **main**, **/(root)** and save. The website will be available at `https://hrd-ai-arun.github.io/` after GitHub finishes deployment.

No packages, paid services, build step, account tokens or server are required. `.nojekyll` keeps GitHub Pages from processing the files as a Jekyll site.

## Files

- `index.html`: professional content and accessible page structure.
- `styles.css`: responsive design and reduced-motion support.
- `app.js`: portfolio interactions.
- `Arunendra-Kumar-Shukla-CV.pdf`: recruiter CV, derived from the supplied resume.

## Editing

Update career content in `index.html`, and corresponding recruiter focus, country and project details in `app.js`. Replace the CV PDF when the professional history changes.

Published content uses the supplied resume. The CV and site omit date of birth, marital status, passport number and signature. No unsupported performance percentages, AI project claims or job-availability claims are included. Email and phone are professional contact channels supplied in the resume.

To preview locally, use any static web server, for example `python -m http.server 4187`.

