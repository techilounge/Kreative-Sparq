import type { ArticleBlock } from '@/content/articles';

/**
 * Renders an article from typed blocks rather than raw HTML, so the heading
 * order and list semantics are guaranteed and nothing unescaped can appear.
 */
export function ArticleBody({ blocks }: { readonly blocks: readonly ArticleBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, index) => {
        const key = `${block.kind}-${index}`;

        switch (block.kind) {
          case 'paragraph':
            return (
              <p key={key} className="text-ink measure text-base/8">
                {block.text}
              </p>
            );

          case 'heading':
            return (
              <h2 key={key} className="text-display-sm font-display mt-6 font-normal">
                {block.text}
              </h2>
            );

          case 'subheading':
            return (
              <h3 key={key} className="text-ink mt-2 text-lg font-semibold">
                {block.text}
              </h3>
            );

          case 'quote':
            return (
              <blockquote
                key={key}
                className="border-rule text-ink measure font-display border-l-2 pl-5 text-xl leading-relaxed"
              >
                {block.text}
              </blockquote>
            );

          case 'list':
            return (
              <div key={key} className="flex flex-col gap-3">
                {block.intro ? <p className="text-ink measure text-base/8">{block.intro}</p> : null}
                <ul className="border-line measure border-t">
                  {block.items.map((item) => (
                    <li key={item} className="border-line text-ink border-b py-2.5 text-base/7">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );

          case 'orderedList':
            return (
              <div key={key} className="flex flex-col gap-3">
                {block.intro ? <p className="text-ink measure text-base/8">{block.intro}</p> : null}
                <ol className="border-line measure border-t">
                  {block.items.map((item, itemIndex) => (
                    <li
                      key={item}
                      className="border-line flex items-baseline gap-4 border-b py-2.5"
                    >
                      <span aria-hidden className="text-display-accent font-display">
                        {itemIndex + 1}
                      </span>
                      <span className="text-ink text-base/7">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            );

          case 'comparison':
            return (
              <div key={key} className="flex flex-col gap-4">
                <p className="text-ink measure text-base/8">{block.intro}</p>
                <ul className="flex flex-col gap-3">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="border-line-strong text-ink measure border-l-2 py-1 pl-5 text-base/7 italic"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                {block.outro ? <p className="text-ink measure text-base/8">{block.outro}</p> : null}
              </div>
            );
        }
      })}
    </div>
  );
}
