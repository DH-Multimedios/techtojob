import Image from "next/image";

import { AudienceRadialMenu } from "@/components/interactive/AudienceRadialMenu";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { BrandCurve } from "@/components/ui/BrandCurve";
import { getMessages } from "@/lib/messages";

const DISCORD_URL = "https://discord.gg/h9FFgKdkRd";

export function HeroSection() {
  const messages = getMessages();

  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <BrandCurve className="hero-section__curve hero-section__curve--top" />
      <div className="hero-section__ambient" aria-hidden="true">
        <span className="hero-section__ambient-symbol hero-section__ambient-symbol--gradient">
          <Image
            src="/brand/symbol-gradient.svg"
            width={288}
            height={288}
            alt=""
            loading="eager"
            unoptimized
          />
        </span>
        <span className="hero-section__ambient-symbol hero-section__ambient-symbol--mint">
          <Image
            src="/brand/symbol-mint.svg"
            width={288}
            height={288}
            alt=""
            loading="eager"
            unoptimized
          />
        </span>
        <span className="hero-section__ambient-symbol hero-section__ambient-symbol--black">
          <Image
            src="/brand/symbol-black.svg"
            width={288}
            height={288}
            alt=""
            loading="lazy"
            unoptimized
          />
        </span>
        <span className="hero-section__ambient-symbol hero-section__ambient-symbol--dark">
          <Image
            src="/brand/symbol-dark.svg"
            width={288}
            height={288}
            alt=""
            loading="lazy"
            unoptimized
          />
        </span>
      </div>

      <div className="shell hero-section__grid">
        <div className="hero-section__intro">
          <p className="hero-context">{messages.hero.context}</p>
          <h1 id="hero-heading">{messages.hero.heading}</h1>
          <div className="hero-section__action">
            <a className="button button--primary button--large" href={DISCORD_URL}>
              {messages.hero.cta}
              <ArrowIcon />
            </a>
            <p>{messages.hero.support}</p>
          </div>
        </div>

        <div className="hero-section__experience">
          <AudienceRadialMenu
            ariaLabel={messages.hero.tablistLabel}
            labels={messages.hero.tabs}
            panels={messages.hero.panels}
          />
        </div>
      </div>
      <BrandCurve className="hero-section__curve hero-section__curve--bottom" />
    </section>
  );
}
