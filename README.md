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
components/sections/ Landing sections and progressive reveal boundaries
components/interactive/
                     Hero audience controls, mobile navigation, newsletter demo
components/ui/       Small shared presentation primitives
content/             Stable testimonial and news identifiers/metadata
lib/                 Typed messages, URL validation, metadata
messages/es.json     All visible Spanish interface and editorial copy
public/brand/        Unmodified production copies of official SVG assets
public/social/       Locally generated social image
```

Eleven components currently opt into client JavaScript, for two bounded reasons:

- `AudienceRadialMenu`, `MobileNavigation`, and `NewsletterDemoForm` manage explicit interaction state and focus.
- `PositioningSection`, `HowItWorksSection`, `TalentSection`, `CompaniesSection`, `TournamentsSection`, `NetworkingSection`, `TestimonialsSection`, and `NewsSection` use `IntersectionObserver` for progressive reveals and disable that behavior when reduced motion is requested.

The routes are statically prerendered, and the core copy remains present without waiting for an observer animation. Navigation destinations, metadata, JSON-LD, sitemap, and robots output are generated at build time. The skip-link targets remain server-rendered and use native fragment navigation with focusable `main` landmarks; no extra client boundary is required.

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

The implementation includes semantic landmarks, one H1, ordered headings, focus-correct skip links, visible focus, keyboard-operable audience disclosures, Escape handling for mobile navigation, associated field help/errors, focused status feedback after the newsletter demonstration, minimum control sizing, and reduced-motion handling.

SEO uses the Next.js Metadata API, canonical metadata, Open Graph, Twitter Card, Organization JSON-LD, sitemap, and robots output. The social image is 1200 × 630. The legal route is marked `noindex`, remains linked from the footer, and is excluded from the sitemap until official data is supplied.

On September 17, 2026, the local production build passed lint, TypeScript, the no-JavaScript newsletter invariant, and targeted Chromium checks. The browser checks covered skip-link and newsletter focus, visible testimonial photo placeholders, visible newsletter benefit text, reduced motion, zero horizontal overflow at 1440, 768, and 390 CSS pixels, and zero console errors. A local Lighthouse 13.4.1 mobile run scored **99 Performance, 100 Accessibility, and 100 SEO**, with 0.8 s FCP, 2.2 s LCP, 10 ms TBT, and 0 CLS.

These are local build results, not deployed-site evidence. Screen-reader checks, 200% zoom/reflow, browser coverage beyond Chromium, physical-device testing, and a Lighthouse capture of the deployed production URL remain publication QA.

### Local validation snapshot

| Command or check | Observed result |
|---|---|
| `pnpm lint` | Passed with zero warnings. |
| `pnpm typecheck` | Passed without emitted files. |
| `git diff --check` | Passed with no whitespace errors. |
| `SITE_URL=https://example.com pnpm build` | Passed; `/`, `/aviso-legal`, `/robots.txt`, and `/sitemap.xml` were statically generated. |
| `pnpm check:newsletter-nojs` | Passed; no native form action or serializable email field. |
| Targeted Chromium runtime checks | Passed for the documented focus, copy, privacy, responsive overflow, reduced-motion, and console-error scenarios. |
| Lighthouse 13.4.1 mobile, local production server | 99 Performance, 100 Accessibility, 100 SEO. |

## JavaScript budget evidence

The current built home page references **183.5 KiB gzip** across eight unique initial JavaScript files. This was measured locally after the final readiness changes by extracting unique initial script URLs from `.next/server/app/index.html` and compressing each referenced file once with gzip level 9 (`187,914` total bytes).

This exceeds the V1 engineering target of 100 KB and remains an honest optimization limitation, not a passed budget. It is a reproducible local artifact estimate, **not** a claim about deployment transfer size; hosting compression, caching, and the published URL must be measured separately.

## Asset and source register

| Production asset | Source | Owner/source status | Transformations | Use |
|---|---|---|---|---|
| `public/brand/logo-dark.svg` | `docs/identity/v1Positivo.svg` | Official TechToJob asset supplied with the brief | Exact copy; normalized filename only | Header on light surfaces |
| `public/brand/logo-mint.svg` | `docs/identity/v1Negativo.svg` | Official TechToJob asset supplied with the brief | Exact copy; normalized filename only | Footer on dark surfaces |
| `public/brand/symbol-dark.svg` | `docs/identity/SímboloPositivo.svg` | Official TechToJob asset supplied with the brief | Exact copy; normalized filename only | Favicon and compositions |
| `public/brand/symbol-mint.svg` | `docs/identity/SímboloNegativo.svg` | Official TechToJob asset supplied with the brief | Exact copy; normalized filename only | Dark-surface compositions |
| `public/brand/symbol-black.svg` | `docs/identity/SímboloBlack .svg` | Official TechToJob asset supplied with the brief | Exact copy; normalized filename only | Subtle hero ambient layer |
| `public/brand/symbol-gradient.svg` | `docs/identity/SímboloDegradado.svg` | Official TechToJob asset supplied with the brief | Exact copy; normalized filename only | Focal hero ambient layer |
| `public/social/techtojob-social.png` | Local composition generated from `messages/es.json` and `symbol-mint.svg` | Project-owned composition using the official identity | Rasterized locally to 1200 × 630 | Open Graph and Twitter Card |
| Sora | Google Fonts via `next/font/google` | Sora Project Authors; SIL Open Font License 1.1 | Self-hosted by Next.js at build time | Site typography |

No stock photography or third-party icon package is included. The interface uses CSS/vector compositions and small project-authored SVG marks. Photography remains a pre-publication follow-up: any future image must record its author, original URL, terms URL, access date, and transformations before entering the repository.

The twelve source SVGs under `docs/identity/` remain unchanged. Production copies preserve their original internal colors, including `#303436` in the positive variants.

## Publication handoff

The local repository is ready for the owner-controlled publication sequence. The intended repository URL is <https://github.com/DH-Multimedios/techtojob>; it is intentionally private until after the push.

The following are final publication actions and are not represented as completed local evidence:

- push the reviewed commit history, then make the repository public;
- confirm the production origin, set the production `SITE_URL`, and record the deployed URL;
- capture the deployed desktop and mobile views;
- run mobile Lighthouse against the deployed URL and preserve its screenshot;
- complete physical-device, screen-reader, zoom/reflow, metadata, and outbound-link QA on the published site.

Real content inputs also remain explicit: official legal-holder data for `/aviso-legal`, authorized and verifiable testimonials, and approved final news dates/destinations. The four provisional testimonial cards reserve truthful photo and profile spaces without presenting invented people or portraits. Any future photography must be licensed and added to the source register before use.

## AI-use declaration

AI-assisted tooling was used to help interpret the supplied brief and plan, draft implementation code, organize documentation, and support verification. The implementation does not use AI-generated people, testimonials, companies, metrics, legal facts, or validation results. A human participant remains responsible for reviewing, understanding, testing, defending, and approving the final submission.
