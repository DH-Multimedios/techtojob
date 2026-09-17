"use client";

import { useEffect, useRef, type CSSProperties } from "react";

import { testimonials } from "@/content/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getMessages } from "@/lib/messages";

export function TestimonialsSection() {
  const messages = getMessages();
  const { testimonials: copy } = messages;
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;

    if (!grid || !("IntersectionObserver" in window)) {
      return;
    }

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionPreference.matches) {
      return;
    }

    grid.dataset.testimonialState = "ready";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        grid.dataset.testimonialState = "visible";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8%", threshold: 0.14 },
    );

    const revealWithoutMotion = (event: MediaQueryListEvent) => {
      if (event.matches) {
        grid.dataset.testimonialState = "visible";
        observer.disconnect();
      }
    };

    motionPreference.addEventListener("change", revealWithoutMotion);
    observer.observe(grid);

    return () => {
      motionPreference.removeEventListener("change", revealWithoutMotion);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="section section--testimonials" aria-labelledby="testimonials-heading">
      <div className="shell">
        <div className="provisional-heading">
          <SectionHeading
            headingId="testimonials-heading"
            eyebrow={copy.eyebrow}
            heading={copy.heading}
          />
          <p>{copy.transparency}</p>
        </div>

        <div ref={gridRef} className="testimonial-grid">
          {testimonials.map((testimonial, index) => {
            const item = copy.items[testimonial.id];

            return (
              <article
                className="testimonial-card"
                key={testimonial.id}
                style={
                  {
                    "--testimonial-delay": `${70 + index * 90}ms`,
                  } as CSSProperties
                }
              >
                <span className="sample-badge">{copy.sampleLabel}</span>
                <blockquote>“{item.quote}”</blockquote>
                <div>
                  <h3>{item.name}</h3>
                  <p className="testimonial-card__profile">
                    {testimonial.profileUrl ? (
                      <a
                        href={testimonial.profileUrl}
                        aria-label={`${copy.profileLinkLabel}: ${item.name}`}
                      >
                        {copy.profileLinkLabel}
                      </a>
                    ) : (
                      <span>{item.profile}</span>
                    )}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
