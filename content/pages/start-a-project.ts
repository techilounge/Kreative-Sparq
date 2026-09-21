export const startProjectContent = {
  seo: {
    title: 'Start a Marketing Project | Kreative Sparq',
    description:
      'Tell Kreative Sparq about your business, marketing challenge, timing, and project needs through a focused project brief.',
  },
  hero: {
    h1: 'Give us the useful version of the brief.',
    body: 'This should take less than three minutes. Share what you know. If a question is still open, say so.',
  },
  /** `{{CURRENT_STEP}}` is resolved at render time. Total is fixed at five. */
  progressLabel: (currentStep: number) => `Step ${currentStep} of 5`,
  totalSteps: 5,
  steps: [
    {
      id: 'about-you',
      name: 'About you',
      heading: 'Who should we speak with?',
      body: 'We will use these details only to review and respond to the project inquiry.',
      button: 'Continue to services',
    },
    {
      id: 'services',
      name: 'What you may need',
      heading: 'Which areas are relevant?',
      body: 'Choose as many as apply. It is fine to select “Not sure yet.”',
      button: 'Continue to the brief',
    },
    {
      id: 'business-question',
      name: 'The business question',
      heading: 'What needs to change?',
      body: 'Describe the situation, the audience, what you have tried, and what a useful outcome would look like.',
      button: 'Continue to timing and budget',
    },
    {
      id: 'timing-budget',
      name: 'Timing and budget',
      heading: 'What constraints should we plan around?',
      body: '',
      button: 'Review your brief',
    },
    {
      id: 'review',
      name: 'Review and send',
      heading: 'Check the details before sending.',
      body: 'You can go back and edit any section. After submission, we will send a copy to your email.',
      button: 'Send project brief',
    },
  ],
  fields: {
    name: { label: 'Full name', error: 'Enter your name.' },
    email: {
      label: 'Work email',
      errorEmpty: 'Enter your email address.',
      errorInvalid: 'Enter a valid email address.',
    },
    phone: {
      label: 'Phone or WhatsApp number',
      optionalSuffix: '(optional)',
      error: 'Enter a valid phone number or leave this field blank.',
    },
    company: { label: 'Company or organisation', error: 'Enter your company or organisation.' },
    role: { label: 'Your role', optionalSuffix: '(optional)' },
    websiteUrl: { label: 'Website or social link', optionalSuffix: '(optional)' },
    serviceInterests: {
      options: [
        'Brand Strategy',
        'Creative Design',
        'Content & Social Media',
        'Performance Marketing',
        'Web Design & Development',
        'Campaigns & Activations',
        'Ongoing Marketing Support',
        'Not sure yet',
      ],
      error: 'Choose at least one option.',
    },
    goal: {
      placeholder:
        'For example: We are launching a new service in November. People understand the category, but our offer sounds similar to three established competitors. We need a clear position, launch message, landing page, and campaign plan.',
      help: 'A few direct sentences are more useful than formal language.',
      error: 'Tell us enough to understand the challenge.',
    },
    desiredStart: {
      label: 'When would you like to begin?',
      options: [
        'As soon as practical',
        'Within 30 days',
        'In 1 to 3 months',
        'In 3 to 6 months',
        'Later or not decided',
      ],
      error: 'Choose the closest option.',
    },
    targetDate: {
      label: 'Is there a fixed launch or event date?',
      help: 'Optional. Add the date and explain what makes it fixed.',
    },
    budgetBand: {
      label: 'What budget has been set aside?',
      /** Approved bands come from settings. This option is always present. */
      permanentOption: 'Not decided yet',
    },
    decisionMakers: {
      label: 'Who will approve the work?',
      help: 'Role names are enough at this stage.',
    },
    consent: {
      label:
        'I agree that Kreative Sparq may use these details to assess and respond to this project inquiry, as described in the Privacy Policy.',
      error: 'Confirm that we may use your details to respond.',
    },
    marketingConsent: {
      label:
        'Send me occasional marketing notes from Kreative Sparq. I can unsubscribe at any time.',
    },
  },
  submitting: 'Sending your brief…',
  successRedirect: '/thank-you?type=project',
  navigation: {
    back: 'Back',
    savedState: 'Your progress is saved on this device for this session.',
    restoreMessage: 'We found an unfinished brief. Continue where you stopped?',
    restoreContinue: 'Continue brief',
    restoreStartAgain: 'Start again',
    sessionExpiry: 'This draft has expired. Start a new project brief.',
    validationSummaryHeading: 'Check the highlighted fields.',
    networkError:
      'We could not send the brief. Your answers are still here. Check your connection and try again.',
  },
  privacyNote:
    'Do not request passwords, bank details, government identification numbers, confidential customer data, or unannounced commercial information through this form. Sensitive files should be exchanged only after an approved secure method is in place.',
  reviewHeadings: {
    aboutYou: 'About you',
    services: 'What you may need',
    businessQuestion: 'The business question',
    timingBudget: 'Timing and budget',
    edit: 'Edit',
    notProvided: 'Not provided',
  },
  unavailable: {
    heading: 'The project brief is not accepting submissions yet.',
    body: 'We will not show a form that could lose your brief. Book a strategy call and we will pick the conversation up there.',
    cta: { label: 'Book a strategy call', href: '/book' },
  },
} as const;
