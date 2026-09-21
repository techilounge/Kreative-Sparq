/**
 * Sanity document schemas, shaped to match the types in `content/`.
 *
 * Nothing in the running site imports this file. It is the definition a Sanity
 * Studio would use, kept beside the application so the two cannot drift: the
 * field names here are the field names `lib/content/source.ts` expects, so a
 * Sanity-backed source can be dropped in without touching a page.
 *
 * The publishing rules are enforced in the application, not here, because a
 * CMS field is guidance and a code path is not. What this file does is make
 * the requirements visible to whoever is filling the fields in.
 */

type Rule = {
  required: () => Rule;
  min: (value: number) => Rule;
  max: (value: number) => Rule;
  uri: (options: { scheme: readonly string[] }) => Rule;
};

export const caseStudy = {
  name: 'caseStudy',
  title: 'Case study',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (rule: Rule) => rule.required() },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'client',
      title: 'Client',
      type: 'string',
      description:
        'The client as they have agreed to be named. Leave empty and the case study cannot publish.',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'clientApproved',
      title: 'Client has approved this page',
      type: 'boolean',
      description: 'The page stays unpublished until this is true.',
      initialValue: false,
    },
    { name: 'summary', title: 'Summary', type: 'text', rows: 3 },
    { name: 'services', title: 'Services', type: 'array', of: [{ type: 'string' }] },
    { name: 'challenge', title: 'The business question', type: 'text', rows: 5 },
    { name: 'approach', title: 'What we did', type: 'text', rows: 5 },
    { name: 'outcome', title: 'What happened', type: 'text', rows: 5 },
    {
      name: 'results',
      title: 'Results',
      type: 'array',
      description:
        'Every result needs a source and the period it covers. A number without both does not go on the site.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'label', title: 'What it measures', type: 'string' },
            { name: 'period', title: 'Period', type: 'string' },
            { name: 'source', title: 'Source', type: 'string' },
            { name: 'context', title: 'Context', type: 'text', rows: 2 },
          ],
        },
      ],
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['draft', 'published'], layout: 'radio' },
      initialValue: 'draft',
    },
    { name: 'publishedAt', title: 'Published at', type: 'datetime' },
    { name: 'seoTitle', title: 'SEO title', type: 'string' },
    { name: 'seoDescription', title: 'SEO description', type: 'text', rows: 2 },
  ],
} as const;

export const article = {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (rule: Rule) => rule.required() },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule: Rule) => rule.required(),
    },
    { name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'A named person. An article does not publish without one.',
    },
    {
      name: 'editorialRequirement',
      title: 'Still needed before publishing',
      type: 'text',
      rows: 2,
      description:
        'What this piece is waiting on: a firsthand example, a verified figure, an approval.',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['draft', 'published'], layout: 'radio' },
      initialValue: 'draft',
    },
    { name: 'publishedAt', title: 'Published at', type: 'datetime' },
    { name: 'updatedAt', title: 'Updated at', type: 'datetime' },
    {
      name: 'relatedServices',
      title: 'Related services',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Service slugs. A slug with no matching service is reported by the content check.',
    },
    { name: 'seoTitle', title: 'SEO title', type: 'string' },
    { name: 'seoDescription', title: 'SEO description', type: 'text', rows: 2 },
  ],
} as const;

export const schemaTypes = [caseStudy, article];
