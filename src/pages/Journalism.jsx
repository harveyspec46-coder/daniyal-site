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

export default function Journalism() {
  const [items, setItems]     = useState(FALLBACK)
  const [filter, setFilter]   = useState('All')

  useEffect(() => {
    client.fetch(ALL_JOURNALISM_QUERY).then(d => { if (d?.length) setItems(d) }).catch(() => {})
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
              placeholderLabel="📷 Field Photography"
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
