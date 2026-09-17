import { SectionHeading } from "@/components/ui/SectionHeading";
import { getMessages } from "@/lib/messages";

export function PositioningSection() {
  const { positioning } = getMessages();

  return (
    <section className="section section--positioning" aria-labelledby="positioning-heading">
      <div className="shell positioning-grid">
        <div>
          <SectionHeading
            headingId="positioning-heading"
            eyebrow={positioning.eyebrow}
            heading={positioning.heading}
            description={positioning.description}
          />
          <p className="positioning-note">{positioning.note}</p>
        </div>

        <div className="contrast-list">
          <div className="contrast-list__labels" aria-hidden="true">
            <span>{positioning.fromLabel}</span>
            <span>{positioning.toLabel}</span>
          </div>
          {positioning.pairs.map((pair, index) => (
            <div className="contrast-row" key={pair.from}>
              <span className="contrast-row__from">{pair.from}</span>
              <span className="contrast-row__path" aria-hidden="true">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </span>
              <strong>{pair.to}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
