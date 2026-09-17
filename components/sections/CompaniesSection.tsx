"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";

import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getMessages } from "@/lib/messages";

export function CompaniesSection() {
  const { companies } = getMessages();
  const compositionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const composition = compositionRef.current;

    if (!composition || !("IntersectionObserver" in window)) {
      return;
    }

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionPreference.matches) {
      return;
    }

    composition.dataset.signalState = "ready";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        composition.dataset.signalState = "visible";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8%", threshold: 0.18 },
    );

    const revealWithoutMotion = (event: MediaQueryListEvent) => {
      if (event.matches) {
        composition.dataset.signalState = "visible";
        observer.disconnect();
      }
    };

    motionPreference.addEventListener("change", revealWithoutMotion);
    observer.observe(composition);

    return () => {
      motionPreference.removeEventListener("change", revealWithoutMotion);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="empresas"
      className="section audience-section audience-section--dark"
      aria-labelledby="companies-heading"
    >
      <div className="companies-ambient" aria-hidden="true">
        <span className="companies-ambient__symbol companies-ambient__symbol--gradient">
          <Image
            src="/brand/symbol-gradient.svg"
            width={288}
            height={288}
            alt=""
            loading="lazy"
            unoptimized
          />
        </span>
        <span className="companies-ambient__symbol companies-ambient__symbol--mint">
          <Image
            src="/brand/symbol-mint.svg"
            width={288}
            height={288}
            alt=""
            loading="lazy"
            unoptimized
          />
        </span>
        <span className="companies-ambient__symbol companies-ambient__symbol--black">
          <Image
            src="/brand/symbol-black.svg"
            width={288}
            height={288}
            alt=""
            loading="lazy"
            unoptimized
          />
        </span>
      </div>

      <div className="shell audience-section__grid audience-section__grid--reverse">
        <div ref={compositionRef} className="signal-composition">
          <p>{companies.signalLabel}</p>
          <ul>
            {companies.signals.map((signal, index) => (
              <li
                key={signal}
                style={{ "--signal-row-index": index } as CSSProperties}
              >
                <span className="signal-composition__marker" aria-hidden="true">
                  <Image
                    src={
                      index % 2 === 0
                        ? "/brand/symbol-mint.svg"
                        : "/brand/symbol-gradient.svg"
                    }
                    width={28}
                    height={28}
                    alt=""
                    unoptimized
                  />
                </span>
                <strong>{signal}</strong>
              </li>
            ))}
          </ul>
          <div className="signal-composition__curve" aria-hidden="true">
            <Image
              src="/brand/symbol-mint.svg"
              width={288}
              height={288}
              alt=""
              loading="lazy"
              unoptimized
            />
          </div>
        </div>

        <div className="audience-section__copy">
          <SectionHeading
            headingId="companies-heading"
            eyebrow={companies.eyebrow}
            heading={companies.heading}
            description={companies.description}
            tone="dark"
          />
          <ul className="benefit-list benefit-list--dark">
            {companies.benefits.map((benefit) => (
              <li key={benefit.title}>
                <span aria-hidden="true">✓</span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <a className="text-link text-link--arrow text-link--mint" href="#networking">
            {companies.cta}
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
