import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { siteUrl } from "@/lib/env";
import { createSiteMetadata } from "@/lib/metadata";
import { getMessages } from "@/lib/messages";

const sora = Sora({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = createSiteMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#2f3436",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const messages = getMessages();
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: messages.site.name,
    url: siteUrl.href,
    logo: new URL("/brand/logo-dark.svg", siteUrl).href,
    sameAs: messages.footer.socialLinks.map((link) => link.href),
  };

  return (
    <html lang="es" className={sora.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
