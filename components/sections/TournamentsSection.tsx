"use client";

import { useEffect, useRef, type CSSProperties } from "react";

import { BrandCurve } from "@/components/ui/BrandCurve";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getMessages } from "@/lib/messages";

export function TournamentsSection() {
  const { tournaments } = getMessages();
  const flowRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const flow = flowRef.current;

    if (!flow || !("IntersectionObserver" in window)) {
      return;
    }

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionPreference.matches) {
      return;
    }

    flow.dataset.flowState = "ready";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        flow.dataset.flowState = "visible";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8%", threshold: 0.16 },
    );

    const revealWithoutMotion = (event: MediaQueryListEvent) => {
      if (event.matches) {
        flow.dataset.flowState = "visible";
        observer.disconnect();
      }
    };

    motionPreference.addEventListener("change", revealWithoutMotion);
    observer.observe(flow);

    return () => {
      motionPreference.removeEventListener("change", revealWithoutMotion);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="torneos"
      className="section section--tournaments"
      aria-labelledby="tournaments-heading"
    >
      <div className="shell">
        <div className="tournaments-intro">
          <SectionHeading
            headingId="tournaments-heading"
            eyebrow={tournaments.eyebrow}
            heading={tournaments.heading}
            description={tournaments.description}
          />
          <p className="evidence-note">{tournaments.evidence}</p>
        </div>

        <ol ref={flowRef} className="tournament-flow">
          {tournaments.steps.map((step, index) => (
            <li
              key={step.title}
              style={
                {
                  "--tournament-step-delay": `${70 + index * 90}ms`,
                } as CSSProperties
              }
            >
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
      <BrandCurve className="tournaments-curve" />
    </section>
  );
}
