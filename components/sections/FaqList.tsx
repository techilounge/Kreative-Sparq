import type { ServiceFaq } from '@/content/services';

/**
 * FAQs stay open in the rendered HTML: every answer is visible text, which is
 * what search and screen readers both need. No FAQ structured data is emitted,
 * since the visible content is useful without chasing a rich result.
 */
export function FaqList({
  faqs,
  headingId,
}: {
  readonly faqs: readonly ServiceFaq[];
  readonly headingId: string;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
      <h2 id={headingId} className="text-display-md font-display font-normal">
        Frequently asked questions
      </h2>
      <dl className="border-line border-t">
        {faqs.map((faq) => (
          <div key={faq.question} className="border-line border-b py-6">
            <dt className="text-ink text-lg font-semibold">{faq.question}</dt>
            <dd className="text-ink-muted measure mt-2.5 text-base/7">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
