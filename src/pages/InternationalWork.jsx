import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { client } from '../lib/sanityClient'
import { ALL_SCP_QUERY } from '../lib/queries'
import PageHero from '../components/PageHero'
import ArticleCard from '../components/ArticleCard'

const FALLBACK = [
  { _id: '1', title: 'Establishing PSEA Frameworks Across SCP Regional Operations', summary: 'Leading the design of Protection from Sexual Exploitation and Abuse protocols bridging global standards with local implementation.', date: '2024-04-01', workType: 'PSEA', slug: { current: '#' } },
  { _id: '2', title: 'Board Governance: Safeguarding at the Highest Level', summary: 'How board-level accountability shapes the nonprofit commitment to ethical operations across Pakistan and the US.', date: '2024-03-01', workType: 'Safeguarding', slug: { current: '#' } },
  { _id: '3', title: 'Connecting Ground Data to US Policy Conversations', summary: 'Field findings from Pakistan presented to SCP stakeholders to inform US-facing advocacy and awareness work.', date: '2024-02-01', workType: 'Advocacy', slug: { current: '#' } },
  { _id: '4', title: 'SCP Partnership: Expanding the International Network', summary: 'Building relationships with international organizations to expand SCP\'s reach and impact across affected communities.', date: '2024-01-01', workType: 'Partnership', slug: { current: '#' } },
]

export default function InternationalWork() {
  const [items, setItems] = useState(FALLBACK)

  useEffect(() => {
    client.fetch(ALL_SCP_QUERY).then(d => { if (d?.length) setItems(d) }).catch(() => {})
  }, [])

  return (
    <>
      <PageHero
        eyebrow="Sawyer Culberson Project · 501(c)(3) · United States"
        title="INTERNATIONAL"
        titleAccent="WORK"
        subtitle="Board-level governance, safeguarding, and global advocacy connecting Pakistan and the United States."
      />

      {/* ── SCP intro band ── */}
      <section style={{ background: 'var(--gold)', padding: '4rem 3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--green-deep)', marginBottom: '.8rem' }}>About SCP</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: 'var(--ink)', letterSpacing: '.02em', lineHeight: .96, marginBottom: '1.2rem' }}>
            SAWYER CULBERSON<br />PROJECT · 501(c)(3)
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(15,26,20,.7)', lineHeight: 1.9, fontWeight: 300 }}>
            A US-based nonprofit committed to drug addiction awareness, prevention, and community support — with international field operations and advocacy work bridging Pakistan and the United States.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {[
            ['My Role', 'Secretary, Board of Directors'],
            ['Appointed', 'February 2024'],
            ['Focus Areas', 'Safeguarding · PSEA · Policy Advocacy · Field Research'],
            ['Location', 'Karachi, Pakistan ↔ United States'],
            ['Status', 'Active · 501(c)(3) Registered'],
          ].map(([label, value]) => (
            <div key={label} style={{ display: 'flex', gap: '1.2rem', alignItems: 'baseline', paddingBottom: '1rem', borderBottom: '1px solid rgba(15,26,20,.12)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(15,26,20,.5)', width: 110, flexShrink: 0 }}>{label}</div>
              <div style={{ fontSize: '1rem', color: 'var(--ink)', fontWeight: label === 'My Role' ? 700 : 500, letterSpacing: label === 'My Role' ? '.01em' : 'normal' }}>{value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Secretary highlight band ── */}
      <section style={{ background: 'var(--green-deep)', padding: '2.5rem 3rem', display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', flexShrink: 0 }}>
          Board Position
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: 'var(--white)', letterSpacing: '.04em', lineHeight: 1 }}>
            SECRETARY · BOARD OF DIRECTORS
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', color: 'rgba(255,255,255,.45)', letterSpacing: '.06em', marginTop: '.4rem' }}>
            Sawyer Culberson Project · 501(c)(3) · Appointed February 2024 · Active
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', borderLeft: '1px solid rgba(255,255,255,.1)', paddingLeft: '2rem', lineHeight: 2 }}>
          Responsibilities include:<br />
          <span style={{ color: 'rgba(255,255,255,.55)' }}>Board minutes &amp; governance · Safeguarding protocols<br />PSEA frameworks · International field liaison</span>
        </div>
      </section>

      {/* ── Work items ── */}
      <section style={{ background: 'var(--cream)', padding: 'var(--section-pad)' }}>
        <div className="section-tag">Featured Work</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,3rem)', letterSpacing: '.02em', marginBottom: '3rem' }}>
          BOARD &amp; FIELD WORK
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2 }}>
          {items.map(item => (
            <ArticleCard
              key={item._id}
              to={`/international-work/${item.slug?.current || '#'}`}
              imageUrl={item.coverUrl}
              category={`SCP · ${item.workType}`}
              categoryColor="var(--green-mid)"
              title={item.title}
              excerpt={item.summary}
              meta={item.date ? new Date(item.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''}
              placeholderLabel="International Work"
            />
          ))}
        </div>
      </section>

      {/* ── Mission statement ── */}
      <section style={{ background: 'var(--green-deep)', padding: 'var(--section-pad)', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div className="section-tag" style={{ justifyContent: 'center', color: 'var(--gold-light)' }}>Our Ambition</div>
          <blockquote style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,.8)', lineHeight: 1.6, marginBottom: '2rem' }}>
            "At the core of my leadership is a commitment to the highest standards of international safeguarding — bridging high-level global strategy with local execution across Pakistan and the US."
          </blockquote>
          <a href="https://sawyer-culberson-project.org" target="_blank" rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '.8rem', fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', background: 'var(--gold)', color: 'var(--ink)', padding: '.85rem 1.6rem' }}
          >
            Visit SCP Website →
          </a>
        </div>
      </section>
    </>
  )
}
