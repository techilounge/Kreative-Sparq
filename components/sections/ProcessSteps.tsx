import { MotionReveal } from '@/components/motion/MotionReveal';

type Step = {
  readonly number: string;
  readonly title: string;
  readonly body: string;
};

/**
 * A ruled sequence. The oversized numerals are the display accent colour, which
 * is only approved at this scale, and they carry the rhythm instead of icons.
 */
export function ProcessSteps({ steps }: { readonly steps: readonly Step[] }) {
  return (
    <ol className="border-line grid border-t md:grid-cols-2 xl:grid-cols-4">
      {steps.map((step, index) => (
        <MotionReveal
          as="li"
          key={step.number}
          index={index}
          className="border-line flex flex-col gap-3 border-b py-8 md:px-6 md:py-10 md:first:pl-0 xl:border-r xl:last:border-r-0 xl:px-8 xl:first:pl-0"
        >
          <span aria-hidden className="text-display-accent font-display text-4xl leading-none">
            {step.number}
          </span>
          <h3 className="font-display text-2xl font-normal">{step.title}</h3>
          <p className="text-ink-muted text-base/7">{step.body}</p>
        </MotionReveal>
      ))}
    </ol>
  );
}
