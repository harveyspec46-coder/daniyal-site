import { useState, useEffect } from 'react'
import { client, urlFor } from '../lib/sanityClient'
import { ALL_JOURNALISM_QUERY } from '../lib/queries'
import PageHero from '../components/PageHero'
import ArticleCard from '../components/ArticleCard'

const TYPES = ['All', 'Photo Essay', 'Field Report', 'Interview', 'Video']

const FALLBACK = [
  { _id: '1', title: 'Life at the Margins: Drug Addiction on the Streets of Karachi', excerpt: 'A field documentation series bringing into focus the lived reality of Pakistan drug crisis.', location: 'Karachi', date: '2024-05-01', type: 'Photo Essay', slug: { current: '#' } },
  { _id: '2', title: 'The Daily Count: 700 Deaths in a Day', excerpt: 'What does an estimated 700 daily deaths look like on the ground? A field report from the front line.', location: 'Karachi', date: '2024-04-01', type: 'Field Report', slug: { current: '#' } },
  { _id: '3', title: 'Voices of the Crisis: Three Interviews on Addiction, Faith and Survival', excerpt: 'Three individuals speak about addiction, recovery, and the systems that failed them.', location: 'Karachi', date: '2024-03-01', type: 'Interview', slug: { current: '#' } },
  { _id: '4', title: 'Poverty and Addiction: Documenting the Overlap', excerpt: 'Field photography tracing the intersection of extreme poverty and substance abuse in urban Pakistan.', location: 'Karachi', date: '2024-02-01', type: 'Photo Essay', slug: { current: '#' } },
  { _id: '5', title: 'Family Systems in Crisis: When Addiction Hits Home', excerpt: 'An interview series with families navigating addiction without institutional support.', location: 'Lahore', date: '2024-01-01', type: 'Interview', slug: { current: '#' } },
  { _id: '6', title: 'Street Evidence: Visual Documentation of Pakistan Drug Crisis', excerpt: 'A photo essay compiled from months of field work across Karachi and Lahore.', location: 'Lahore', date: '2023-12-01', type: 'Photo Essay', slug: { current: '#' } },
]

// Photo gallery item component
function GalleryPhoto({ url, caption, index }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', aspectRatio: index === 0 ? '16/9' : '4/3', gridColumn: index === 0 ? 'span 2' : 'auto' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {url ? (
        <img src={url} alt={caption || 'Field photo'} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s', transform: hover ? 'scale(1.04)' : 'scale(1)' }} />
      ) : (
        <div style={{ width: '100%', height: '100%', background: 'var(--green-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '.5rem', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: .12, backgroundImage: 'repeating-linear-gradient(45deg, var(--green-light) 0, var(--green-light) 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)', position: 'relative', zIndex: 1 }}>Field Photo {index + 1}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.55rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,.2)', position: 'relative', zIndex: 1 }}>Upload via Sanity Studio</div>
        </div>
      )}
      {hover && caption && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(15,26,20,.85)', padding: '.8rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.08em', color: 'rgba(255,255,255,.8)', textTransform: 'uppercase' }}>
          {caption}
        </div>
      )}
    </div>
  )
}

export default function Journalism() {
  const [items, setItems]   = useState(FALLBACK)
  const [filter, setFilter] = useState('All')
  const [gallery, setGallery] = useState([])
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    client.fetch(ALL_JOURNALISM_QUERY).then(d => {
      if (d?.length) {
        setItems(d)
        // Collect all photos from all journalism items for gallery
        const allPhotos = d.flatMap(item =>
          (item.photoUrls || []).map(url => ({ url, caption: item.location + ' — ' + item.title }))
        )
        if (allPhotos.length) setGallery(allPhotos.slice(0, 10))
      }
    }).catch(() => {})
  }, [])

  const filtered = filter === 'All' ? items : items.filter(i => i.type === filter)

  // Placeholder gallery slots (shown when no real photos uploaded yet)
  const gallerySlots = gallery.length > 0 ? gallery : Array.from({ length: 8 }, (_, i) => ({ url: null, caption: null, index: i }))

  return (
    <>
      <PageHero
        eyebrow="Field Documentation · Karachi, Pakistan"
        title="JOURNALISM"
        titleAccent="& FIELD WORK"
        subtitle="Photo essays, field reports, and interviews documenting the drug addiction crisis from the ground up."
      />

      {/* PHOTO GALLERY */}
      <section style={{ background: 'var(--ink)', padding: '5rem 3rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="section-tag" style={{ color: 'var(--gold-light)' }}>Visual Evidence</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,4vw,3.5rem)', color: 'var(--white)', letterSpacing: '.02em', lineHeight: .96 }}>
              FIELD<br />PHOTOGRAPHY
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.1em', color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', maxWidth: 280, lineHeight: 1.8 }}>
            Upload your field photos via Sanity Studio to populate this gallery. Up to 10 photos displayed.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
          {gallerySlots.map((photo, i) => (
            <GalleryPhoto key={i} url={photo.url} caption={photo.caption} index={i} />
          ))}
        </div>

        {/* Lightbox */}
        {lightbox !== null && (
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.92)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
            onClick={() => setLightbox(null)}
          >
            <img src={gallerySlots[lightbox]?.url} alt="" style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain' }} />
            <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '1.5rem', right: '2rem', color: '#fff', fontSize: '2rem', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
          </div>
        )}
      </section>

      {/* ARTICLES */}
      <section style={{ background: 'var(--cream)', padding: '5rem 3rem' }}>
        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '3rem', borderBottom: '1px solid var(--cream-dark)', paddingBottom: '1.5rem' }}>
          {TYPES.map(type => (
            <button key={type} onClick={() => setFilter(type)} style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', padding: '.5rem 1.2rem', border: filter === type ? '1px solid var(--green-mid)' : '1px solid var(--cream-dark)', background: filter === type ? 'var(--green-deep)' : 'transparent', color: filter === type ? 'var(--white)' : 'var(--text-muted)', cursor: 'pointer', transition: 'all .2s' }}>
              {type}
            </button>
          ))}
        </div>

        <div className="cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
          {filtered.map(item => (
            <ArticleCard
              key={item._id}
              to={'/journalism/' + (item.slug?.current || '#')}
              imageUrl={item.coverUrl}
              category={item.type + ' · ' + item.location}
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
