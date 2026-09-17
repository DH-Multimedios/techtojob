import Image from "next/image";

import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { BrandCurve } from "@/components/ui/BrandCurve";
import { getMessages } from "@/lib/messages";

const DISCORD_URL = "https://discord.gg/h9FFgKdkRd";

export function ClosingSection() {
  const { closing } = getMessages();

  return (
    <section className="section closing-section" aria-labelledby="closing-heading">
      <BrandCurve className="closing-section__curve" />
      <Image
        className="closing-section__symbol"
        src="/brand/symbol-dark.svg"
        width={288}
        height={288}
        alt=""
        aria-hidden="true"
        loading="lazy"
        unoptimized
      />
      <div className="shell closing-section__inner">
        <p className="eyebrow">{closing.eyebrow}</p>
        <h2 id="closing-heading">{closing.heading}</h2>
        <p>{closing.description}</p>
        <a
          className="button button--dark button--large"
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {closing.cta}
          <ArrowIcon />
        </a>
        <p className="closing-section__support">{closing.support}</p>
      </div>
    </section>
  );
}
