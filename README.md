# Henry Hu's blog

Live site: https://ninedter.github.io

A custom, responsive Jekyll blog hosted on GitHub Pages. No tracking scripts, external fonts, or CMS subscription. Includes article search, RSS, sitemap, canonical metadata, and an accessible mobile layout.

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

The Medium inventory contains 13 published posts. One article is imported; `/archive/` links to the remaining 12 originals while full import is pending. See `migration/inventory.json` and `migration/README.md` for completion tracking. The local-AI article remains unpublished and is not included in this repository.
