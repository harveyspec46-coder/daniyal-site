import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { client } from '../lib/sanityClient'
import { FEATURED_STATS_QUERY, FEATURED_RESEARCH_QUERY, ALL_JOURNALISM_QUERY } from '../lib/queries'
import Ticker from '../components/Ticker'
import StatCard from '../components/StatCard'
import ArticleCard from '../components/ArticleCard'

const FALLBACK_STATS = [
  { _id: '1', label: 'NCHS Reported Overdose Deaths', value: '111,466', unit: 'Deaths 2023', country: 'United States', source: 'CDC / NCHS 2023' },
  { _id: '2', label: 'Opioid-Involved Overdose Deaths', value: '79,000', unit: 'Deaths 2023', country: 'United States', source: 'NCHS 2023' },
  { _id: '3', label: 'Projected Overdose Deaths', value: '70,000+', unit: 'Projected 2025', country: 'United States', source: 'NCHS 2025 Estimate' },
  { _id: '4', label: 'Estimated Daily Deaths', value: '700', unit: 'Deaths Per Day', country: 'Pakistan', source: 'National Survey' },
  { _id: '5', label: 'Estimated Annual Deaths', value: '250,000', unit: 'Deaths Per Year', country: 'Pakistan', source: 'National Survey' },
  { _id: '6', label: 'National Drug Users', value: '7M', unit: 'Users Nationally', country: 'Pakistan', source: 'Pakistan National Survey' },
]

const FALLBACK_JOURNALISM = [
  { _id: '1', title: 'Life at the Margins: Drug Addiction on the Streets of Karachi', excerpt: 'A field documentation series bringing into focus the lived reality of Pakistan drug crisis.', location: 'Karachi', date: '2024-05-01', type: 'Photo Essay', slug: { current: '#' } },
  { _id: '2', title: 'Bridging Pakistan Ground Realities with US Policy at SCP', excerpt: 'How board-level safeguarding frameworks connect global strategy with local execution.', location: 'Karachi / US', date: '2024-04-01', type: 'Field Report', slug: { current: '#' } },
  { _id: '3', title: 'Reading the UN World Drug Report Through a Pakistani Lens', excerpt: 'The UN global findings recontextualized against field observations and local data.', location: 'Pakistan', date: '2024-03-01', type: 'Interview', slug: { current: '#' } },
]

