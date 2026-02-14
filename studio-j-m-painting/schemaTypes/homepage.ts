import { defineField, defineType } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'The Artisanal Standard',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      initialValue: 'Residential & Commercial Painting',
    }),
    defineField({
      name: 'heroButtonText',
      title: 'Hero Button Text',
      type: 'string',
      initialValue: 'View Our Work',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'The large main image on the homepage.',
    }),
    defineField({
        name: 'aboutHeading',
        title: 'About Section Heading',
        type: 'string',
        initialValue: 'Distinctive Curation',
    }),
    defineField({
        name: 'aboutText',
        title: 'About Section Text',
        type: 'text',
        rows: 4,
        description: 'The main introductory text below the hero.',
    }),
    defineField({
      name: 'showcaseProjects',
      title: 'Showcase Projects (Masonry)',
      description: 'Select exactly which projects to display in the "Selected Projects" section (Black Overlay). If empty, shows newest projects.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'photo' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
    },
    prepare({ title }) {
      return {
        title: title || 'Homepage Settings',
        subtitle: 'Main Page Content',
      }
    },
  },
})
