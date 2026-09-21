import type { ServiceSection } from '@/content/services';
import { MotionReveal } from '@/components/motion/MotionReveal';
import { Section } from '@/components/ui/Section';

/**
 * Renders a service page's sections.
 *
 * The block kinds carry different layouts on purpose, and the tone alternates so
 * consecutive sections never repeat the same alignment or surface. Two service
 * pages with different section sequences therefore read differently, even though
 * they share these components.
 */
export function ServiceSectionBlocks({
  sections,
}: {
  readonly sections: readonly ServiceSection[];
}) {
  return (
    <>
      {sections.map((section, index) => {
        const headingId = `service-section-${index}`;
        const tone = index % 2 === 1 ? 'surface' : 'page';

        return (
          <Section key={headingId} tone={tone} rule labelledBy={headingId} spacing="normal">
            {renderSection(section, headingId)}
          </Section>
        );
      })}
    </>
  );
}

function renderSection(section: ServiceSection, headingId: string) {
  switch (section.kind) {
    case 'prose':
      return (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
          <h2 id={headingId} className="text-display-md font-display font-normal">
            {section.heading}
          </h2>
          <div className="flex flex-col gap-6">
            {section.body.map((paragraph) => (
              <p key={paragraph} className="text-ink-muted measure text-base/7">
                {paragraph}
              </p>
            ))}
            {section.bullets ? (
              <div className="flex flex-col gap-3">
                {section.bullets.intro ? (
                  <p className="text-ink font-medium">{section.bullets.intro}</p>
                ) : null}
                <ul className="border-line flex flex-col border-t">
                  {section.bullets.items.map((item) => (
                    <li key={item} className="border-line text-ink-muted border-b py-3 text-base/7">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      );

    case 'definitions':
      return (
        <>
          <h2 id={headingId} className="text-display-md font-display mb-8 font-normal md:mb-12">
            {section.heading}
          </h2>
          <dl className="grid gap-x-12 gap-y-2 md:grid-cols-2">
            {section.items.map((item, itemIndex) => (
              <MotionReveal
                key={item.title}
                index={itemIndex}
                className="border-line flex flex-col gap-2.5 border-t py-6"
              >
                <dt className="text-ink text-lg font-semibold">{item.title}</dt>
                <dd className="text-ink-muted text-base/7">{item.body}</dd>
              </MotionReveal>
            ))}
          </dl>
        </>
      );

    case 'steps':
      return (
        <>
          <h2 id={headingId} className="text-display-md font-display mb-8 font-normal md:mb-12">
            {section.heading}
          </h2>
          <ol className="border-line grid border-t md:grid-cols-2 xl:grid-cols-4">
            {section.items.map((item, itemIndex) => (
              <MotionReveal
                as="li"
                key={item.title}
                index={itemIndex}
                className="border-line flex flex-col gap-3 border-b py-8 md:px-6 md:py-10 md:first:pl-0 xl:border-r xl:last:border-r-0 xl:px-8 xl:first:pl-0"
              >
                <span
                  aria-hidden
                  className="text-display-accent font-display text-3xl leading-none"
                >
                  {String(itemIndex + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-xl font-normal">{item.title}</h3>
                <p className="text-ink-muted text-base/7">{item.body}</p>
              </MotionReveal>
            ))}
          </ol>
        </>
      );

    case 'list':
      return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <div className="flex flex-col gap-5">
            <h2 id={headingId} className="text-display-sm font-display font-normal">
              {section.heading}
            </h2>
            {section.note ? (
              <p className="text-ink-muted measure text-sm/6">{section.note}</p>
            ) : null}
          </div>
          <ul className="border-line grid border-t sm:grid-cols-2 sm:gap-x-10">
            {section.items.map((item) => (
              <li key={item} className="border-line text-ink border-b py-3.5 text-base/7">
                {item}
              </li>
            ))}
          </ul>
        </div>
      );

    case 'numbered':
      return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="flex flex-col gap-5">
            <h2 id={headingId} className="text-display-md font-display font-normal">
              {section.heading}
            </h2>
            {section.intro ? (
              <p className="text-ink-muted measure text-base/7">{section.intro}</p>
            ) : null}
          </div>
          <div className="flex flex-col gap-4">
            {section.note ? <p className="text-ink font-medium">{section.note}</p> : null}
            <ol className="border-line flex flex-col border-t">
              {section.items.map((item, itemIndex) => (
                <li key={item} className="border-line flex items-baseline gap-4 border-b py-3.5">
                  <span aria-hidden className="text-display-accent font-display text-lg">
                    {itemIndex + 1}
                  </span>
                  <span className="text-ink text-base/7">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      );
  }
}
