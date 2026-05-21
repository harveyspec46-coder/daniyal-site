export default {
  name: 'post',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug',  title: 'Slug (URL)', type: 'slug', options: { source: 'title' } },
    { name: 'excerpt', title: 'Short Excerpt', type: 'text', rows: 3 },
    { name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } },
    { name: 'publishedAt', title: 'Published Date', type: 'datetime' },
    {
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['Drug Addiction', 'Poverty', 'Policy', 'SCP Work', 'Pakistan', 'United States', 'Research'] }
    },
    {
      name: 'relatedCountry', title: 'Related Country', type: 'string',
      options: { list: ['United States', 'Pakistan', 'Both'] }
    },
    {
      name: 'body', title: 'Body Content', type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } }
      ]
    },
  ],
  preview: {
    select: { title: 'title', media: 'coverImage', subtitle: 'category' }
  }
}
