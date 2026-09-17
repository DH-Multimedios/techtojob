"use client";

import { useRef, useState, type KeyboardEvent } from "react";

type HeroAudience = "talent" | "companies";

type HeroPanel = {
  description: string;
  items: Array<{
    title: string;
    description: string;
  }>;
};

type HeroTabsProps = {
  tablistLabel: string;
  labels: Record<HeroAudience, string>;
  panels: Record<HeroAudience, HeroPanel>;
};

const audiences: HeroAudience[] = ["talent", "companies"];

export function HeroTabs({ tablistLabel, labels, panels }: HeroTabsProps) {
  const [activeAudience, setActiveAudience] =
    useState<HeroAudience>("talent");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function activateTab(index: number) {
    const audience = audiences[index];
    setActiveAudience(audience);
    tabRefs.current[index]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = (index + 1) % audiences.length;
    if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + audiences.length) % audiences.length;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = audiences.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      activateTab(nextIndex);
    }
  }

  return (
    <div className="hero-tabs">
      <div className="hero-tabs__list" role="tablist" aria-label={tablistLabel}>
        {audiences.map((audience, index) => {
          const isActive = activeAudience === audience;

          return (
            <button
              key={audience}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`hero-tab-${audience}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`hero-panel-${audience}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveAudience(audience)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {labels[audience]}
            </button>
          );
        })}
      </div>

      <div className="hero-tabs__panels">
        {audiences.map((audience) => {
          const panel = panels[audience];
          const isActive = activeAudience === audience;

          return (
            <div
              key={audience}
              id={`hero-panel-${audience}`}
              role="tabpanel"
              aria-labelledby={`hero-tab-${audience}`}
              hidden={!isActive}
              className="hero-panel"
            >
              <p className="hero-panel__description">{panel.description}</p>
              <div className="hero-panel__cards">
                {panel.items.map((item, index) => (
                  <article className="hero-evidence" key={item.title}>
                    <span aria-hidden="true" className="hero-evidence__number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
