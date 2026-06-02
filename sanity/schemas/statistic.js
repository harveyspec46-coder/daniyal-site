export default {
  name: 'statistic',
  title: 'Statistics',
  type: 'document',
  fields: [
    { name: 'label', title: 'Label', type: 'string', description: 'e.g. "Overdose Deaths Reported"' },
    { name: 'value', title: 'Value', type: 'string', description: 'e.g. "111,466" or "7M"' },
    { name: 'unit',  title: 'Unit',  type: 'string', description: 'e.g. "Deaths", "Users", "Per Day"' },
    {
      name: 'country', title: 'Country', type: 'string',
      options: { list: ['United States', 'Pakistan', 'Global'] }
    },
    { name: 'source', title: 'Source', type: 'string', description: 'e.g. "CDC / NCHS 2023"' },
    { name: 'year',   title: 'Year',   type: 'number' },
    { name: 'featured', title: 'Show on Homepage', type: 'boolean', initialValue: false },
  ],
  preview: {
    select: { title: 'label', subtitle: 'value' }
  }
}
