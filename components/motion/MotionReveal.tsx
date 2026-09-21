'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

type MotionRevealProps = {
  readonly children: ReactNode;
  /** Index within a group, used to stagger a sequence by 40 to 70 ms. */
  readonly index?: number;
  readonly as?: 'div' | 'li' | 'section' | 'article';
  readonly className?: string;
};

/**
 * A single reveal, run once when the element first enters the viewport.
 *
 * Reduced-motion visitors get an immediate opacity change with no translation,
 * and the static layout is complete without the animation ever running.
 */
export function MotionReveal({ children, index = 0, as = 'div', className }: MotionRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as];

  const delay = Math.min(index, 6) * 0.055;

  return (
    <Component
      data-motion-reveal=""
      className={className}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: '0px 0px -80px 0px' }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.55,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Component>
  );
}
