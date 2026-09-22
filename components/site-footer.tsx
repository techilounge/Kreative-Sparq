import Link from "next/link";
import type { GlobalContent } from "@/content/types";
import { BrandLogo } from "./brand-logo";

export function SiteFooter({ content }: { content: GlobalContent }) {
  return (
    <footer className="site-footer">
      <div className="ks-container site-footer__inner">
        <div className="site-footer__intro">
          <BrandLogo footer />
          <p className="site-footer__statement">{content.footerStatement}</p>
          <p className="site-footer__description">
            {content.footerDescription}
          </p>
        </div>
        <nav className="site-footer__groups" aria-label="Footer">
          {content.footerGroups.map((group) => (
            <div className="site-footer__group" key={group.heading}>
              <h2>{group.heading}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="site-footer__bottom">
          <span>
            © {new Date().getFullYear()} Kreative Sparq. All rights reserved.
          </span>
          <span>
            Nigeria, with remote collaboration available for diaspora and
            international teams.
          </span>
        </div>
      </div>
    </footer>
  );
}
