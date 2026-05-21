import { useState, useEffect } from 'react'
import { client } from '../lib/sanityClient'
import { ALL_JOURNALISM_QUERY } from '../lib/queries'
import PageHero from '../components/PageHero'
import ArticleCard from '../components/ArticleCard'

const TYPES = ['All', 'Photo Essay', 'Field Report', 'Interview', 'Video']

const FALLBACK = [
  { _id: '1', title: 'Life at the Margins: Addiction on the Streets of Karachi', excerpt: 'A field documentation series bringing into focus the lived reality of Pakistan\'s drug crisis.', location: 'Karachi', date: '2024-05-01', type: 'Photo Essay', slug: { current: 'life-at-margins' } },
  { _id: '2', title: 'The Daily Count: 700 Deaths in a Day', excerpt: 'What does an estimated 700 daily deaths look like on the ground? A field report from the front line.', location: 'Karachi', date: '2024-04-01', type: 'Field Report', slug: { current: 'daily-count' } },
  { _id: '3', title: 'Voices of the Crisis: Three Interviews on Addiction, Faith & Survival', excerpt: 'Three individuals speak about addiction, recovery, and the systems that failed them.', location: 'Karachi', date: '2024-03-01', type: 'Interview', slug: { current: 'voices-crisis' } },
  { _id: '4', title: 'Poverty & Addiction: Documenting the Overlap', excerpt: 'Field photography tracing the intersection of extreme poverty and substance abuse in urban Pakistan.', location: 'Karachi', date: '2024-02-01', type: 'Photo Essay', slug: { current: 'poverty-addiction' } },
  { _id: '5', title: 'Family Systems in Crisis: When Addiction Hits Home', excerpt: 'An interview series with families navigating addiction without institutional support.', location: 'Lahore', date: '2024-01-01', type: 'Interview', slug: { current: 'family-systems' } },
  { _id: '6', title: 'Street Evidence: Visual Documentation of Pakistan\'s Drug Crisis', excerpt: 'A photo essay compiled from months of field work across Karachi and Lahore.', location: 'Lahore', date: '2023-12-01', type: 'Photo Essay', slug: { current: 'street-evidence' } },
]

// Placeholder gallery images — replace these URLs with real Sanity image URLs
const GALLERY_IMAGES = [
  { id: 1, caption: 'Field Documentation · Karachi' },
  { id: 2, caption: 'Karachi Streets · 2024' },
  { id: 3, caption: 'Community Outreach · 2024' },
  { id: 4, caption: 'Field Work · Pakistan' },
  { id: 5, caption: 'Documentation Session' },
  { id: 6, caption: 'Crisis on the Ground' },
  { id: 7, caption: 'Lahore · 2023' },
  { id: 8, caption: 'Urban Documentation' },
  { id: 9, caption: 'Field Interview · 2024' },
]

export default function Journalism() {
  const [items, setItems]   = useState(FALLBACK)
  const [filter, setFilter] = useState('All')
  const [galleryImages, setGalleryImages] = useState([])

  useEffect(() => {
    client.fetch(ALL_JOURNALISM_QUERY).then(d => { if (d?.length) setItems(d) }).catch(() => {})
    // Fetch gallery images from Sanity if you have a gallery schema
    // client.fetch(GALLERY_QUERY).then(d => { if (d?.length) setGalleryImages(d) }).catch(() => {})
  }, [])

  const filtered = filter === 'All' ? items : items.filter(i => i.type === filter)

  return (
    <>
      <PageHero
        eyebrow="Field Documentation · Karachi, Pakistan"
        title="JOURNALISM"
        titleAccent="& FIELD WORK"
        subtitle="Photo essays, field reports, and interviews documenting the drug addiction crisis from the ground up."
      />

      {/* ── PHOTO GALLERY ── */}
      <section style={{ background: 'var(--ink)', padding: 'var(--section-pad)' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="section-tag" style={{ color: 'var(--gold-light)' }}>Field Photography</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,3rem)', color: 'var(--white)', letterSpacing: '.02em' }}>
            FROM THE GROUND
          </h2>
          <p style={{ fontSize: '.88rem', color: 'rgba(255,255,255,.45)', fontWeight: 300, marginTop: '.6rem' }}>
            Visual documentation from field operations across Karachi and Lahore.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 3,
        }}>
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={img.id}
              style={{
                position: 'relative',
                aspectRatio: i === 0 || i === 4 ? '2 / 1' : '1 / 1',
                gridColumn: i === 0 || i === 4 ? 'span 2' : 'span 1',
                background: 'rgba(255,255,255,.05)',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.querySelector('.gallery-overlay').style.opacity = '1'
              }}
              onMouseLeave={e => {
                e.currentTarget.querySelector('.gallery-overlay').style.opacity = '0'
              }}
            >
              {/* If img.url exists from Sanity, show real image; otherwise show placeholder */}
              {img.url ? (
                <img src={img.url} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ) : (
                <div style={{
                  width: '100%', height: '100%', minHeight: 200,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  background: `linear-gradient(135deg, rgba(255,255,255,.04) 0%, rgba(255,255,255,.01) 100%)`,
                  borderLeft: '2px solid rgba(201,168,76,.2)',
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '.5rem', opacity: .3 }}>📷</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.55rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,.2)' }}>
                    Upload via Sanity
                  </div>
                </div>
              )}

              {/* Hover overlay */}
              <div className="gallery-overlay" style={{
                position: 'absolute', inset: 0,
                background: 'rgba(15,26,20,.75)',
                display: 'flex', alignItems: 'flex-end',
                padding: '1.2rem',
                opacity: 0,
                transition: 'opacity .25s',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gold-light)' }}>
                  {img.caption}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.2)', textAlign: 'right' }}>
          Upload photos through your Sanity Studio to populate this gallery
        </div>
      </section>

      {/* ── ARTICLES ── */}
      <section style={{ background: 'var(--cream)', padding: 'var(--section-pad)' }}>
        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '3rem', borderBottom: '1px solid var(--cream-dark)', paddingBottom: '1.5rem' }}>
          {TYPES.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '.65rem',
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                padding: '.4rem 1rem',
                border: filter === type ? '1px solid var(--green-mid)' : '1px solid var(--cream-dark)',
                background: filter === type ? 'var(--green-deep)' : 'transparent',
                color: filter === type ? 'var(--white)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all .2s',
              }}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
          {filtered.map(item => (
            <ArticleCard
              key={item._id}
              to={`/journalism/${item.slug?.current}`}
              imageUrl={item.coverUrl}
              category={`${item.type} · ${item.location}`}
              title={item.title}
              excerpt={item.excerpt}
              meta={item.date ? new Date(item.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''}
              placeholderLabel="Field Photography"
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '.75rem', letterSpacing: '.1em', textTransform: 'uppercase' }}>
            No items found for this filter.
          </div>
        )}
      </section>
    </>
  )
}
