export type SectionHrefPrefix = "" | "/";

export function resolveSectionHref(
  href: string,
  prefix: SectionHrefPrefix,
): string {
  return href.startsWith("#") ? `${prefix}${href}` : href;
}
