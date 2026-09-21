import { brandStrategy } from './brand-strategy';
import { campaignsActivations } from './campaigns-activations';
import { contentSocialMedia } from './content-social-media';
import { creativeDesign } from './creative-design';
import { performanceMarketing } from './performance-marketing';
import type { Service, ServiceSlug } from './types';
import { webDesignDevelopment } from './web-design-development';

/**
 * Ordered as the copy deck lists them. This order drives navigation, the footer,
 * the home page overview, and the services index.
 */
export const services: readonly Service[] = [
  brandStrategy,
  creativeDesign,
  contentSocialMedia,
  performanceMarketing,
  webDesignDevelopment,
  campaignsActivations,
];

const serviceBySlug = new Map<ServiceSlug, Service>(
  services.map((service) => [service.slug, service]),
);

export function getService(slug: string): Service | undefined {
  return serviceBySlug.get(slug as ServiceSlug);
}

export function serviceHref(slug: ServiceSlug): string {
  return `/services/${slug}`;
}

export type { Service, ServiceSlug, ServiceSection, ServiceFaq, CallToAction } from './types';
