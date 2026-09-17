"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { getMessages } from "@/lib/messages";

export function NetworkingSection() {
  const { networking } = getMessages();
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

    grid.dataset.networkState = "ready";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        grid.dataset.networkState = "visible";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8%", threshold: 0.16 },
    );

    const revealWithoutMotion = (event: MediaQueryListEvent) => {
      if (event.matches) {
        grid.dataset.networkState = "visible";
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
    <section
      id="networking"
      className="section section--networking"
      aria-labelledby="networking-heading"
    >
      <div className="networking-ambient" aria-hidden="true">
        <span className="networking-ambient__symbol networking-ambient__symbol--gradient">
          <Image
            src="/brand/symbol-gradient.svg"
            width={288}
            height={288}
            alt=""
            loading="lazy"
            unoptimized
          />
        </span>
        <span className="networking-ambient__symbol networking-ambient__symbol--dark">
          <Image
            src="/brand/symbol-dark.svg"
            width={288}
            height={288}
            alt=""
            loading="lazy"
            unoptimized
          />
        </span>
        <span className="networking-ambient__symbol networking-ambient__symbol--mint">
          <Image
            src="/brand/symbol-mint.svg"
            width={288}
            height={288}
            alt=""
            loading="lazy"
            unoptimized
          />
        </span>
      </div>

      <div className="shell section--networking__content">
        <SectionHeading
          headingId="networking-heading"
          eyebrow={networking.eyebrow}
          heading={networking.heading}
          description={networking.description}
          align="center"
        />
        <div ref={gridRef} className="network-grid">
          {networking.items.map((item, index) => (
            <article
              key={item.title}
              style={{ "--network-card-index": index } as CSSProperties}
            >
              <span className="network-grid__icon" aria-hidden="true">
                <Image
                  src={
                    index % 2 === 0
                      ? "/brand/symbol-gradient.svg"
                      : "/brand/symbol-dark.svg"
                  }
                  width={80}
                  height={80}
                  alt=""
                  loading="lazy"
                  unoptimized
                />
              </span>
              <span className="network-grid__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
