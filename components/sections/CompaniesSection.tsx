import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getMessages } from "@/lib/messages";

export function CompaniesSection() {
  const { companies } = getMessages();

  return (
    <section
      id="empresas"
      className="section audience-section audience-section--dark"
      aria-labelledby="companies-heading"
    >
      <div className="shell audience-section__grid audience-section__grid--reverse">
        <div className="signal-composition">
          <p>{companies.signalLabel}</p>
          <ul>
            {companies.signals.map((signal, index) => (
              <li key={signal}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <strong>{signal}</strong>
              </li>
            ))}
          </ul>
          <div className="signal-composition__curve" aria-hidden="true" />
        </div>

        <div className="audience-section__copy">
          <SectionHeading
            headingId="companies-heading"
            eyebrow={companies.eyebrow}
            heading={companies.heading}
            description={companies.description}
            tone="dark"
          />
          <ul className="benefit-list benefit-list--dark">
            {companies.benefits.map((benefit) => (
              <li key={benefit.title}>
                <span aria-hidden="true">✓</span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <a className="text-link text-link--arrow text-link--mint" href="#networking">
            {companies.cta}
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
