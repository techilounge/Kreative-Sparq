import { emailConfigured } from '@/lib/email';
import { leadStoreConfigured } from '@/lib/lead-store';

/**
 * A form is only rendered when something durable will receive the submission.
 * Showing an active form with no destination would quietly discard inquiries.
 */
export const leadDestinationConfigured = leadStoreConfigured || emailConfigured;
