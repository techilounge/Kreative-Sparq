'use client';

import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * `reducedMotion="user"` makes every Motion component honour the operating
 * system preference: transforms are dropped and only opacity changes remain.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
