export default {
  name: 'research',
  title: 'Research Reports',
  type: 'document',
  fields: [
    { name: 'title',     title: 'Report Title', type: 'string' },
    { name: 'publisher', title: 'Publisher',    type: 'string', description: 'e.g. "UNODC", "CDC", "WHO"' },
    { name: 'publishedAt', title: 'Published Date', type: 'date' },
    {
      name: 'country', title: 'Country / Region', type: 'string',
      options: { list: ['United States', 'Pakistan', 'Global'] }
    },
    { name: 'pdfFile', title: 'PDF File', type: 'file', description: 'Upload the PDF report here' },
    { name: 'externalUrl', title: 'Or External Link', type: 'url', description: 'If PDF is hosted externally' },
    {
      name: 'summary', title: 'Summary', type: 'array',
      of: [{ type: 'block' }]
    },
    { name: 'featured', title: 'Show on Homepage', type: 'boolean', initialValue: false },
  ],
  preview: {
    select: { title: 'title', subtitle: 'publisher' }
  }
}
