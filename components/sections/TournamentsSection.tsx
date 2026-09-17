import { BrandCurve } from "@/components/ui/BrandCurve";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getMessages } from "@/lib/messages";

export function TournamentsSection() {
  const { tournaments } = getMessages();

  return (
    <section
      id="torneos"
      className="section section--tournaments"
      aria-labelledby="tournaments-heading"
    >
      <div className="shell">
        <div className="tournaments-intro">
          <SectionHeading
            headingId="tournaments-heading"
            eyebrow={tournaments.eyebrow}
            heading={tournaments.heading}
            description={tournaments.description}
          />
          <p className="evidence-note">{tournaments.evidence}</p>
        </div>

        <ol className="tournament-flow">
          {tournaments.steps.map((step, index) => (
            <li key={step.title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
      <BrandCurve className="tournaments-curve" />
    </section>
  );
}
