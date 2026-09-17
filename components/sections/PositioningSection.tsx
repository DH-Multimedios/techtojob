"use client";

import { useEffect, useRef } from "react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { getMessages } from "@/lib/messages";

export function PositioningSection() {
  const { positioning } = getMessages();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !("IntersectionObserver" in window)) {
      return;
    }

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionPreference.matches) {
      return;
    }

    section.dataset.revealState = "ready";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        section.dataset.revealState = "visible";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12%", threshold: 0.12 },
    );

    const revealWithoutMotion = (event: MediaQueryListEvent) => {
      if (event.matches) {
        section.dataset.revealState = "visible";
        observer.disconnect();
      }
    };

    motionPreference.addEventListener("change", revealWithoutMotion);
    observer.observe(section);

    return () => {
      motionPreference.removeEventListener("change", revealWithoutMotion);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section section--positioning"
      aria-labelledby="positioning-heading"
    >
      <div className="shell positioning-grid">
        <div className="positioning-copy">
          <div className="positioning-copy__intro">
            <SectionHeading
              headingId="positioning-heading"
              eyebrow={positioning.eyebrow}
              heading={positioning.heading}
              description={positioning.description}
            />
          </div>
          <p className="positioning-note">{positioning.note}</p>
        </div>

        <div className="contrast-list">
          <div className="contrast-list__labels" aria-hidden="true">
            <span>{positioning.fromLabel}</span>
            <span>{positioning.toLabel}</span>
          </div>
          {positioning.pairs.map((pair, index) => (
            <div className="contrast-row" key={pair.from}>
              <span className="contrast-row__from">{pair.from}</span>
              <span className="contrast-row__path" aria-hidden="true">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </span>
              <strong>{pair.to}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
