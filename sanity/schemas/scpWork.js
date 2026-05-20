export default {
  name: 'scpWork',
  title: 'International Work (SCP)',
  type: 'document',
  fields: [
    { name: 'title',   title: 'Title', type: 'string' },
    { name: 'slug',    title: 'Slug (URL)', type: 'slug', options: { source: 'title' } },
    { name: 'summary', title: 'Short Summary', type: 'text', rows: 3 },
    { name: 'date',    title: 'Date', type: 'date' },
    {
      name: 'workType', title: 'Work Type', type: 'string',
      options: { list: ['Safeguarding', 'PSEA', 'Board Decision', 'Advocacy', 'Partnership', 'Policy'] }
    },
    { name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } },
    {
      name: 'body', title: 'Full Content', type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } }
      ]
    },
  ],
  preview: {
    select: { title: 'title', media: 'coverImage', subtitle: 'workType' }
  }
}
