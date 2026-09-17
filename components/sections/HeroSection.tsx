import Image from "next/image";

import { HeroTabs } from "@/components/interactive/HeroTabs";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { BrandCurve } from "@/components/ui/BrandCurve";
import { getMessages } from "@/lib/messages";

const DISCORD_URL = "https://discord.gg/h9FFgKdkRd";

export function HeroSection() {
  const messages = getMessages();

  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <BrandCurve className="hero-section__curve hero-section__curve--top" />
      <div className="hero-section__symbol" aria-hidden="true">
        <Image
          src="/brand/symbol-mint.svg"
          width={288}
          height={288}
          alt=""
          loading="eager"
          unoptimized
        />
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
          <HeroTabs
            tablistLabel={messages.hero.tablistLabel}
            labels={messages.hero.tabs}
            panels={messages.hero.panels}
          />
        </div>
      </div>
      <BrandCurve className="hero-section__curve hero-section__curve--bottom" />
    </section>
  );
}
