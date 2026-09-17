# TechToJob V1 landing

TechToJob V1 is a mobile-first, server-rendered landing page that presents TechToJob as a community rather than a job board. Its primary conversion is the official Discord; the newsletter is an explicit local-only demonstration.

## Quick start

Requirements: Node.js 20.9 or newer and pnpm 11.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:3000`. Local development can run without `SITE_URL`; in that case the application uses `http://localhost:3000` only as a development fallback and blocks local crawling.

## Commands

| Command | Purpose |
|---|---|
| `pnpm dev` | Start the local development server. |
| `pnpm lint` | Run ESLint with zero warnings allowed. |
| `pnpm typecheck` | Run TypeScript without emitting files. |
| `pnpm check:newsletter-nojs` | Check the built home page for an inert no-JavaScript newsletter boundary. Run after `pnpm build`. |
| `SITE_URL=https://example.com pnpm build` | Create a production build with a validated canonical origin. |
| `pnpm start` | Serve an existing production build. |
| `python scripts/generate-social-image.py` | Regenerate the 1200 × 630 social image from centralized Spanish messages and the official symbol. Requires `rsvg-convert`. |

## Architecture

The application uses Next.js App Router, TypeScript, Tailwind CSS v4, and React Server Components by default.

```text
app/                 Routes, global styles, metadata routes
components/layout/   Header and footer
components/sections/ Server-rendered landing sections
components/interactive/
                     Hero tabs, mobile navigation, newsletter demo
components/ui/       Small shared presentation primitives
content/             Stable testimonial and news identifiers/metadata
lib/                 Typed messages, URL validation, metadata
messages/es.json     All visible Spanish interface and editorial copy
public/brand/        Unmodified production copies of official SVG assets
public/social/       Locally generated social image
```

Only three components opt into client JavaScript:

- `HeroTabs` implements the accessible tab pattern and keeps both panels in server-rendered HTML.
- `MobileNavigation` manages disclosure, Escape handling, and focus.
- `NewsletterDemoForm` validates and reports state locally.

All content sections, navigation destinations, metadata, JSON-LD, sitemap, and robots output are generated on the server or statically.

## Content model

`messages/es.json` is organized by product domain rather than component. `lib/messages.ts` exposes its inferred TypeScript shape. Testimonial records keep optional verified profile URLs, and news records keep machine-readable sample dates in `content/`; all visible labels and editorial copy remain in the message catalog.

V1 intentionally has no language selector or inactive English route. A future locale can add another message catalog and real locale routes without moving copy out of the content layer.

## Environment configuration

`SITE_URL` is the single source for:

- `metadataBase` and canonical links;
- Open Graph and Twitter URLs;
- Organization JSON-LD;
- `sitemap.xml` and `robots.txt`.

Production builds fail with a clear error when `SITE_URL` is missing, malformed, non-HTTPS, includes credentials, or includes a path/query/hash. Use only the confirmed production origin. Preview deployment URLs must not be promoted to canonical URLs.

`.env.example` contains the illustrative, reserved domain `https://techtojob.example`; it is not an asserted production domain.

## Privacy behavior

This V1 has no analytics, trackers, pixels, cookies, embedded social widgets, backend, or user accounts. The newsletter demonstration:

- renders no native form or action, so its button is inert without JavaScript;
- makes no network request;
- uses no local or session storage;
- sets no cookie;
- logs no submitted value;
- clears its in-memory value on reset.

Discord and social links are explicit outbound navigation to third-party services.

## Accessibility and SEO

The implementation includes semantic landmarks, one H1, ordered headings, a skip link, visible focus, keyboard-operable tabs, Escape handling for mobile navigation, associated form help/errors, an `aria-live` success state, minimum control sizing, and reduced-motion handling.

SEO uses the Next.js Metadata API, canonical metadata, Open Graph, Twitter Card, Organization JSON-LD, sitemap, and robots output. The social image is 1200 × 630. The legal route is marked `noindex`, remains linked from the footer, and is excluded from the sitemap until official data is supplied.

These are implementation features, not measured scores. Lighthouse, screen-reader checks, browser checks, 200% zoom/reflow, and physical-device testing must be performed and recorded before publication.

## JavaScript budget evidence

The current production home page references approximately **175.6 KiB gzip** of initial JavaScript when each unique linked script is compressed locally with gzip level 9. This exceeds the V1 engineering target of 100 KB and is therefore an open review optimization target, not a passed budget.

The linked JavaScript is primarily Next.js, React, router/runtime, and framework polyfill code. Restoring the brief-required `next/image` behavior for official SVGs increased the same local estimate from the previously recorded 169.9 KiB to 175.6 KiB. A local production mobile Lighthouse run after that change scored 99 for Performance, 100 for Accessibility, and 100 for SEO, with 2.1 s LCP, 0 layout shift, and 0 ms total blocking time. Transfer size can vary with server compression, so deployment tooling and Lighthouse must measure the published site before delivery.

## Asset and source register

| Production asset | Source | Owner/source status | Transformations | Use |
|---|---|---|---|---|
| `public/brand/logo-dark.svg` | `docs/identity/v1Positivo.svg` | Official TechToJob asset supplied with the brief | Exact copy; normalized filename only | Header on light surfaces |
| `public/brand/logo-mint.svg` | `docs/identity/v1Negativo.svg` | Official TechToJob asset supplied with the brief | Exact copy; normalized filename only | Footer on dark surfaces |
| `public/brand/symbol-dark.svg` | `docs/identity/SímboloPositivo.svg` | Official TechToJob asset supplied with the brief | Exact copy; normalized filename only | Favicon and compositions |
| `public/brand/symbol-mint.svg` | `docs/identity/SímboloNegativo.svg` | Official TechToJob asset supplied with the brief | Exact copy; normalized filename only | Dark-surface compositions |
| `public/social/techtojob-social.png` | Local composition generated from `messages/es.json` and `symbol-mint.svg` | Project-owned composition using the official identity | Rasterized locally to 1200 × 630 | Open Graph and Twitter Card |
| Sora | Google Fonts via `next/font/google` | Sora Project Authors; SIL Open Font License 1.1 | Self-hosted by Next.js at build time | Site typography |

No stock photography or third-party icon package is included. The interface uses CSS/vector compositions and small project-authored SVG marks. Photography remains a pre-publication follow-up: any future image must record its author, original URL, terms URL, access date, and transformations before entering the repository.

The twelve source SVGs under `docs/identity/` remain unchanged. Production copies preserve their original internal colors, including `#303436` in the positive variants.

## Pending publication inputs

The implementation is review-ready, but publication is blocked or constrained by real missing inputs:

- confirm the production domain and configure `SITE_URL`;
- provide and review official legal-holder data for `/aviso-legal`;
- replace provisional testimonial cards with authorized, verifiable testimonials;
- approve or replace sample news entries with real dates and destinations;
- select and document photography if the final art direction requires it;
- verify official outbound links during publication QA;
- run and preserve responsive, keyboard, screen-reader, no-JS, browser, physical-device, metadata, link, and Lighthouse evidence.

## AI-use declaration

AI-assisted tooling was used to help interpret the supplied brief and plan, draft implementation code, organize documentation, and support verification. The implementation does not use AI-generated people, testimonials, companies, metrics, legal facts, or validation results. A human participant remains responsible for reviewing, understanding, testing, defending, and approving the final submission.
