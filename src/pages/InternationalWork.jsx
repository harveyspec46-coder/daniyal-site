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
  { _id: '4', title: 'SCP Partnership: Expanding the International Network', summary: 'Building relationships with international organizations to expand SCP reach and impact across affected communities.', date: '2024-01-01', workType: 'Partnership', slug: { current: '#' } },
]

export default function InternationalWork() {
  const [items, setItems] = useState(FALLBACK)

  useEffect(() => {
    client.fetch(ALL_SCP_QUERY).then(d => { if (d?.length) setItems(d) }).catch(() => {})
  }, [])

  return (
    <>
      <PageHero eyebrow="Sawyer Culberson Project 501(c)(3) United States" title="INTERNATIONAL" titleAccent="WORK" subtitle="Board-level governance, safeguarding, and global advocacy connecting Pakistan and the United States." />

      <section style={{ background: 'var(--gold)', padding: '3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--green-deep)', marginBottom: '.8rem' }}>About SCP</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: 'var(--ink)', letterSpacing: '.02em', lineHeight: .96, marginBottom: '1rem' }}>SAWYER CULBERSON<br />PROJECT 501(c)(3)</h2>
          <p style={{ fontSize: '.9rem', color: 'rgba(15,26,20,.7)', lineHeight: 1.8, fontWeight: 300 }}>A US-based nonprofit committed to drug addiction awareness, prevention, and community support with international field operations bridging Pakistan and the United States.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[['My Role', 'Board Member International Operations'], ['Focus Areas', 'Safeguarding, PSEA, Policy Advocacy, Field Research'], ['Location', 'Karachi, Pakistan and United States'], ['Status', 'Active 501(c)(3) Registered']].map(([label, value]) => (
            <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'baseline', paddingBottom: '.8rem', borderBottom: '1px solid rgba(15,26,20,.1)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(15,26,20,.5)', width: 100, flexShrink: 0 }}>{label}</div>
              <div style={{ fontSize: '.88rem', color: 'var(--ink)', fontWeight: 500 }}>{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--cream)', padding: 'var(--section-pad)' }}>
        <div className="section-tag">Featured Work</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,3rem)', letterSpacing: '.02em', marginBottom: '3rem' }}>BOARD AND FIELD WORK</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2 }}>
          {items.map(item => (
            <ArticleCard key={item._id} to={'/international-work/' + (item.slug?.current || '#')} imageUrl={item.coverUrl} category={'SCP ' + item.workType} categoryColor="var(--green-mid)" title={item.title} excerpt={item.summary} meta={item.date ? new Date(item.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''} placeholderLabel="International Work" />
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--green-deep)', padding: 'var(--section-pad)', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div className="section-tag" style={{ justifyContent: 'center', color: 'var(--gold-light)' }}>Our Ambition</div>
          <blockquote style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,.8)', lineHeight: 1.6, marginBottom: '2rem' }}>
            At the core of my leadership is a commitment to the highest standards of international safeguarding, bridging high-level global strategy with local execution across Pakistan and the US.
          </blockquote>
          <a href="https://sawyer-culberson-project.org" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '.8rem', fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', background: 'var(--gold)', color: 'var(--ink)', padding: '.85rem 1.6rem' }}>Visit SCP Website</a>
        </div>
      </section>
    </>
  )
}
