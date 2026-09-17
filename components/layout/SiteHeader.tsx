import Image from "next/image";

import { MobileNavigation } from "@/components/interactive/MobileNavigation";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { getMessages } from "@/lib/messages";
import {
  resolveSectionHref,
  type SectionHrefPrefix,
} from "@/lib/navigation";

const DISCORD_URL = "https://discord.gg/h9FFgKdkRd";

type SiteHeaderProps = {
  sectionHrefPrefix?: SectionHrefPrefix;
};

export function SiteHeader({ sectionHrefPrefix = "" }: SiteHeaderProps) {
  const messages = getMessages();
  const navigationLinks = messages.navigation.links.map((link) => ({
    ...link,
    href: resolveSectionHref(link.href, sectionHrefPrefix),
  }));

  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        {/* A native link avoids shipping router code for a static landing page. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          className="brand-link"
          href="/"
          aria-label={messages.site.brandHomeLabel}
        >
          <Image
            src="/brand/logo-dark.svg"
            width={1108}
            height={164}
            alt={messages.site.logoAlt}
            preload
            unoptimized
          />
        </a>

        <nav
          className="desktop-navigation"
          aria-label={messages.navigation.ariaLabel}
        >
          <ul>
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="header-discord" href={DISCORD_URL}>
          {messages.navigation.discord}
          <ArrowIcon />
        </a>

        <MobileNavigation
          ariaLabel={messages.navigation.mobileAriaLabel}
          openLabel={messages.navigation.openMenu}
          closeLabel={messages.navigation.closeMenu}
          links={navigationLinks}
          discordLabel={messages.navigation.discord}
          discordUrl={DISCORD_URL}
        />
      </div>
    </header>
  );
}
