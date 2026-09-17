"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";

import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getMessages } from "@/lib/messages";

export function TalentSection() {
  const { talent } = getMessages();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const profile = profileRef.current;

    if (!profile || !("IntersectionObserver" in window)) {
      return;
    }

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionPreference.matches) {
      return;
    }

    profile.dataset.profileState = "ready";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        profile.dataset.profileState = "visible";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8%", threshold: 0.18 },
    );

    const revealWithoutMotion = (event: MediaQueryListEvent) => {
      if (event.matches) {
        profile.dataset.profileState = "visible";
        observer.disconnect();
      }
    };

    motionPreference.addEventListener("change", revealWithoutMotion);
    observer.observe(profile);

    return () => {
      motionPreference.removeEventListener("change", revealWithoutMotion);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="talento" className="section audience-section" aria-labelledby="talent-heading">
      <div className="shell audience-section__grid">
        <div className="audience-section__copy">
          <SectionHeading
            headingId="talent-heading"
            eyebrow={talent.eyebrow}
            heading={talent.heading}
            description={talent.description}
          />
          <ul className="benefit-list">
            {talent.benefits.map((benefit) => (
              <li key={benefit.title}>
                <span aria-hidden="true">✓</span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <a className="text-link text-link--arrow" href="#como-funciona">
            {talent.cta}
            <ArrowIcon />
          </a>
        </div>

        <div
          ref={profileRef}
          className="profile-composition"
          aria-label={talent.profileLabel}
        >
          <div className="profile-composition__symbol" aria-hidden="true">
            <Image
              src="/brand/symbol-gradient.svg"
              width={288}
              height={288}
              alt=""
              loading="lazy"
              unoptimized
            />
          </div>
          <div className="profile-composition__header">
            <span className="profile-composition__avatar" aria-hidden="true" />
            <strong>{talent.profileLabel}</strong>
          </div>
          <dl>
            {talent.profileFields.map((field, index) => (
              <div
                key={field}
                style={{ "--profile-row-index": index } as CSSProperties}
              >
                <dt>{field}</dt>
                <dd aria-hidden="true">
                  <span style={{ width: `${76 - index * 12}%` }} />
                </dd>
              </div>
            ))}
          </dl>
          <p>{talent.profileNote}</p>
        </div>
      </div>
    </section>
  );
}
