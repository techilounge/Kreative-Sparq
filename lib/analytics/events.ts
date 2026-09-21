'use client';

import { track } from '@vercel/analytics';

/**
 * The approved conversion events.
 *
 * Payloads carry categorical values only. No name, email, phone number, message
 * body, or other personal data is ever sent to analytics; attribution lives on
 * the lead record instead.
 */
export type AnalyticsEvent =
  | { readonly name: 'book_call_click'; readonly properties?: { readonly location: string } }
  | { readonly name: 'booking_completed' }
  | { readonly name: 'project_brief_started' }
  | { readonly name: 'project_brief_submitted' }
  | { readonly name: 'contact_form_submitted' }
  | { readonly name: 'service_viewed'; readonly properties: { readonly service: string } }
  | { readonly name: 'case_study_viewed'; readonly properties: { readonly slug: string } }
  | { readonly name: 'case_study_cta_clicked'; readonly properties: { readonly slug: string } }
  | { readonly name: 'email_click' }
  | { readonly name: 'whatsapp_click' };

export function trackEvent(event: AnalyticsEvent): void {
  const properties = 'properties' in event ? event.properties : undefined;
  track(event.name, properties);
}
