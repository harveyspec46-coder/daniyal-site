export default {
  name: 'journalism',
  title: 'Journalism',
  type: 'document',
  fields: [
    { name: 'title',    title: 'Title',    type: 'string' },
    { name: 'slug',     title: 'Slug (URL)', type: 'slug', options: { source: 'title' } },
    { name: 'excerpt',  title: 'Short Excerpt', type: 'text', rows: 3 },
    { name: 'location', title: 'Location', type: 'string', description: 'e.g. "Karachi, Pakistan"' },
    { name: 'date',     title: 'Date',     type: 'date' },
    {
      name: 'type', title: 'Type', type: 'string',
      options: { list: ['Photo Essay', 'Field Report', 'Interview', 'Video'] }
    },
    {
      name: 'photos', title: 'Photos', type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Upload all field photos here'
    },
    {
      name: 'body', title: 'Full Story', type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } }
      ]
    },
  ],
  preview: {
    select: { title: 'title', media: 'photos.0', subtitle: 'location' }
  }
}
