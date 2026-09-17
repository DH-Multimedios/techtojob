import { newsItems } from "@/content/news";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getMessages } from "@/lib/messages";

export function NewsSection() {
  const { news } = getMessages();

  return (
    <section id="noticias" className="section section--news" aria-labelledby="news-heading">
      <div className="shell">
        <div className="provisional-heading provisional-heading--news">
          <SectionHeading
            headingId="news-heading"
            eyebrow={news.eyebrow}
            heading={news.heading}
          />
          <p>{news.transparency}</p>
        </div>

        <div className="news-grid">
          {newsItems.map((newsItem) => {
            const item = news.items[newsItem.id];

            return (
              <article className="news-card" key={newsItem.id}>
                <div className={`news-card__visual news-card__visual--${newsItem.accent}`} aria-hidden="true">
                  <span />
                  <span />
                  <span />
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
