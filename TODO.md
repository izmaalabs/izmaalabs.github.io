# TODO — IZMAA Labs site

Branch: `feat/premium-studio-site` (changes currently uncommitted).
Canonical site: `https://izmaalabs.github.io/`.

## High priority — before public launch

- [ ] **P0 — Commit and push current work.** Stale-positioning cleanup, pricing/contact split, sitemap updates and page rewrites are still uncommitted.
- [ ] **P0 — Fix broken ChemPrep install links** in `chemprep/index.html`:
  - `https://raw.githubusercontent.com/izmaalabs/chemprep-releases/main/scripts/install.sh`
  - `https://raw.githubusercontent.com/izmaalabs/chemprep-releases/main/scripts/install.ps1`
  - Both return 404. `chemprep-releases` default branch is `gh-pages`, contains only `.nojekyll` and `index.html`, and the Releases API returns `[]`. Either publish real installers/releases or remove/replace the commands.
- [ ] **P0 — Fix TraderPulse `Source` links** (3 occurrences in `traderpulse/index.html`) pointing to `https://github.com/izmaalabs/traderpulse`, which returns 404. Create the repo or replace the links.
- [ ] **P1 — Decide old `/pricing-contact/` URL behavior.** The directory is deleted; old bookmarks now 404. Add a meta-refresh stub only if redirect value outweighs keeping the path out of the sitemap.
- [ ] **P1 — Re-audit all external links** (GitHub repos/releases, social profiles, installers). The two items above are the known breakages; confirm the rest before launch.
- [ ] **P1 — Add a custom `404.html`** for the GitHub Pages build.

## Current static site — polish and accessibility

- [ ] Collapsed FAQ answers remain in the accessibility tree despite `aria-expanded="false"`. Apply `hidden`/`inert` toggling and keep `aria-expanded` in sync.
- [ ] Footer links measure ~18px tall with ~6px gaps. Increase hit targets/spacing (aim for ≥44px targets).
- [ ] Small labels at 10–11.5px are too small. Raise body-adjacent labels to ≥12–14px.
- [ ] Harden `.reveal { opacity: 0 }` so content remains visible if JS fails or reduced motion is enabled; gate hiding behind `.js` and respect `prefers-reduced-motion`.
- [ ] Optimize large PNGs in `assets/` (`DashboardPage.png`, `TaxonomyPage.png`, `izmaalabs-wordmark.png`, etc.) and add `loading="lazy"` / `decoding="async"` where appropriate while retaining width/height attributes.
- [ ] Prune ~171 unused legacy selectors in `styles.css`.
- [ ] Re-run full browser audit at 360/390/768/1024/1440 px after fixes: axe, horizontal overflow, theme persistence, mobile menu, FAQ, scrollspy, reduced motion, Web Vitals. Browser binary is currently unavailable; no browser was downloaded per prior instruction.

## Pricing, accounts and checkout — planned content updates

- [ ] Publish final ChemPrep prices, license terms and activation instructions on `/pricing/` and `/chemprep/`.
- [ ] Publish payment method, invoice and tax details once checkout is decided.
- [ ] Update refund/cancellation terms after checkout is live; current policy only describes the static site.
- [ ] Update privacy policy and terms with real account/checkout data handling before launch.
- [ ] Replace future-tense account/licensing copy with actual behavior when accounts launch.
- [ ] **GST:** confirm treatment with an accountant; implement calculation and invoicing at checkout, but do not collect it as tax until registration is in place.

## Platform migration — planned

- [ ] Move to **Next.js App Router + TypeScript + Tailwind 4**.
- [ ] Keep marketing pages static/ISR; use server routes for auth and payments.
- [ ] Keep content in **MDX/Markdown in the repo**; developer writes content, so no hosted CMS is needed yet.
- [ ] Add **Auth.js or Clerk** plus a small database for customer records and one-time PASS license keys.
- [ ] Use **Stripe Checkout** for the one-time PASS, webhooks to issue the license, and Customer Portal for invoices.
- [ ] Host on **Vercel** initially; consider Cloudflare Workers via OpenNext later.
- [ ] Make canonical/OG/sitemap URLs environment-driven; switch to `izmaalabs.com` only when registered and live.
- [ ] Preserve the instrument-grade editorial identity; avoid generic gradient SaaS styling.

## Deferred / out of scope

- [ ] Scrub stale "no account / no cloud / no telemetry / offline-first / local-first" language from sibling repos (`../chemprep`, `../traderpulse`, `../console`) if requested.
- [ ] Publish real ChemPrep release artifacts and installer scripts in `chemprep-releases`.
- [ ] Create and publish the `izmaalabs/traderpulse` repository, or permanently remove its Source links.
- [ ] Register `izmaalabs.com`, configure DNS, then update canonicals, sitemap and social cards.
- [ ] Add a hosted CMS only if a non-technical editor joins the project.
- [ ] Reinstall/enable a local Chrome or Brave binary for future browser revalidation.

## Completed this session — context

- [x] Removed stale positioning from all public pages in `site/`.
- [x] Changed FAQ entries from internet/telemetry questions to licensing questions, including JSON-LD and IDs.
- [x] Split the merged `pricing-contact` page into `/pricing/` and `/contact/`, updating all links and the sitemap.
- [x] Removed `izmaalabs.com` registration-status wording from public surfaces.
- [x] Validated internal links, FAQ anchors, `aria-controls` targets and JSON-LD parsing.
