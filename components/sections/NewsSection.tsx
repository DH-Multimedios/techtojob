"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";

import { newsItems } from "@/content/news";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getMessages } from "@/lib/messages";

export function NewsSection() {
  const { news } = getMessages();
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

    grid.dataset.newsState = "ready";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        grid.dataset.newsState = "visible";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8%", threshold: 0.14 },
    );

    const revealWithoutMotion = (event: MediaQueryListEvent) => {
      if (event.matches) {
        grid.dataset.newsState = "visible";
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
    <section id="noticias" className="section section--news" aria-labelledby="news-heading">
      <div className="news-ambient" aria-hidden="true">
        <span className="news-ambient__symbol news-ambient__symbol--gradient">
          <Image
            src="/brand/symbol-gradient.svg"
            width={288}
            height={288}
            alt=""
            loading="lazy"
            unoptimized
          />
        </span>
        <span className="news-ambient__symbol news-ambient__symbol--dark">
          <Image
            src="/brand/symbol-dark.svg"
            width={288}
            height={288}
            alt=""
            loading="lazy"
            unoptimized
          />
        </span>
        <span className="news-ambient__symbol news-ambient__symbol--mint">
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

      <div className="shell section--news__content">
        <div className="provisional-heading provisional-heading--news">
          <SectionHeading
            headingId="news-heading"
            eyebrow={news.eyebrow}
            heading={news.heading}
          />
          <p>{news.transparency}</p>
        </div>

        <div ref={gridRef} className="news-grid">
          {newsItems.map((newsItem, index) => {
            const item = news.items[newsItem.id];

            return (
              <article
                className="news-card"
                key={newsItem.id}
                style={{ "--news-card-index": index } as CSSProperties}
              >
                <div className={`news-card__visual news-card__visual--${newsItem.accent}`} aria-hidden="true">
                  <div className="news-card__artwork">
                    {newsItem.accent === "steps" ? (
                      <>
                        <span />
                        <span />
                        <span />
                      </>
                    ) : (
                      <Image
                        src={
                          newsItem.accent === "curve"
                            ? "/brand/symbol-gradient.svg"
                            : "/brand/symbol-dark.svg"
                        }
                        width={288}
                        height={288}
                        alt=""
                        loading="lazy"
                        unoptimized
                      />
                    )}
                  </div>
                </div>
                <div className="news-card__body">
                  <span className="sample-badge sample-badge--dark">{news.sampleLabel}</span>
                  <div className="news-card__meta">
                    <span>{item.category}</span>
                    <time dateTime={newsItem.dateTime}>{item.date}</time>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
