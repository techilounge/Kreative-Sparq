import type { Service } from './types';

export const creativeDesign: Service = {
  slug: 'creative-design',
  name: 'Creative Design',
  seo: {
    title: 'Creative Design and Brand Identity in Nigeria | Kreative Sparq',
    description:
      'Build a distinctive, practical brand identity and campaign design system with Kreative Sparq, a creative design agency in Nigeria.',
    ogTitle: 'Design people recognise and teams can use.',
  },
  hero: {
    h1: 'Make the brand recognisable before the name is read.',
    body: 'We create identity and campaign design systems that hold together across real work, from a phone screen and sales deck to packaging, print, outdoor media, and live environments.',
    primaryCta: { label: 'Discuss a design project', href: '/start-a-project' },
    secondaryCta: { label: 'See selected work', href: '/work' },
  },
  home: {
    description:
      'Create a visual system people can recognise and your team can use consistently across real marketing work.',
    linkLabel: 'Strengthen your visual identity',
  },
  overview: {
    summary:
      'Identity systems and campaign design built to work across the places customers actually meet the brand.',
    bestFor:
      'New visual identities, rebrands, campaign creative, presentations, print, and digital design systems.',
    linkLabel: 'Explore Creative Design',
  },
  finderSymptom: 'The brand looks inconsistent or dated.',
  sections: [
    {
      kind: 'prose',
      heading: 'A visual identity has to do more than look good at launch.',
      body: [
        'It needs enough character to be remembered and enough discipline to stay consistent. It should help internal teams make decisions, give external partners useful rules, and adapt without losing the brand.',
      ],
      bullets: {
        intro: 'We can help when:',
        items: [
          'The current identity no longer reflects the business.',
          'Visual materials change from one channel or supplier to the next.',
          'The brand is new and needs a complete starting system.',
          'Campaign ideas are being weakened by inconsistent execution.',
          'The team needs templates without making everything look templated.',
          'A rebrand must protect useful recognition while fixing real limitations.',
        ],
      },
    },
    {
      kind: 'definitions',
      heading: 'Capabilities',
      items: [
        {
          title: 'Brand identity',
          body: 'Logo systems, colour, typography, graphic language, imagery direction, iconography, layout principles, and usage rules.',
        },
        {
          title: 'Campaign creative',
          body: 'Creative concepts and adaptable visual systems for paid media, social, print, outdoor, events, email, and landing pages.',
        },
        {
          title: 'Marketing design',
          body: 'Sales decks, reports, brochures, event materials, social templates, digital advertising, and internal communication assets.',
        },
        {
          title: 'Packaging and physical touchpoints',
          body: 'Packaging direction, labels, merchandise, signage, environmental graphics, and production-ready artwork within the agreed scope.',
        },
        {
          title: 'Design systems and templates',
          body: 'Reusable components and templates that help internal teams move faster without pulling the brand apart.',
        },
      ],
    },
    {
      kind: 'list',
      heading: 'What you receive',
      items: [
        'Creative direction and visual territories',
        'Primary and secondary logo assets, when identity is in scope',
        'Colour and typography specifications',
        'Image and art-direction guidance',
        'Core brand applications',
        'Campaign or channel templates',
        'Concise brand guidelines',
        'Organised source and export files',
        'Handover session for the people using the system',
      ],
    },
    {
      kind: 'steps',
      heading: 'The design process',
      items: [
        {
          title: 'Set the brief',
          body: 'We define the audience, communication job, required applications, technical constraints, and approval process before exploring a direction.',
        },
        {
          title: 'Explore with purpose',
          body: 'Early routes show distinct ways to solve the brief. Each route has a rationale, not a pile of disconnected references.',
        },
        {
          title: 'Build the system',
          body: 'Once the direction is chosen, we develop the rules, test the identity across key touchpoints, and correct weaknesses before handover.',
        },
        {
          title: 'Prepare for use',
          body: 'We organise the assets, document the decisions, and show the team how to apply the system without needing a designer for every small task.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Do you design logos on their own?',
      answer:
        'We can take on a focused logo assignment when the brand direction is already clear. If the positioning, audience, or message is unresolved, we will recommend a broader identity or strategy scope so the logo is not being asked to solve the wrong problem.',
    },
    {
      question: 'How many concepts will we receive?',
      answer:
        'The proposal will state the number of creative routes. We prefer a small number of well-developed directions over many superficial options. The goal is to make a good decision, not to create a catalogue.',
    },
    {
      question: 'Will we receive editable files?',
      answer:
        'Yes. The agreed handover will include appropriate source files, export formats, font information, and usage guidance. Licensing terms for fonts, photography, illustration, or other third-party assets will be made clear.',
    },
    {
      question: 'Can you work with our internal team or printer?',
      answer:
        'Yes. We can prepare production files, brief partners, review proofs, and support implementation. Any ongoing production oversight will be defined in the scope.',
    },
  ],
  relatedServices: ['brand-strategy', 'content-social-media', 'campaigns-activations'],
  cta: {
    heading: 'Give the brand a system, not a collection of files.',
    body: 'Tell us where the identity needs to work and what is currently getting in the way.',
    primaryCta: { label: 'Start a creative project', href: '/start-a-project' },
    secondaryCta: { label: 'Book a strategy call', href: '/book' },
  },
};
