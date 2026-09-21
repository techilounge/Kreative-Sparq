export const contactContent = {
  seo: {
    title: 'Contact Kreative Sparq | Marketing Agency in Nigeria',
    description:
      'Contact Kreative Sparq about brand strategy, creative design, social media, advertising, websites, launches, or marketing support.',
  },
  hero: {
    h1: 'Tell us what you are working on.',
    body: 'You do not need a finished brief. Share the business, the challenge, and what you hope will change. We will ask the questions needed to find the right next step.',
    alternativeCta: {
      text: 'Prefer to talk?',
      label: 'Book a strategy call.',
      href: '/book',
    },
  },
  details: {
    emailLabel: 'Email',
    phoneLabel: 'Phone or WhatsApp',
    serviceAreaLabel: 'Service area',
    serviceArea:
      'Nigeria, with remote collaboration available for diaspora and international teams.',
    responseLabel: 'Response expectation',
  },
  form: {
    heading: 'Send an inquiry',
    intro: 'A few useful details will help us route your message to the right person.',
    fields: {
      name: {
        label: 'Full name',
        placeholder: 'Ada Okafor',
        error: 'Enter your name.',
      },
      email: {
        label: 'Work email',
        placeholder: 'ada@company.com',
        errorEmpty: 'Enter your email address.',
        errorInvalid: 'Enter a valid email address.',
      },
      company: {
        label: 'Company or organisation',
        placeholder: 'Company name',
        error: 'Enter your company or organisation.',
      },
      phone: {
        label: 'Phone or WhatsApp number',
        help: 'Optional. Include the country code if you are outside Nigeria.',
        error: 'Enter a valid phone number or leave this field blank.',
      },
      service: {
        label: 'What can we help with?',
        placeholder: 'Select a service',
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
        error: 'Choose the closest option.',
      },
      message: {
        label: 'What are you trying to achieve?',
        placeholder: 'Tell us about the business, the challenge, and any important timing.',
        help: 'Please do not include passwords, financial details, or other sensitive information.',
        error: 'Add a short description of what you need.',
      },
      consent: {
        label:
          'I agree that Kreative Sparq may use these details to respond to my inquiry, as described in the Privacy Policy.',
        error: 'Confirm that we may use your details to respond.',
      },
    },
    submit: 'Send inquiry',
    submitting: 'Sending your inquiry…',
    validationSummaryHeading: 'Check the highlighted fields.',
    rateLimitError:
      'We have received several requests from this connection. Wait a few minutes, then try again.',
    spamError: 'We could not verify this submission. Refresh the page and try again.',
  },
  reassurance: {
    heading: 'What happens next?',
    body: 'We review the inquiry, check whether the assignment fits our capabilities and availability, and reply with the most useful next step. That may be a short call, a request for more context, or an honest recommendation to take a different route.',
  },
  /** Shown when no lead destination is configured, so the form is not exposed. */
  unavailable: {
    heading: 'The inquiry form is not accepting messages yet.',
    body: 'We will not show a form that could lose your message. Book a strategy call and we will pick the conversation up there.',
    cta: { label: 'Book a strategy call', href: '/book' },
  },
} as const;
