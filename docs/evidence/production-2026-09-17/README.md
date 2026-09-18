# Production evidence — September 17, 2026

The deployed TechToJob landing page passed its production audit with non-blocking caveats.

- **Audit timestamp (UTC):** `2026-09-18T00:37:12Z`
- **Live site:** <https://techtojob-xi.vercel.app/>
- **Public repository:** <https://github.com/DH-Multimedios/techtojob>
- **Result:** **PASS with non-blocking caveats**

## Captures

| Evidence | Audited viewport | PNG dimensions | SHA-256 |
|---|---:|---:|---|
| [Desktop production page](desktop.png) | 1440 × 1000 CSS px | 1440 × 10466 px | `bb31589775fdc9f2aa1fa74710f43d88332498ca0f761cc5a40d964e7cd37574` |
| [Mobile production page](mobile.png) | 390 × 844 CSS px | 390 × 15071 px | `b32ce6a5b649460c2a4342ca3bf3c5529fb3fdff63420f09b3c2cc0ddb0072b0` |
| [Lighthouse mobile summary](lighthouse-mobile.png) | 412 × 823 CSS px, DPR 1.75 | 1440 × 1200 px | `fd2e6fe11805d91243124d22c1b6e00bcdf2d65b0d6a349a61adf789fa4be167` |

Responsive behavior was also checked at **768 × 1024 CSS px**. The full-page desktop and mobile captures were produced after revealing all progressive sections. The sticky header was normalized only in the capture context to avoid stitching artifacts; the deployed application was not changed.

## Lighthouse 13.4.1 mobile

The deployed URL was audited once at `2026-09-18T00:33:58.079Z`; Lighthouse reported no run warnings.

| Category | Score |
|---|---:|
| Performance | **98** |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **100** |

| Metric | Exact value | Display value |
|---|---:|---:|
| First Contentful Paint | 962.9945 ms | 1.0 s |
| Largest Contentful Paint | 1954.9945 ms | 2.0 s |
| Speed Index | 3820.538450003461 ms | 3.8 s |
| Total Blocking Time | 42 ms | 40 ms |
| Cumulative Layout Shift | 0 | 0 |
| Time to Interactive | 1954.9945 ms | 2.0 s |
| Server response time | 58 ms | 60 ms |

## Production checks

The audit passed the following checks:

- HTTPS responses for the root and `/aviso-legal` routes;
- production-origin canonical, Open Graph, Twitter, JSON-LD, `robots.txt`, and `sitemap.xml` values;
- complete responsive rendering without horizontal overflow at 1440 × 1000, 768 × 1024, and 390 × 844 CSS px;
- keyboard and focus behavior for the skip link, mobile menu, audience disclosures, and newsletter states;
- a no-JavaScript newsletter boundary with no serializable email field, plus no requests, storage, cookies, or logs during the interactive demonstration;
- truthful testimonial reservations for pending photos, profiles, and authorized content;
- reduced-motion behavior;
- fresh isolated home and legal-page runs with no console errors or warnings, failed requests, or HTTP responses at or above 400.

## Honest limitations

- LinkedIn returned status 999 under automation protection. The audit reached the expected profile URL, so this is not evidence of a broken destination, but the destination content could not be inspected automatically.
- Two helper texts computed to approximately 11.5156 CSS px on tablet/mobile. Lighthouse Accessibility scored 100 and no standards blocker was proven; physical-device readability still requires human review.
- Repeated rapid audit navigation produced an unused-font-preload warning and one navigation-aborted lazy SVG request. A fresh isolated run had no warnings or failures, and the SVG subsequently returned 200/304.
- Automated checks do not replace physical-device, screen-reader, or 200% zoom/reflow testing.
- Official legal-holder data, authorized real testimonials, and approved final news remain external content inputs.

The raw Lighthouse JSON and HTML reports were retained only as temporary local audit artifacts. They are intentionally not repository evidence and are not committed here.
