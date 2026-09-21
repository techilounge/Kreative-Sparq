import Link from 'next/link';

import { footer } from '@/content/global';
import { Logo } from '@/components/ui/Logo';
import { privacyPagePublished, siteSettings, termsPagePublished } from '@/lib/site-settings';

/**
 * Unconfigured contact methods and unpublished legal routes are omitted rather
 * than rendered empty. The newsletter block is not here at all: its subscription
 * destination is not configured, and an active field that discards an address
 * would be worse than no field.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const { contactEmail, contactPhone, socialProfiles } = siteSettings;

  const groups = footer.groups
    .map((group) => {
      if (group.heading !== 'Legal') return group;
      const links = group.links.filter((link) =>
        link.href === '/privacy' ? privacyPagePublished : termsPagePublished,
      );
      return { ...group, links };
    })
    .filter((group) => group.links.length > 0);

  return (
    <footer className="bg-surface border-line border-t">
      <div className="container-editorial py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div className="flex flex-col gap-5">
            <Logo height={34} />
            <p className="text-display-sm font-display measure-tight font-normal">
              {footer.statement}
            </p>
            <p className="text-ink-muted measure text-sm/6">{footer.description}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((group) => (
              <nav key={group.heading} aria-label={group.heading}>
                <h2 className="eyebrow mb-4">{group.heading}</h2>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-ink-muted hover:text-action inline-flex min-h-6 items-center text-sm/6 transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="border-line mt-14 grid gap-8 border-t pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {contactEmail || contactPhone ? (
            <div className="flex flex-col gap-2.5">
              <h2 className="eyebrow">{footer.contactHeading}</h2>
              {contactEmail ? (
                <p className="text-sm/6">
                  <span className="text-ink-muted">{footer.emailLabel}: </span>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-link hover:text-action-hover underline underline-offset-4"
                  >
                    {contactEmail}
                  </a>
                </p>
              ) : null}
              {contactPhone ? (
                <p className="text-sm/6">
                  <span className="text-ink-muted">{footer.phoneLabel}: </span>
                  <a
                    href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                    className="text-link hover:text-action-hover underline underline-offset-4"
                  >
                    {contactPhone}
                  </a>
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="flex flex-col gap-2.5 sm:col-span-2">
            <h2 className="eyebrow">{footer.serviceAreaLabel}</h2>
            <p className="text-ink-muted measure text-sm/6">
              Nigeria, with remote collaboration available for diaspora and international teams.
            </p>
          </div>

          {socialProfiles.length > 0 ? (
            <nav aria-label="Social profiles" className="flex flex-col gap-2.5">
              <h2 className="eyebrow">Follow</h2>
              <ul className="flex flex-col gap-2.5">
                {socialProfiles.map((profile) => (
                  <li key={profile}>
                    <a
                      href={profile}
                      rel="me noopener noreferrer"
                      target="_blank"
                      className="text-ink-muted hover:text-action inline-flex min-h-6 items-center text-sm/6 break-all transition-colors duration-200"
                    >
                      {new URL(profile).hostname.replace(/^www\./, '')}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>

        <p className="text-ink-muted border-line mt-10 border-t pt-8 text-sm/6">
          {footer.copyright(year)}
        </p>
      </div>
    </footer>
  );
}
