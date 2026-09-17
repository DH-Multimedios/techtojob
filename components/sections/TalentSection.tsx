import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getMessages } from "@/lib/messages";

export function TalentSection() {
  const { talent } = getMessages();

  return (
    <section id="talento" className="section audience-section" aria-labelledby="talent-heading">
      <div className="shell audience-section__grid">
        <div className="audience-section__copy">
          <SectionHeading
            headingId="talent-heading"
            eyebrow={talent.eyebrow}
            heading={talent.heading}
            description={talent.description}
          />
          <ul className="benefit-list">
            {talent.benefits.map((benefit) => (
              <li key={benefit.title}>
                <span aria-hidden="true">✓</span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <a className="text-link text-link--arrow" href="#como-funciona">
            {talent.cta}
            <ArrowIcon />
          </a>
        </div>

        <div className="profile-composition" aria-label={talent.profileLabel}>
          <div className="profile-composition__header">
            <span className="profile-composition__avatar" aria-hidden="true" />
            <strong>{talent.profileLabel}</strong>
          </div>
          <dl>
            {talent.profileFields.map((field, index) => (
              <div key={field}>
                <dt>{field}</dt>
                <dd aria-hidden="true">
                  <span style={{ width: `${76 - index * 12}%` }} />
                </dd>
              </div>
            ))}
          </dl>
          <p>{talent.profileNote}</p>
        </div>
      </div>
    </section>
  );
}
