import { HomeTextLink } from "./home-text-link";

type AvailabilityPanelProps = {
  label: string;
  mark: string;
  heading: string;
  body: string;
  link?: { href: string; label: string };
  className?: string;
};

export function AvailabilityPanel({
  label,
  mark,
  heading,
  body,
  link,
  className = "",
}: AvailabilityPanelProps) {
  const id = `${label.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}-title`;

  return (
    <section
      className={`availability-panel ${className}`.trim()}
      aria-labelledby={id}
    >
      <div className="ks-container availability-panel__grid">
        <div className="availability-panel__mark" aria-hidden="true">
          <span>{label}</span>
          <strong>{mark}</strong>
        </div>
        <div className="availability-panel__copy">
          <p className="eyebrow">Availability</p>
          <h2 id={id}>{heading}</h2>
          <p>{body}</p>
          {link ? <HomeTextLink href={link.href} label={link.label} /> : null}
        </div>
      </div>
    </section>
  );
}
