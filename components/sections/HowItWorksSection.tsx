"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { getMessages } from "@/lib/messages";

export function HowItWorksSection() {
  const { howItWorks } = getMessages();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const steps = section?.querySelector(".steps-grid");

    if (!section || !steps || !("IntersectionObserver" in window)) {
      return;
    }

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionPreference.matches) {
      return;
    }

    section.dataset.stepsState = "ready";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        section.dataset.stepsState = "visible";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8%", threshold: 0.16 },
    );

    const revealWithoutMotion = (event: MediaQueryListEvent) => {
      if (event.matches) {
        section.dataset.stepsState = "visible";
        observer.disconnect();
      }
    };

    motionPreference.addEventListener("change", revealWithoutMotion);
    observer.observe(steps);

    return () => {
      motionPreference.removeEventListener("change", revealWithoutMotion);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="section section--how"
      aria-labelledby="how-heading"
    >
      <div className="how-ambient" aria-hidden="true">
        <span className="how-ambient__symbol how-ambient__symbol--gradient">
          <Image
            src="/brand/symbol-gradient.svg"
            width={288}
            height={288}
            alt=""
            loading="lazy"
            unoptimized
          />
        </span>
        <span className="how-ambient__symbol how-ambient__symbol--dark">
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

      <div className="shell section--how__content">
        <SectionHeading
          headingId="how-heading"
          eyebrow={howItWorks.eyebrow}
          heading={howItWorks.heading}
          align="center"
        />

        <ol className="steps-grid">
          {howItWorks.steps.map((step, index) => (
            <li key={step.title}>
              <span className="step-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>

        <p className="section-support">{howItWorks.support}</p>
      </div>
    </section>
  );
}
