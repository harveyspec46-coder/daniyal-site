import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'daniyal-studio',
  title: 'Daniyal — Site Studio',
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID',
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
