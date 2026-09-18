import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { getMessages } from "@/lib/messages";

const messages = getMessages();

export const metadata: Metadata = {
  title: { absolute: messages.metadata.legalTitle },
  description: messages.metadata.legalDescription,
  alternates: {
    canonical: "/aviso-legal",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LegalNoticePage() {
  const { legal } = messages;

  return (
    <>
      <a className="skip-link" href="#legal-content">
        {messages.navigation.skipLink}
      </a>
      <SiteHeader sectionHrefPrefix="/" />
      <main id="legal-content" className="legal-page" tabIndex={-1}>
        <div className="shell legal-page__inner">
          <p className="eyebrow">{legal.eyebrow}</p>
          <h1>{legal.heading}</h1>
          <p className="legal-status">{legal.status}</p>
          <p className="legal-page__intro">{legal.intro}</p>

          <section aria-labelledby="missing-legal-data">
            <h2 id="missing-legal-data">{legal.missingHeading}</h2>
            <ul>
              {legal.missingItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="legal-privacy">
            <h2 id="legal-privacy">{legal.privacyHeading}</h2>
            <p>{legal.privacy}</p>
          </section>

          <p className="legal-publication-note">{legal.publication}</p>
          {/* A native link avoids shipping router code for a static landing page. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a className="text-link text-link--arrow" href="/">
            {legal.back}
            <ArrowIcon />
          </a>
        </div>
      </main>
      <SiteFooter sectionHrefPrefix="/" />
    </>
  );
}
