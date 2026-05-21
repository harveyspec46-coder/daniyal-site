import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { client } from '../lib/sanityClient'
import { POST_BY_SLUG_QUERY } from '../lib/queries'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    client.fetch(POST_BY_SLUG_QUERY, { slug }).then(setPost).catch(() => {})
  }, [slug])

  if (!post) return (
    <div style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', paddingBottom: '4rem', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '.75rem', color: 'var(--text-muted)', letterSpacing: '.1em' }}>
      Loading…
    </div>
  )

  return (
    <article style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Hero */}
      <div style={{ background: 'var(--green-deep)', padding: '5rem 3rem 4rem' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Link to="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', marginBottom: '2rem', display: 'inline-block', borderBottom: '1px solid rgba(255,255,255,.2)', paddingBottom: 2 }}>
            ← Back
          </Link>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
            {post.category} · {post.relatedCountry} · {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', color: 'var(--white)', lineHeight: .96, letterSpacing: '.02em' }}>
            {post.title}
          </h1>
        </div>
      </div>

      {post.coverImageUrl && (
        <img src={post.coverImageUrl} alt={post.title} style={{ width: '100%', maxHeight: 500, objectFit: 'cover' }} />
      )}

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 3rem' }}>
        {post.body && (
          <div style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--ink-muted)', fontWeight: 300 }}>
            <PortableText value={post.body} />
          </div>
        )}
      </div>
    </article>
  )
}
