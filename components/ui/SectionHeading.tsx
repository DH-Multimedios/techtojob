type SectionHeadingProps = {
  headingId?: string;
  eyebrow: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeading({
  headingId,
  eyebrow,
  heading,
  description,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  return (
    <div
      className={`section-heading section-heading--${align} section-heading--${tone}`}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={headingId}>{heading}</h2>
      {description ? <p className="section-lead">{description}</p> : null}
    </div>
  );
}
