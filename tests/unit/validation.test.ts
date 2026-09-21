import { describe, expect, it } from 'vitest';

import { contactSchema, fieldErrors, projectBriefSchema } from '@/lib/validation/schemas';

const validContact = {
  name: '  Ada   Okafor ',
  email: 'ada@company.com',
  company: 'Company Name',
  phone: '+234 801 234 5678',
  service: 'Brand Strategy',
  message: 'We are launching a new service and need a clear position before November.',
  consent: 'on',
  website: '',
};

describe('contact validation', () => {
  it('accepts a complete submission and normalises whitespace', () => {
    const result = contactSchema.safeParse(validContact);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('Ada Okafor');
    }
  });

  it('rejects an invalid email with the approved message', () => {
    const result = contactSchema.safeParse({ ...validContact, email: 'not-an-email' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(fieldErrors(result.error)['email']).toBe('Enter a valid email address.');
    }
  });

  it('rejects a missing consent box', () => {
    const { consent: _consent, ...withoutConsent } = validContact;
    const result = contactSchema.safeParse(withoutConsent);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(fieldErrors(result.error)['consent']).toBe(
        'Confirm that we may use your details to respond.',
      );
    }
  });

  it('accepts an empty optional phone number but rejects junk', () => {
    expect(contactSchema.safeParse({ ...validContact, phone: '' }).success).toBe(true);
    expect(contactSchema.safeParse({ ...validContact, phone: 'call me' }).success).toBe(false);
  });

  it('rejects unexpected fields rather than ignoring them', () => {
    const result = contactSchema.safeParse({ ...validContact, isAdmin: 'true' });
    expect(result.success).toBe(false);
  });

  it('enforces a length limit on the message', () => {
    const result = contactSchema.safeParse({ ...validContact, message: 'x'.repeat(5000) });
    expect(result.success).toBe(false);
  });
});

const validProject = {
  name: 'Ada Okafor',
  email: 'ada@company.com',
  company: 'Company Name',
  serviceInterests: ['Brand Strategy', 'Creative Design'],
  goal: 'We need a clear position and a launch plan before the November product launch.',
  desiredStart: 'Within 30 days',
  consent: 'on',
  website: '',
};

describe('project brief validation', () => {
  it('accepts a complete brief', () => {
    expect(projectBriefSchema.safeParse(validProject).success).toBe(true);
  });

  it('requires at least one service interest', () => {
    const result = projectBriefSchema.safeParse({ ...validProject, serviceInterests: [] });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(fieldErrors(result.error)['serviceInterests']).toBe('Choose at least one option.');
    }
  });

  it('rejects a service interest outside the approved list', () => {
    const result = projectBriefSchema.safeParse({
      ...validProject,
      serviceInterests: ['Something else'],
    });
    expect(result.success).toBe(false);
  });

  it('rejects a start option outside the approved list', () => {
    const result = projectBriefSchema.safeParse({ ...validProject, desiredStart: 'Tomorrow' });
    expect(result.success).toBe(false);
  });

  it('treats marketing consent as optional', () => {
    const result = projectBriefSchema.safeParse({ ...validProject, marketingConsent: 'on' });
    expect(result.success).toBe(true);
  });
});
