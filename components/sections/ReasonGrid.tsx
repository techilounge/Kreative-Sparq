import { MotionReveal } from '@/components/motion/MotionReveal';

type Reason = {
  readonly title: string;
  readonly body: string;
};

/** Top-ruled columns rather than cards, so the section keeps the page's grid. */
export function ReasonGrid({ items }: { readonly items: readonly Reason[] }) {
  return (
    <ul className="grid gap-x-10 gap-y-2 md:grid-cols-2">
      {items.map((item, index) => (
        <MotionReveal
          as="li"
          key={item.title}
          index={index}
          className="border-line flex flex-col gap-2.5 border-t py-6"
        >
          <h3 className="text-ink text-lg font-semibold">{item.title}</h3>
          <p className="text-ink-muted text-base/7">{item.body}</p>
        </MotionReveal>
      ))}
    </ul>
  );
}
