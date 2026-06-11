import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'daniyal-studio',
  title: 'Daniyal — Site Studio',
  projectId: 'jbv46j58',
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
