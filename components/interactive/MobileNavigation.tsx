"use client";

import { useEffect, useRef, useState } from "react";

type NavigationLink = {
  label: string;
  href: string;
};

type MobileNavigationProps = {
  ariaLabel: string;
  openLabel: string;
  closeLabel: string;
  links: NavigationLink[];
  discordLabel: string;
  discordUrl: string;
};

export function MobileNavigation({
  ariaLabel,
  openLabel,
  closeLabel,
  links,
  discordLabel,
  discordUrl,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    firstLinkRef.current?.focus();

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="mobile-navigation">
      <button
        ref={buttonRef}
        className="menu-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-panel"
        aria-label={isOpen ? closeLabel : openLabel}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span aria-hidden="true" className="menu-toggle__icon">
          <span />
          <span />
        </span>
      </button>

      <nav
        id="mobile-navigation-panel"
        className="mobile-navigation__panel"
        aria-label={ariaLabel}
        hidden={!isOpen}
      >
        <ul>
          {links.map((link, index) => (
            <li key={link.href}>
              <a
                ref={index === 0 ? firstLinkRef : undefined}
                href={link.href}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          className="button button--primary"
          href={discordUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
        >
          {discordLabel}
        </a>
      </nav>
    </div>
  );
}