export default function Home() {
  const [stats, setStats] = useState(FALLBACK_STATS)
  const [journalism, setJournalism] = useState(FALLBACK_JOURNALISM)
  const [reports, setReports] = useState([])

  useEffect(() => {
    client.fetch(FEATURED_STATS_QUERY).then(d => { if (d?.length) setStats(d) }).catch(() => {})
    client.fetch(ALL_JOURNALISM_QUERY).then(d => { if (d?.length) setJournalism(d) }).catch(() => {})
    client.fetch(FEATURED_RESEARCH_QUERY).then(d => { if (d?.length) setReports(d) }).catch(() => {})
  }, [])

  const usStats = stats.filter(s => s.country === 'United States')
  const pkStats = stats.filter(s => s.country === 'Pakistan')

  return (
    <>
      <section style={{ minHeight: '100vh', background: 'var(--green-deep)', display: 'grid', gridTemplateRows: '1fr auto', position: 'relative', overflow: 'hidden', paddingTop: 'var(--nav-height)' }}>
        <div aria-hidden="true" style={{ position: 'absolute', fontFamily: 'var(--font-display)', fontSize: '42vw', color: 'rgba(255,255,255,.022)', lineHeight: 1, top: '-5%', right: '-8%', pointerEvents: 'none', userSelect: 'none' }}>D</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', padding: '6rem 3rem 4rem', position: 'relative', zIndex: 2, gap: '3rem' }}>
          <div className="fade-up">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '.8rem' }}>
              <span style={{ width: 32, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
              Karachi, Pakistan to SCP 501(c)(3) United States
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem,7vw,7rem)', lineHeight: .96, letterSpacing: '.02em', color: 'var(--white)', marginBottom: '1.8rem' }}>
              FIELD<br />
              <span style={{ WebkitTextStroke: '1.5px var(--gold)', color: 'transparent' }}>TRUTH</span><br />
              <span style={{ color: 'var(--gold)' }}>MATTERS.</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,.65)', lineHeight: 1.8, maxWidth: 480, marginBottom: '2rem' }}>
              Photojournalist, researcher and board member documenting the drug crisis across Pakistan and the United States.
            </p>
            <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {['Drug Addiction', 'Poverty', 'Photojournalism', 'Policy Research', 'US & Pakistan'].map((tag, i) => (
                <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase', padding: '.3rem .9rem', border: i < 2 ? '1px solid var(--gold)' : '1px solid rgba(201,168,76,.35)', color: i < 2 ? 'var(--gold)' : 'rgba(255,255,255,.55)', background: i < 2 ? 'rgba(201,168,76,.08)' : 'transparent' }}>
                  {tag}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link to="/documented-research" className="btn-primary">Explore the Work</Link>
              <Link to="/journalism" className="btn-ghost">View Journalism</Link>
            </div>
          </div>

          <div className="fade-up-2" style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {stats.slice(0, 4).map(stat => (
              <div key={stat._id} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', padding: '1.6rem 2rem', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: '1rem', position: 'relative', transition: 'background .25s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.07)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.04)'}
              >
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: stat.country === 'United States' ? 'var(--gold)' : 'var(--green-light)' }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.55rem', letterSpacing: '.12em', textTransform: 'uppercase', padding: '.2rem .6rem', marginBottom: '.5rem', display: 'inline-block', background: stat.country === 'United States' ? 'rgba(201,168,76,.12)' : 'rgba(122,184,147,.1)', color: stat.country === 'United States' ? 'var(--gold)' : 'var(--green-light)', border: stat.country === 'United States' ? '1px solid rgba(201,168,76,.3)' : '1px solid rgba(122,184,147,.25)' }}>
                    {stat.country === 'United States' ? 'United States' : 'Pakistan'} {stat.source}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', color: 'rgba(255,255,255,.45)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{stat.label}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.6rem', color: 'var(--white)', lineHeight: 1, letterSpacing: '.02em' }}>{stat.value}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', color: stat.country === 'United States' ? 'var(--gold)' : 'var(--green-light)', letterSpacing: '.08em', textTransform: 'uppercase', marginTop: '.2rem' }}>{stat.unit}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'rgba(0,0,0,.25)', borderTop: '1px solid rgba(255,255,255,.06)', padding: '1.2rem 3rem', display: 'flex', alignItems: 'center', gap: '3rem', position: 'relative', zIndex: 2, flexWrap: 'wrap' }}>
          {[['Board Member', 'Sawyer Culberson Project'], ['501(c)(3)', 'Non-Profit United States'], ['Field Based', 'Karachi, Pakistan'], ['Photojournalist', 'Researcher & Consultant']].map(([strong, rest], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.8rem', fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)' }}>
              {i > 0 && <span style={{ width: 1, height: 28, background: 'rgba(255,255,255,.1)' }} />}
              <strong style={{ color: 'var(--gold)', fontWeight: 500 }}>{strong}</strong> {rest}
            </div>
          ))}
        </div>
      </section>

      <Ticker />

      <section style={{ background: 'var(--white)', padding: 'var(--section-pad)', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '6rem', alignItems: 'center', borderBottom: '1px solid var(--cream-dark)' }}>
        <div>
          <div className="section-tag">Who I Am</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,4vw,3.8rem)', lineHeight: .98, letterSpacing: '.02em', marginBottom: '1.5rem' }}>
            ONE PERSON.<br />
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--green-mid)', fontSize: '.85em' }}>Two nations.</span><br />
            ONE CRISIS.
          </h2>
          <p style={{ fontSize: '.95rem', lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: '2rem', fontWeight: 300 }}>
            I am Daniyal, a self-taught software engineer, researcher, photojournalist, and board member of the Sawyer Culberson Project, a US-based 501(c)(3) nonprofit. Living in Pakistan while working internationally, I document the drug addiction crisis in real time and connect the human stories that statistics alone can never tell.
          </p>
          <Link to="/about" className="btn-primary">Read My Full Story</Link>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.8rem', background: 'var(--green-deep)', color: 'var(--white)', padding: '.9rem 1.5rem', fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.1em', textTransform: 'uppercase', marginTop: '1.5rem', marginLeft: '1rem' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)', animation: 'pulse 2s ease-in-out infinite' }} />
            Active Board Member SCP 501(c)(3)
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--cream-dark)' }}>
          {[['💻', 'Software Engineer', 'Self-taught Full Stack'], ['📷', 'Photojournalist', 'Field Documentation'], ['🔬', 'Researcher', 'Data & UN Reports'], ['🌍', 'Consultant', 'Nonprofit & Policy']].map(([icon, title, desc]) => (
            <div key={title} style={{ background: 'var(--cream)', padding: '1.4rem 1.2rem' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '.6rem' }}>{icon}</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '.95rem', fontWeight: 700, color: 'var(--green-deep)', marginBottom: '.3rem' }}>{title}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--green-deep)', padding: 'var(--section-pad)', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', right: '-2rem', top: '50%', transform: 'translateY(-50%) rotate(90deg)', fontFamily: 'var(--font-display)', fontSize: '14rem', color: 'rgba(255,255,255,.025)', pointerEvents: 'none', letterSpacing: '.1em' }}>DATA</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'end', marginBottom: '4rem' }}>
          <div>
            <div className="section-tag" style={{ color: 'var(--gold-light)' }}>The Numbers Do Not Lie</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,4.5vw,4rem)', color: 'var(--white)', lineHeight: .95, letterSpacing: '.02em' }}>
              GLOBAL<br />DRUG <span style={{ color: 'var(--gold)' }}>CRISIS</span><br />IN NUMBERS
            </h2>
          </div>
          <p style={{ fontSize: '.9rem', lineHeight: 1.9, color: 'rgba(255,255,255,.5)', fontWeight: 300, borderLeft: '2px solid var(--gold)', paddingLeft: '1.2rem' }}>
            These are not abstractions. Behind every statistic is a family, a community, a life. This data drawn from the CDC, NCHS, Pakistan National Drug Survey, and United Nations reports forms the foundation of everything documented here.
          </p>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1px' }}>United States Data</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(255,255,255,.06)', marginBottom: 2 }}>
          {usStats.map(s => <StatCard key={s._id} {...s} />)}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--green-light)', marginBottom: '1px', marginTop: '1rem' }}>Pakistan Data</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(255,255,255,.06)' }}>
          {pkStats.map(s => <StatCard key={s._id} {...s} />)}
        </div>
        <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {['UN World Drug Report', 'Global Opioid Crisis Report', 'UN Drug Report Urdu'].map(r => (
            <a key={r} href="#" style={{ display: 'flex', alignItems: 'center', gap: '.6rem', fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink)', background: 'var(--gold)', padding: '.65rem 1.2rem', transition: 'background .2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-light)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--gold)'}
            >Download {r}</a>
          ))}
          <Link to="/documented-research" style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.55)', border: '1px solid rgba(255,255,255,.15)', padding: '.65rem 1.2rem' }}>View All Research</Link>
        </div>
      </section>

      <section style={{ background: 'var(--cream)', padding: 'var(--section-pad)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'end', marginBottom: '3.5rem' }}>
          <div>
            <div className="section-tag">Explore the Site</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem,4vw,3.6rem)', lineHeight: .96, letterSpacing: '.02em' }}>EVERYTHING I DO,<br />IN ONE PLACE.</h2>
          </div>
          <p style={{ fontSize: '.9rem', lineHeight: 1.9, color: 'var(--text-muted)', fontWeight: 300 }}>From field photography in Karachi to board-level governance at SCP in the US, every section of this site represents a different thread of the same work: making the invisible, visible.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: 'auto auto', gap: 2 }}>
          {[
            { to: '/journalism', bg: 'var(--green-deep)', num: '01', title: 'JOURNALISM', desc: 'Photo essays, field interviews, and documented stories from the drug crisis.', color: 'var(--white)', span: true },
            { to: '/documented-research', bg: 'var(--cream-dark)', num: '02', title: 'DOCUMENTED RESEARCH', desc: 'UN reports, CDC data, and field findings.', color: 'var(--green-deep)', span: false },
            { to: '/international-work', bg: 'var(--gold)', num: '03', title: 'INTERNATIONAL WORK', desc: 'Board-level work with SCP 501(c)(3).', color: 'var(--ink)', span: false },
            { to: '/about', bg: 'var(--green-bright)', num: '04', title: 'ABOUT DANIYAL', desc: 'Background, skills, and the story behind bridging two nations.', color: 'var(--white)', span: false },
          ].map((tile, i) => (
            <Link key={tile.to} to={tile.to} style={{ background: tile.bg, padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: tile.span ? 460 : 220, gridRow: tile.span ? 'span 2' : 'auto', position: 'relative', overflow: 'hidden', textDecoration: 'none', transition: 'filter .25s' }}
              onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.08)'}
              onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.55rem', letterSpacing: '.18em', color: tile.color === 'var(--white)' ? 'rgba(255,255,255,.3)' : 'rgba(15,26,20,.35)', textTransform: 'uppercase' }}>{tile.num}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', letterSpacing: '.04em', color: tile.color, marginBottom: '.5rem', lineHeight: 1 }}>{tile.title}</div>
                <p style={{ fontSize: '.75rem', color: tile.color === 'var(--white)' ? 'rgba(255,255,255,.5)' : 'rgba(15,26,20,.55)', lineHeight: 1.6, fontWeight: 300 }}>{tile.desc}</p>
              </div>
              <span style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', fontSize: '1.5rem', color: tile.color === 'var(--white)' ? 'rgba(255,255,255,.2)' : 'rgba(15,26,20,.2)' }}>↗</span>
            </Link>
          ))}
          <Link to="/" style={{ gridColumn: 'span 2', background: 'var(--ink)', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', textDecoration: 'none' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.55rem', letterSpacing: '.18em', color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', marginBottom: '.3rem' }}>05 Writing</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', letterSpacing: '.04em', color: 'var(--white)' }}>BLOG - CONNECTING THE DOTS</div>
            </div>
            <p style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.45)', maxWidth: 320, lineHeight: 1.6, fontWeight: 300 }}>Long-form writing that bridges Pakistan ground reality with US policy and the SCP mission.</p>
            <span style={{ fontSize: '2rem', color: 'rgba(255,255,255,.15)', flexShrink: 0 }}>↗</span>
          </Link>
        </div>
      </section>

      <section style={{ background: 'var(--white)', padding: 'var(--section-pad)', borderTop: '1px solid var(--cream-dark)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem' }}>
          <div>
            <div className="section-tag">From the Field</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,3.5vw,3rem)', lineHeight: .96, letterSpacing: '.02em' }}>LATEST FROM<br />THE GROUND</h2>
          </div>
          <Link to="/journalism" style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--green-mid)', borderBottom: '1px solid var(--green-mid)', paddingBottom: 2 }}>View All Work</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
          {journalism.slice(0, 3).map(item => (
            <ArticleCard key={item._id} to={'/journalism/' + (item.slug?.current || '#')} imageUrl={item.coverUrl} category={item.type + ' ' + item.location} title={item.title} excerpt={item.excerpt} meta={'Field Report ' + (item.date ? new Date(item.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '')} placeholderLabel="Field Documentation" />
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--gold)', padding: '4rem 3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <blockquote style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontStyle: 'italic', fontWeight: 300, color: 'var(--green-deep)', lineHeight: 1.5 }}>
          Our ambition in media and journalism is to promote <strong style={{ fontStyle: 'normal', fontWeight: 700, color: 'var(--ink)' }}>responsible, fact-based reporting</strong> that strengthens public awareness and community safety.
        </blockquote>
        <div>
          <p style={{ fontSize: '.88rem', lineHeight: 1.9, color: 'rgba(15,26,20,.7)', fontWeight: 300, marginBottom: '1.5rem' }}>
            Through ethical journalism and disciplined research, the goal is to build trust, credibility, and long-term impact within the communities we serve.
          </p>
          <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: '.8rem', fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', background: 'var(--green-deep)', color: 'var(--white)', padding: '.85rem 1.6rem' }}>Our Mission and Vision</Link>
        </div>
      </section>

      <style>{`@keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.4);opacity:.7}}`}</style>
    </>
  )
}
