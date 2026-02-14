import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      initialValue: 'Professional Service',
    }),
    defineField({
      name: 'features',
      title: 'Features List',
      type: 'array',
      of: [{ 
        type: 'object',
        fields: [
          {name: 'text', type: 'string', title: 'Feature Text'},
          {name: 'icon', type: 'string', title: 'Icon Name (Lucide)', initialValue: 'Palette'}
        ]
      }]
    }),
    defineField({
      name: 'icon',
      title: 'Main Icon Name (Lucide)',
      type: 'string',
      description: 'e.g. Paintbrush, Home, Building2',
      initialValue: 'Paintbrush',
    }),
    defineField({
        name: 'image',
        title: 'Service Image',
        type: 'image',
        options: { hotspot: true },
    }),
  ],
})
