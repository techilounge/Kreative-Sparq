'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * False during server rendering and the first client render, true afterwards.
 *
 * `useSyncExternalStore` is the supported way to tell the two apart. Setting a
 * `mounted` flag from an effect would work, but it schedules a second render
 * pass that React 19 rightly flags as a cascading render.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
