import type { Metadata } from "next";

import { siteUrl } from "@/lib/env";
import { getMessages } from "@/lib/messages";

export function createSiteMetadata(): Metadata {
  const messages = getMessages();
  const { title, titleTemplate, description, socialImageAlt } = messages.metadata;

  return {
    metadataBase: siteUrl,
    title: {
      default: title,
      template: titleTemplate,
    },
    description,
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: "/brand/symbol-dark.svg",
    },
    openGraph: {
      type: "website",
      locale: "es_ES",
      url: "/",
      siteName: messages.site.name,
      title,
      description,
      images: [
        {
          url: "/social/techtojob-social.png",
          width: 1200,
          height: 630,
          alt: socialImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/social/techtojob-social.png"],
    },
  };
}
