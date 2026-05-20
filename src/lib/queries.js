// All data queries in one place.
// GROQ is Sanity's query language — reads like SQL but for documents.

// ── STATISTICS ───────────────────────────────────────────────────
export const FEATURED_STATS_QUERY = `
  *[_type == "statistic" && featured == true] | order(country asc) {
    _id, label, value, unit, country, source, year
  }
`

export const ALL_STATS_QUERY = `
  *[_type == "statistic"] | order(country asc, year desc) {
    _id, label, value, unit, country, source, year
  }
`

// ── BLOG POSTS ───────────────────────────────────────────────────
export const ALL_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, publishedAt, category, relatedCountry,
    "coverImageUrl": coverImage.asset->url,
    excerpt
  }
`

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, publishedAt, category, relatedCountry,
    "coverImageUrl": coverImage.asset->url,
    body
  }
`

// ── JOURNALISM ───────────────────────────────────────────────────
export const ALL_JOURNALISM_QUERY = `
  *[_type == "journalism"] | order(date desc) {
    _id, title, slug, date, location, type,
    "coverUrl": photos[0].asset->url,
    excerpt
  }
`

export const JOURNALISM_BY_SLUG_QUERY = `
  *[_type == "journalism" && slug.current == $slug][0] {
    _id, title, date, location, type,
    "photoUrls": photos[].asset->url,
    body
  }
`

// ── RESEARCH REPORTS ─────────────────────────────────────────────
export const ALL_RESEARCH_QUERY = `
  *[_type == "research"] | order(publishedAt desc) {
    _id, title, publisher, publishedAt, country, featured,
    "pdfUrl": pdfFile.asset->url,
    summary
  }
`

export const FEATURED_RESEARCH_QUERY = `
  *[_type == "research" && featured == true] | order(publishedAt desc) {
    _id, title, publisher, publishedAt, country,
    "pdfUrl": pdfFile.asset->url
  }
`

// ── INTERNATIONAL / SCP WORK ─────────────────────────────────────
export const ALL_SCP_QUERY = `
  *[_type == "scpWork"] | order(date desc) {
    _id, title, slug, date, workType,
    "coverUrl": coverImage.asset->url,
    summary
  }
`

export const SCP_BY_SLUG_QUERY = `
  *[_type == "scpWork" && slug.current == $slug][0] {
    _id, title, date, workType,
    "coverUrl": coverImage.asset->url,
    body
  }
`
