import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { client, urlFor } from '../lib/sanityClient'
import { JOURNALISM_BY_SLUG_QUERY } from '../lib/queries'

export default function JournalismPost() {
  const { slug } = useParams()
  const [item, setItem] = useState(null)

  useEffect(() => {
    client.fetch(JOURNALISM_BY_SLUG_QUERY, { slug }).then(setItem).catch(() => {})
  }, [slug])

  if (!item) return (
    <div style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', paddingBottom: '4rem', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '.75rem', color: 'var(--text-muted)', letterSpacing: '.1em' }}>
      Loading…
    </div>
  )

  return (
    <article style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Header */}
      <div style={{ background: 'var(--green-deep)', padding: '5rem 3rem 4rem' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Link to="/journalism" style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', marginBottom: '2rem', display: 'inline-block', borderBottom: '1px solid rgba(255,255,255,.2)', paddingBottom: 2 }}>
            ← Back to Journalism
          </Link>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
            {item.type} · {item.location} · {item.date && new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', color: 'var(--white)', lineHeight: .96, letterSpacing: '.02em' }}>
            {item.title}
          </h1>
        </div>
      </div>

      {/* Photos */}
      {item.photoUrls?.length > 0 && (
        <div style={{ background: 'var(--ink)', padding: '2rem 3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
          {item.photoUrls.map((url, i) => (
            <img key={i} src={url} alt="" style={{ width: '100%', height: 280, objectFit: 'cover', display: 'block' }} />
          ))}
        </div>
      )}

      {/* Body */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 3rem' }}>
        {item.body && (
          <div style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--ink-muted)', fontWeight: 300 }}>
            <PortableText value={item.body} />
          </div>
        )}
      </div>
    </article>
  )
}
