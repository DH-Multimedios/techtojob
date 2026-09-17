export type SectionHrefPrefix = "" | "/";

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function resolveSectionHref(
  href: string,
  prefix: SectionHrefPrefix,
): string {
  return href.startsWith("#") ? `${prefix}${href}` : href;
}
