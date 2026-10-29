# Henry Hu's blog

Live site: https://ninedter.github.io

A custom, responsive Jekyll blog hosted on GitHub Pages. Optional, consent-based Google Analytics 4; no external fonts or CMS subscription. Includes article search, RSS, sitemap, canonical metadata, and an accessible mobile layout.

## Publish a post

1. Copy `templates/post.md` to `_posts/YYYY-MM-DD-descriptive-slug.md`.
2. Set the title, date, description, and tags. Use the original date for imported articles.
3. Write in Markdown. Store images under `assets/images/<slug>/` and include credit/source captions.
4. Commit to `main`. GitHub Pages rebuilds automatically.
5. Check Actions and the live article after deployment.

For a private draft, keep it outside this PUBLIC repository. For an unpublished but public draft use `_drafts/`; it is excluded from the site but visible in the repository. Do not commit personal exports, credentials, or private Medium drafts.

## Local preview

Install Ruby/Bundler, then run:
```sh
bundle install
bundle exec jekyll serve
```
Open http://localhost:4000. To preview public repository drafts, add `--drafts`.

## Medium migration

Import only published articles by default. Preserve original dates and article bodies; store the original URL in `original_url`. Keep an inventory with one row per source story and its target URL, and verify titles, dates, images, captions, references, and internal links before declaring the migration complete. Do not copy private account exports into this repository.

The existing Medium publications remain intact. Set a Medium canonical URL only after the migrated GitHub article is verified and the author requests that change.

## Site settings

GitHub Settings → Pages → Deploy from a branch → main → /(root).
HTTPS is required on github.io. Update `_config.yml` if a custom domain is introduced.

Article prose © Henry Hu. Third-party figures remain owned by their respective publishers; source attribution is retained.

## Current state

All 13 published Medium articles are imported. `/archive/` links to their local copies. Images are hosted in `assets/images/medium/`. See `migration/inventory.json` for original-to-GitHub URL mappings and `migration/verification.json` for body and image checks. The new local-AI article is published at `/2026/10/29/local-ai-equal-protection/`, with AITBM analysis, source references, and attributed graphics.

## Google Analytics

Property: **Henry Hu Blog** (`561533474`). Web stream: `16232013708`.
Public measurement ID: `G-PMB8PT59QS`, configured in `_config.yml`.
[Open reports](https://analytics.google.com/analytics/web/#/a398973666p561533474/reports/intelligenthome).

The production-only include loads analytics on ninedter.github.io after a reader opts in. Local previews do not collect visits. All pages and future posts inherit the include. Readers can revise their choice at `/privacy/`. Ads and Google signals are disabled; automatic search/form collection is disabled in the web stream. Reports therefore cover consenting visitors only and may take 24–48 hours to populate. Use Realtime for an initial check.

If changing domains, update the hostname guard in `assets/js/analytics.js`, cookie domain, property stream URL, and `_config.yml`. Never add a Measurement Protocol API secret to this public repository.
