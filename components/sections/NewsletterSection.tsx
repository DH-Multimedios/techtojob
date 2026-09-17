import { NewsletterDemoForm } from "@/components/interactive/NewsletterDemoForm";
import { getMessages } from "@/lib/messages";

export function NewsletterSection() {
  const { newsletter } = getMessages();

  return (
    <section className="section section--newsletter" aria-labelledby="newsletter-heading">
      <div className="shell newsletter-card">
        <div className="newsletter-card__copy">
          <p className="eyebrow">{newsletter.eyebrow}</p>
          <h2 id="newsletter-heading">{newsletter.heading}</h2>
          <p className="section-lead">{newsletter.value}</p>
          <dl className="newsletter-facts">
            <div>
              <dt>{newsletter.frequencyLabel}</dt>
              <dd>{newsletter.frequency}</dd>
            </div>
            <div>
              <dt>{newsletter.promiseLabel}</dt>
              <dd>{newsletter.promise}</dd>
            </div>
          </dl>
        </div>
        <div className="newsletter-card__form">
          <NewsletterDemoForm
            emailLabel={newsletter.emailLabel}
            emailHelp={newsletter.emailHelp}
            submitLabel={newsletter.submit}
            emptyError={newsletter.emptyError}
            formatError={newsletter.formatError}
            successMessage={newsletter.success}
            resetLabel={newsletter.reset}
          />
          <noscript>
            <p className="newsletter-noscript">{newsletter.noScript}</p>
          </noscript>
          <p className="newsletter-privacy">{newsletter.privacy}</p>
        </div>
      </div>
    </section>
  );
}
