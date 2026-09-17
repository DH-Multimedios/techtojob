import { SectionHeading } from "@/components/ui/SectionHeading";
import { getMessages } from "@/lib/messages";

export function NetworkingSection() {
  const { networking } = getMessages();

  return (
    <section
      id="networking"
      className="section section--networking"
      aria-labelledby="networking-heading"
    >
      <div className="shell">
        <SectionHeading
          headingId="networking-heading"
          eyebrow={networking.eyebrow}
          heading={networking.heading}
          description={networking.description}
          align="center"
        />
        <div className="network-grid">
          {networking.items.map((item, index) => (
            <article key={item.title}>
              <span className="network-grid__icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className="network-grid__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
