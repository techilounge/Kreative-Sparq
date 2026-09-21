import type { LegalBlock, LegalClauseKey } from '@/content/pages/legal';
import { legalUnpublished } from '@/content/pages/legal';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { legalClauses, siteSettings } from '@/lib/site-settings';

/** Resolves the placeholders the legal copy leaves for site settings. */
function resolve(text: string): string {
  return text
    .replaceAll('{{PRIVACY_EMAIL}}', siteSettings.privacyEmail ?? '')
    .replaceAll('{{LEGAL_CONTACT_EMAIL}}', siteSettings.legalContactEmail ?? '')
    .replaceAll('{{LEGAL_BUSINESS_NAME}}', siteSettings.legalBusinessName ?? '');
}

export function LegalUnpublished({ title }: { readonly title: string }) {
  return (
    <Container className="py-20">
      <div className="flex max-w-2xl flex-col gap-6">
        <h1 className="text-display-lg font-display font-normal">{title}</h1>
        <h2 className="text-display-sm font-display font-normal">{legalUnpublished.heading}</h2>
        <p className="text-ink-muted measure text-base/7">{legalUnpublished.body}</p>
        <p className="text-ink-muted measure text-base/7">{legalUnpublished.contactIntro}</p>
        <div className="mt-2 flex flex-wrap gap-3">
          <ButtonLink href={legalUnpublished.cta.href}>{legalUnpublished.cta.label}</ButtonLink>
          <ButtonLink href={legalUnpublished.homeCta.href} variant="secondary">
            {legalUnpublished.homeCta.label}
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}

export function LegalDocument({
  title,
  lastUpdatedLabel,
  lastUpdated,
  intro,
  blocks,
  children,
}: {
  readonly title: string;
  readonly lastUpdatedLabel: string;
  readonly lastUpdated: string;
  readonly intro: string;
  readonly blocks: readonly LegalBlock[];
  readonly children?: React.ReactNode;
}) {
  return (
    <Container className="py-16 md:py-20">
      <article className="flex max-w-3xl flex-col gap-6">
        <header className="flex flex-col gap-3">
          <h1 className="text-display-lg font-display font-normal">{title}</h1>
          <p className="text-ink-muted text-sm/6">
            {lastUpdatedLabel}: {lastUpdated}
          </p>
        </header>

        <p className="text-ink measure text-base/7">{intro}</p>

        {children}

        {blocks.map((block) => {
          const clause = block.requiredClause
            ? legalClauses[block.requiredClause as LegalClauseKey]
            : null;

          return (
            <section key={block.heading} className="flex flex-col gap-3">
              <h2 className="text-display-sm font-display mt-4 font-normal">{block.heading}</h2>
              {block.body?.map((paragraph) => (
                <p key={paragraph} className="text-ink measure text-base/7">
                  {resolve(paragraph)}
                </p>
              ))}
              {clause ? <p className="text-ink measure text-base/7">{clause}</p> : null}
              {block.bullets ? (
                <ul className="border-line measure border-t">
                  {block.bullets.map((item) => (
                    <li key={item} className="border-line text-ink border-b py-2.5 text-base/7">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          );
        })}
      </article>
    </Container>
  );
}
