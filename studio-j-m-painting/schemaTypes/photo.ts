import { defineField, defineType } from 'sanity'

export const photo = defineType({
  name: 'photo',
  title: 'Project Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette', 'exif'],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'owner',
      title: 'Uploaded By',
      type: 'reference',
      to: [{ type: 'userProfile' }],
      validation: (rule) => rule.required(),
      // readOnly: true, // Removed to allow manual selection by Admin
      description: 'The user who uploaded this photo.',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Residential', value: 'Residential' },
          { title: 'Commercial', value: 'Commercial' },
        ],
        layout: 'radio',
      },
      initialValue: 'Residential',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'uploadedAt',
      title: 'Uploaded At',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'owner.username',
      media: 'image',
    },
  },
})
