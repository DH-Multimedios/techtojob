"use client";

import Image from "next/image";
import { useRef, useState, type AnimationEvent } from "react";

type HeroAudience = "talent" | "companies";

type HeroPanel = {
  description: string;
  items: Array<{
    title: string;
    description: string;
  }>;
};

type AudienceRadialMenuProps = {
  ariaLabel: string;
  labels: Record<HeroAudience, string>;
  panels: Record<HeroAudience, HeroPanel>;
};

const audiences: HeroAudience[] = ["talent", "companies"];

export function AudienceRadialMenu({
  ariaLabel,
  labels,
  panels,
}: AudienceRadialMenuProps) {
  const [activeAudience, setActiveAudience] =
    useState<HeroAudience | null>("talent");
  const [visibleAudiences, setVisibleAudiences] = useState<
    Set<HeroAudience>
  >(() => new Set(["talent"]));
  const activeAudienceRef = useRef<HeroAudience | null>("talent");

  function toggleAudience(audience: HeroAudience) {
    const nextAudience =
      activeAudienceRef.current === audience ? null : audience;

    activeAudienceRef.current = nextAudience;
    setActiveAudience(nextAudience);

    if (nextAudience) {
      setVisibleAudiences((currentAudiences) => {
        const nextAudiences = new Set(currentAudiences);
        nextAudiences.add(nextAudience);
        return nextAudiences;
      });
    }
  }

  function finishClosing(
    event: AnimationEvent<HTMLElement>,
    audience: HeroAudience,
  ) {
    if (event.currentTarget !== event.target) return;
    if (!event.animationName.includes("audience-radial-region-close")) return;
    if (activeAudienceRef.current === audience) return;

    setVisibleAudiences((currentAudiences) => {
      const nextAudiences = new Set(currentAudiences);
      nextAudiences.delete(audience);
      return nextAudiences;
    });
  }

  return (
    <div
      className="audience-radial-menu"
      data-active={activeAudience ?? "none"}
    >
      <div
        className="audience-radial-menu__controls"
        role="group"
        aria-label={ariaLabel}
      >
        {audiences.map((audience) => {
          const isExpanded = activeAudience === audience;

          return (
            <button
              className="audience-radial-menu__control"
              key={audience}
              id={`hero-audience-control-${audience}`}
              type="button"
              aria-expanded={isExpanded}
              aria-controls={`hero-audience-region-${audience}`}
              onClick={() => toggleAudience(audience)}
            >
              <span
                className="audience-radial-menu__control-mark"
                aria-hidden="true"
              >
                <Image
                  src={
                    isExpanded
                      ? "/brand/symbol-dark.svg"
                      : "/brand/symbol-mint.svg"
                  }
                  width={24}
                  height={24}
                  alt=""
                  loading="eager"
                  unoptimized
                />
              </span>
              <span>{labels[audience]}</span>
            </button>
          );
        })}
      </div>

      {audiences.map((audience) => {
        const panel = panels[audience];
        const isExpanded = activeAudience === audience;
        const isVisible = visibleAudiences.has(audience);
        const connectorOrigin = audience === "talent" ? 24 : 76;

        return (
          <section
            className="audience-radial-menu__region"
            key={audience}
            id={`hero-audience-region-${audience}`}
            role="region"
            aria-labelledby={`hero-audience-control-${audience}`}
            aria-hidden={!isExpanded}
            inert={!isExpanded}
            hidden={!isVisible}
            data-audience={audience}
            data-state={isExpanded ? "open" : isVisible ? "closing" : "closed"}
            onAnimationEnd={(event) => finishClosing(event, audience)}
          >
            <svg
              className="audience-radial-menu__connectors"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                pathLength="1"
                d={`M ${connectorOrigin} 0 C ${connectorOrigin} 24, 22 28, 22 54`}
              />
              <path
                pathLength="1"
                d={`M ${connectorOrigin} 0 C ${connectorOrigin} 25, 78 30, 78 56`}
              />
              <path
                pathLength="1"
                d={`M ${connectorOrigin} 0 C ${connectorOrigin} 40, 50 56, 50 86`}
              />
            </svg>

            <p className="audience-radial-menu__description">
              {panel.description}
            </p>

            <ol className="audience-radial-menu__items">
              {panel.items.map((item, index) => (
                <li key={item.title}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
