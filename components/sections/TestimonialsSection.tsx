import { testimonials } from "@/content/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getMessages } from "@/lib/messages";

export function TestimonialsSection() {
  const messages = getMessages();
  const { testimonials: copy } = messages;

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

        <div className="testimonial-grid">
          {testimonials.map((testimonial) => {
            const item = copy.items[testimonial.id];

            return (
              <article className="testimonial-card" key={testimonial.id}>
                <span className="sample-badge">{copy.sampleLabel}</span>
                <div
                  className={`geometric-avatar geometric-avatar--${testimonial.avatarVariant}`}
                  aria-hidden="true"
                >
                  <span />
                </div>
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
