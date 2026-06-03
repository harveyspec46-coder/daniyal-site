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
      <PageHero
        eyebrow="Sawyer Culberson Project · 501(c)(3) · United States"
        title="INTERNATIONAL"
        titleAccent="WORK"
        subtitle="Secretary of the Board of Directors and board member — leading safeguarding, governance, and global advocacy connecting Pakistan and the United States."
      />

      {/* SCP intro band */}
      <section className="intl-band" style={{ background: 'var(--gold)', padding: '4rem 3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--green-deep)', marginBottom: '1rem' }}>About SCP</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,3rem)', color: 'var(--ink)', letterSpacing: '.02em', lineHeight: .96, marginBottom: '1.2rem' }}>
            SAWYER CULBERSON<br />PROJECT · 501(c)(3)
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(15,26,20,.7)', lineHeight: 1.8, fontWeight: 300 }}>
            A US-based nonprofit committed to drug addiction awareness, prevention, and community support — with international field operations and advocacy work bridging Pakistan and the United States.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {[
            ['Primary Role', 'Secretary, Board of Directors'],
            ['Also Serving As', 'Board Member'],
            ['Focus Areas', 'Safeguarding, PSEA, Policy Advocacy, Field Research'],
            ['Location', 'Karachi, Pakistan and United States'],
            ['Status', 'Active · 501(c)(3) Registered'],
          ].map(([label, value]) => (
            <div key={label} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '1rem', alignItems: 'center', padding: '1rem 1.2rem', background: 'rgba(15,26,20,.06)', borderLeft: '3px solid rgba(15,26,20,.2)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(15,26,20,.55)' }}>{label}</div>
              <div style={{ fontSize: '1rem', color: 'var(--ink)', fontWeight: 600 }}>{value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Responsibilities */}
      <section style={{ background: 'var(--white)', padding: '6rem 3rem', borderBottom: '1px solid var(--cream-dark)' }}>
        <div className="section-tag">Responsibilities</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,3.5vw,3rem)', letterSpacing: '.02em', marginBottom: '3rem' }}>SECRETARY &amp; BOARD DUTIES</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
          {[
            ['Governance Documentation', 'Maintaining official board records, minutes, and resolutions in compliance with 501(c)(3) requirements and international nonprofit standards.'],
            ['PSEA Frameworks', 'Designing and implementing Protection from Sexual Exploitation and Abuse protocols across SCP regional operations.'],
            ['International Safeguarding', 'Bridging high-level global safeguarding strategy with ground-level execution across Pakistan field operations.'],
            ['Board Communications', 'Managing official communications between board members, stakeholders, and international partners across multiple time zones.'],
            ['Policy Advocacy', 'Translating Pakistan field findings into US-facing policy conversations and SCP advocacy materials.'],
            ['Field Research Integration', 'Connecting photojournalism and ground-level data with SCP board decisions and strategic direction.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ background: 'var(--cream)', padding: '2rem 1.8rem', borderBottom: '3px solid transparent', transition: 'border-color .25s, background .25s' }}
              onMouseEnter={e => { e.currentTarget.style.borderBottomColor = 'var(--gold)'; e.currentTarget.style.background = 'var(--white)' }}
              onMouseLeave={e => { e.currentTarget.style.borderBottomColor = 'transparent'; e.currentTarget.style.background = 'var(--cream)' }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '.04em', color: 'var(--green-deep)', marginBottom: '.8rem' }}>{title}</h3>
              <p style={{ fontSize: '.95rem', color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 300 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Work items */}
      <section className="scp-grid" style={{ background: 'var(--cream)', padding: '6rem 3rem' }}>
        <div className="section-tag">Featured Work</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,3.5vw,3rem)', letterSpacing: '.02em', marginBottom: '3rem' }}>BOARD &amp; FIELD WORK</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2 }}>
          {items.map(item => (
            <ArticleCard
              key={item._id}
              to={'/international-work/' + (item.slug?.current || '#')}
              imageUrl={item.coverUrl}
              category={'SCP · ' + item.workType}
              categoryColor="var(--green-mid)"
              title={item.title}
              excerpt={item.summary}
              meta={item.date ? new Date(item.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''}
              placeholderLabel="International Work"
            />
          ))}
        </div>
      </section>

      {/* Mission */}
      <section style={{ background: 'var(--green-deep)', padding: '6rem 3rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div className="section-tag" style={{ justifyContent: 'center', color: 'var(--gold-light)' }}>Our Ambition</div>
          <blockquote style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.3rem,2.5vw,1.9rem)', fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,.8)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            At the core of my leadership is a commitment to the highest standards of international safeguarding, bridging high-level global strategy with local execution across Pakistan and the US.
          </blockquote>
          <a href="https://sawyerculbersonproject.org" target="_blank" rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '.8rem', fontFamily: 'var(--font-mono)', fontSize: '.7rem', letterSpacing: '.12em', textTransform: 'uppercase', background: 'var(--gold)', color: 'var(--ink)', padding: '1rem 2rem' }}
          >Visit SCP Website</a>
        </div>
      </section>
    </>
  )
}
