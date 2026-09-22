import Link from "next/link";

type HomeTextLinkProps = {
  href: string;
  label: string;
};

export function HomeTextLink({ href, label }: HomeTextLinkProps) {
  const lastSpace = label.lastIndexOf(" ");
  const prefix = lastSpace < 0 ? "" : label.slice(0, lastSpace);
  const lastWord = label.slice(lastSpace + 1);

  return (
    <Link className="home-text-link" href={href}>
      {prefix && `${prefix} `}
      <span className="home-text-link__tail">
        {lastWord}
        <span aria-hidden="true"> ↗</span>
      </span>
    </Link>
  );
}
