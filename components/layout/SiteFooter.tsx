import Image from "next/image";

import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { getMessages } from "@/lib/messages";
import {
  isExternalHref,
  resolveSectionHref,
  type SectionHrefPrefix,
} from "@/lib/navigation";

type SiteFooterProps = {
  sectionHrefPrefix?: SectionHrefPrefix;
};

export function SiteFooter({ sectionHrefPrefix = "" }: SiteFooterProps) {
  const messages = getMessages();
  const groups = Object.values(messages.footer.groups);

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            {/* A native link avoids shipping router code for a static landing page. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" aria-label={messages.site.brandHomeLabel}>
              <Image
                src="/brand/logo-mint.svg"
                width={1108}
                height={164}
                alt={messages.site.logoAlt}
                loading="lazy"
                unoptimized
              />
            </a>
            <p>{messages.footer.description}</p>
          </div>

          <nav
            className="footer-navigation"
            aria-label={messages.footer.navigationLabel}
          >
            {groups.map((group) => (
              <div key={group.title}>
                <h2>{group.title}</h2>
                <ul>
                  {group.links.map((link) => {
                    const href = resolveSectionHref(link.href, sectionHrefPrefix);
                    const isExternal = isExternalHref(href);

                    return (
                      <li key={link.href}>
                        <a
                          href={href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="site-footer__bottom">
          <nav aria-label={messages.footer.socialLabel}>
            <ul className="social-links">
              {messages.footer.socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                    <ArrowIcon />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p>{messages.footer.legalText}</p>
        </div>
      </div>
    </footer>
  );
}
