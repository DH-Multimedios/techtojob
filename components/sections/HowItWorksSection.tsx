import { SectionHeading } from "@/components/ui/SectionHeading";
import { getMessages } from "@/lib/messages";

export function HowItWorksSection() {
  const { howItWorks } = getMessages();

  return (
    <section
      id="como-funciona"
      className="section section--how"
      aria-labelledby="how-heading"
    >
      <div className="shell">
        <SectionHeading
          headingId="how-heading"
          eyebrow={howItWorks.eyebrow}
          heading={howItWorks.heading}
          align="center"
        />

        <ol className="steps-grid">
          {howItWorks.steps.map((step, index) => (
            <li key={step.title}>
              <span className="step-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>

        <p className="section-support">{howItWorks.support}</p>
      </div>
    </section>
  );
}
