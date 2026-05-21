import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { client } from '../lib/sanityClient'
import { FEATURED_RESEARCH_QUERY, ALL_JOURNALISM_QUERY } from '../lib/queries'
import Ticker from '../components/Ticker'
import ArticleCard from '../components/ArticleCard'

const US_STATS = [
  { _id: 'u1', label: 'Total Overdose Deaths', value: '69,973', unit: 'Provisional 2025', country: 'United States', source: 'CDC Provisional 2025' },
  { _id: 'u2', label: 'Total Overdose Deaths', value: '80,391', unit: 'Deaths 2024', country: 'United States', source: 'CDC 2024' },
  { _id: 'u3', label: 'Total Overdose Deaths', value: '105,007', unit: 'Deaths 2023', country: 'United States', source: 'CDC 2023' },
  { _id: 'u4', label: 'Peak Overdose Deaths', value: '107,941', unit: 'Deaths 2022 Peak', country: 'United States', source: 'CDC 2022' },
  { _id: 'u5', label: 'Fentanyl Share of All Deaths', value: '70%', unit: 'Of All US Drug Fatalities', country: 'United States', source: 'CDC / NIDA' },
  { _id: 'u6', label: 'Cocaine-Involved Deaths', value: '29,449', unit: 'Deaths 2023', country: 'United States', source: 'CDC 2023' },
  { _id: 'u7', label: 'Children With Addicted Parent', value: '1 in 10', unit: 'US Children Affected', country: 'United States', source: 'SAMHSA' },
  { _id: 'u8', label: 'Dual Diagnosis Rate', value: '50%', unit: 'Co-occurring Mental Health', country: 'United States', source: 'SAMHSA' },
]

const PK_STATS = [
  { _id: 'p1', label: 'Regular Drug Users Nationally', value: '7.6M', unit: 'Active Users', country: 'Pakistan', source: 'Ministry of Narcotics' },
  { _id: 'p2', label: 'Estimated Daily Deaths', value: '700', unit: 'Deaths Per Day', country: 'Pakistan', source: 'Federal Narcotics Review' },
  { _id: 'p3', label: 'Estimated Annual Deaths', value: '250,000', unit: 'Deaths Per Year', country: 'Pakistan', source: 'Federal Narcotics Review' },
  { _id: 'p4', label: 'New Users Added Per Year', value: '50,000', unit: 'New Users Annually', country: 'Pakistan', source: 'ANF Estimate' },
  { _id: 'p5', label: 'Heavy Opiate Users', value: '2.7M', unit: 'Heroin & Opium Users', country: 'Pakistan', source: 'UNODC' },
  { _id: 'p6', label: 'Users Are Primary Breadwinners', value: '78%', unit: 'Of All Drug Users', country: 'Pakistan', source: 'UNODC' },
  { _id: 'p7', label: 'Dependents Per User', value: '6-8', unit: 'Family Members Affected', country: 'Pakistan', source: 'UNODC' },
  { _id: 'p8', label: 'Injecting Drug Users', value: '500,000+', unit: 'Active IDUs', country: 'Pakistan', source: 'UNODC' },
  { _id: 'p9', label: 'HIV Rate Among IDUs', value: '40%', unit: 'HIV Positive IDUs', country: 'Pakistan', source: 'UNODC' },
]

function StatScroll({ stats, label, labelColor }) {
  const doubled = [...stats, ...stats]
  return (
    <div style={{ marginBottom: '2px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.2em', textTransform: 'uppercase', color: labelColor, padding: '.8rem 3rem', background: 'rgba(0,0,0,.2)', display: 'flex', alignItems: 'center', gap: '.8rem' }}>
        <span style={{ width: 20, height: 2, background: labelColor, display: 'inline-block' }} />
        {label}
      </div>
      <div style={{ overflow: 'hidden', background: 'rgba(255,255,255,.03)' }}>
        <div style={{
          display: 'flex',
          animation: 'statsScroll 40s linear infinite',
          width: 'max-content',
        }}>
          {doubled.map((stat, i) => (
            <div key={i} style={{
              background: 'var(--ink)',
              padding: '2.5rem 2.5rem',
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0,
              width: '320px',
              borderRight: '1px solid rgba(255,255,255,.06)',
              transition: 'background .25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#162010'; e.currentTarget.parentElement.style.animationPlayState = 'paused' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.parentElement.style.animationPlayState = 'running' }}
            >
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: labelColor }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: labelColor, opacity: .3 }} />
              <div style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '.55rem', letterSpacing: '.12em', textTransform: 'uppercase', padding: '.2rem .7rem', marginBottom: '1rem', background: stat.country === 'United States' ? 'rgba(201,168,76,.12)' : 'rgba(122,184,147,.1)', color: labelColor, border: `1px solid ${stat.country === 'United States' ? 'rgba(201,168,76,.3)' : 'rgba(122,184,147,.25)'}` }}>
                {stat.source}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem,4vw,3.8rem)', color: 'var(--white)', lineHeight: 1, letterSpacing: '.02em', marginBottom: '.6rem' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.6)', fontWeight: 300, lineHeight: 1.4, marginBottom: '.4rem' }}>
                {stat.label}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.08em', color: labelColor, textTransform: 'uppercase', marginTop: '.4rem' }}>
                {stat.unit}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [journalism, setJournalism] = useState([])
  const [reports, setReports] = useState([])

  useEffect(() => {
    client.fetch(ALL_JOURNALISM_QUERY).then(d => { if (d?.length) setJournalism(d) }).catch(() => {})
    client.fetch(FEATURED_RESEARCH_QUERY).then(d => { if (d?.length) setReports(d) }).catch(() => {})
  }, [])

  return (
    <>
      <style>{`
        @keyframes statsScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:.7} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr !important; padding: 4rem 1.5rem 2rem !important; }
          .hero-h1 { font-size: clamp(3.5rem,12vw,5rem) !important; }
          .stat-stack { display: none !important; }
          .hero-bar { gap: 1rem !important; padding: 1rem 1.5rem !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; padding: 4rem 1.5rem !important; }
          .crisis-header { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .crisis-section { padding: 4rem 1.5rem !important; }
          .pages-intro { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .pages-grid { grid-template-columns: 1fr !important; grid-template-rows: auto !important; padding: 0 1.5rem 4rem !important; }
          .pages-grid a { grid-row: auto !important; min-height: 180px !important; }
          .blog-strip { flex-direction: column !important; gap: 1rem !important; }
          .cards-grid { grid-template-columns: 1fr !important; }
          .cards-sec { padding: 4rem 1.5rem !important; }
          .mission-grid { grid-template-columns: 1fr !important; gap: 2rem !important; padding: 3rem 1.5rem !important; }
          .footer-top { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
          .skills-grid { grid-template-columns: 1fr 1fr !important; }
          .pages-header { padding: 0 1.5rem !important; }
        }
        @media (max-width: 560px) {
          .footer-top { grid-template-columns: 1fr !important; }
          .hero-bar { flex-direction: column !important; align-items: flex-start !important; gap: .5rem !important; }
          .bar-sep { display: none !important; }
          .tags { gap: .4rem !important; }
          .hero-btns { flex-direction: column !important; align-items: flex-start !important; }
          nav ul { display: none !important; }
          .nav-donate-text { display: none !important; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ minHeight: '100vh', background: 'var(--green-deep)', display: 'grid', gridTemplateRows: '1fr auto', position: 'relative', overflow: 'hidden', paddingTop: 'var(--nav-height)' }}>
        <div aria-hidden="true" style={{ position: 'absolute', fontFamily: 'var(--font-display)', fontSize: '42vw', color: 'rgba(255,255,255,.022)', lineHeight: 1, top: '-5%', right: '-8%', pointerEvents: 'none', userSelect: 'none' }}>D</div>

        <div className="hero-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', padding: '6rem 3rem 4rem', position: 'relative', zIndex: 2, gap: '3rem' }}>
          {/* LEFT */}
          <div style={{ animation: 'fadeUp .7s ease both' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '.8rem' }}>
              <span style={{ width: 32, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
              Karachi, Pakistan to SCP 501(c)(3) United States
            </div>
            <h1 className="hero-h1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(5rem,8vw,8rem)', lineHeight: .92, letterSpacing: '.02em', color: 'var(--white)', marginBottom: '2rem' }}>
              FIELD<br />
              <span style={{ WebkitTextStroke: '2px var(--gold)', color: 'transparent' }}>TRUTH</span><br />
              <span style={{ color: 'var(--gold)' }}>MATTERS.</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,.65)', lineHeight: 1.8, maxWidth: 480, marginBottom: '2rem' }}>
              Photojournalist, researcher and board member documenting the drug crisis across Pakistan and the United States.
            </p>
            <div className="tags" style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {['Drug Addiction', 'Poverty', 'Photojournalism', 'Policy Research', 'US & Pakistan'].map((tag, i) => (
                <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.1em', textTransform: 'uppercase', padding: '.35rem 1rem', border: i < 2 ? '1px solid var(--gold)' : '1px solid rgba(201,168,76,.35)', color: i < 2 ? 'var(--gold)' : 'rgba(255,255,255,.55)', background: i < 2 ? 'rgba(201,168,76,.08)' : 'transparent' }}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="hero-btns" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link to="/documented-research" style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', letterSpacing: '.12em', textTransform: 'uppercase', background: 'var(--gold)', color: 'var(--ink)', padding: '1rem 2.2rem', fontWeight: 500, transition: 'background .2s' }}>Explore the Work</Link>
              <Link to="/journalism" style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,.25)' }}>View Journalism</Link>
            </div>
          </div>

          {/* RIGHT stat stack */}
          <div className="stat-stack" style={{ display: 'flex', flexDirection: 'column', gap: 1, animation: 'fadeUp .7s .1s ease both', opacity: 0 }}>
            {[
              { flag: '🇺🇸', src: 'CDC 2025', lbl: 'Provisional Overdose Deaths', val: '69,973', unit: 'Deaths 2025', color: 'var(--gold)' },
              { flag: '🇺🇸', src: 'CDC 2024', lbl: 'Total Overdose Deaths', val: '80,391', unit: 'Deaths 2024', color: 'var(--gold)' },
              { flag: '🇵🇰', src: 'National Survey', lbl: 'Estimated Daily Deaths', val: '700', unit: 'Deaths Per Day', color: 'var(--green-light)' },
              { flag: '🇵🇰', src: 'Federal Review', lbl: 'Annual Estimated Deaths', val: '250,000', unit: 'Deaths Per Year', color: 'var(--green-light)' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', padding: '1.8rem 2rem', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: '1rem', position: 'relative', transition: 'background .25s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.04)'}
              >
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: s.color }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.12em', textTransform: 'uppercase', padding: '.2rem .7rem', marginBottom: '.5rem', display: 'inline-block', background: s.color === 'var(--gold)' ? 'rgba(201,168,76,.12)' : 'rgba(122,184,147,.1)', color: s.color, border: `1px solid ${s.color === 'var(--gold)' ? 'rgba(201,168,76,.3)' : 'rgba(122,184,147,.25)'}` }}>
                    {s.flag} {s.src}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{s.lbl}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,4vw,3.2rem)', color: 'var(--white)', lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', color: s.color, letterSpacing: '.08em', textTransform: 'uppercase', marginTop: '.3rem' }}>{s.unit}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="hero-bar" style={{ background: 'rgba(0,0,0,.3)', borderTop: '1px solid rgba(255,255,255,.06)', padding: '1.4rem 3rem', display: 'flex', alignItems: 'center', gap: '2.5rem', flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
          {[['Board Member', 'Sawyer Culberson Project'], ['501(c)(3)', 'Non-Profit United States'], ['Field Based', 'Karachi, Pakistan'], ['Photojournalist', 'Researcher & Consultant']].map(([strong, rest], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.8rem', fontFamily: 'var(--font-mono)', fontSize: '.68rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.45)' }}>
              {i > 0 && <span className="bar-sep" style={{ width: 1, height: 28, background: 'rgba(255,255,255,.1)' }} />}
              <strong style={{ color: 'var(--gold)', fontWeight: 500 }}>{strong}</strong> {rest}
            </div>
          ))}
        </div>
      </section>

      {/* TICKER */}
      <Ticker />

      {/* ABOUT */}
      <section className="about-grid" style={{ background: 'var(--white)', padding: '6rem 3rem', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '6rem', alignItems: 'center', borderBottom: '1px solid var(--cream-dark)' }}>
        <div>
          <div className="section-tag">Who I Am</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,5vw,4.5rem)', lineHeight: .95, letterSpacing: '.02em', marginBottom: '1.5rem' }}>
            ONE PERSON.<br />
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--green-mid)', fontSize: '.85em' }}>Two nations.</span><br />
            ONE CRISIS.
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: '2rem', fontWeight: 300 }}>
            I am Daniyal, a self-taught software engineer, researcher, photojournalist, and board member of the Sawyer Culberson Project, a US-based 501(c)(3) nonprofit. Living in Pakistan while working internationally, I document the drug addiction crisis in real time and connect the human stories that statistics alone can never tell.
          </p>
          <Link to="/about" style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', letterSpacing: '.12em', textTransform: 'uppercase', background: 'var(--gold)', color: 'var(--ink)', padding: '1rem 2.2rem', fontWeight: 500, display: 'inline-block', marginBottom: '1.5rem' }}>Read My Full Story</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem', background: 'var(--green-deep)', color: 'var(--white)', padding: '1rem 1.5rem', fontFamily: 'var(--font-mono)', fontSize: '.68rem', letterSpacing: '.1em', textTransform: 'uppercase', marginTop: '.5rem', width: 'fit-content' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)', animation: 'pulse 2s ease-in-out infinite', flexShrink: 0 }} />
            Active Board Member SCP 501(c)(3)
          </div>
        </div>

        {/* Skills with background images */}
        <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          {[
            { icon: '💻', title: 'Software Engineer', desc: 'Self-taught Full Stack', bg: 'linear-gradient(135deg, var(--green-deep) 0%, var(--ink-muted) 100%)' },
            { icon: '📷', title: 'Photojournalist', desc: 'Field Documentation', bg: 'linear-gradient(135deg, #1a1a1a 0%, var(--green-deep) 100%)' },
            { icon: '🔬', title: 'Researcher', desc: 'Data & UN Reports', bg: 'linear-gradient(135deg, var(--ink) 0%, var(--green-mid) 100%)' },
            { icon: '🌍', title: 'Consultant', desc: 'Nonprofit & Policy', bg: 'linear-gradient(135deg, var(--green-mid) 0%, var(--ink) 100%)' },
          ].map((s, i) => (
            <div key={s.title} style={{ background: s.bg, padding: '2rem 1.5rem', position: 'relative', overflow: 'hidden', minHeight: 160 }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,.03) 0, rgba(255,255,255,.03) 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '2rem', marginBottom: '.8rem' }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--white)', marginBottom: '.4rem' }}>{s.title}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)' }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CRISIS DATA — ANIMATED SCROLL */}
      <section className="crisis-section" style={{ background: 'var(--green-deep)', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', right: '-2rem', top: '50%', transform: 'translateY(-50%) rotate(90deg)', fontFamily: 'var(--font-display)', fontSize: '18rem', color: 'rgba(255,255,255,.02)', pointerEvents: 'none' }}>DATA</div>

        <div className="crisis-header" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'end', marginBottom: '4rem', padding: '0 3rem' }}>
          <div>
            <div className="section-tag" style={{ color: 'var(--gold-light)' }}>The Numbers Do Not Lie</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,5vw,4.5rem)', color: 'var(--white)', lineHeight: .95, letterSpacing: '.02em' }}>
              GLOBAL DRUG<br /><span style={{ color: 'var(--gold)' }}>CRISIS</span> IN NUMBERS
            </h2>
          </div>
          <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'rgba(255,255,255,.5)', fontWeight: 300, borderLeft: '2px solid var(--gold)', paddingLeft: '1.5rem' }}>
            These are not abstractions. Behind every statistic is a family, a community, a life. Drawn from CDC, NCHS, Pakistan National Drug Survey, and United Nations reports — hover any card to pause.
          </p>
        </div>

        <StatScroll stats={US_STATS} label="United States Data — CDC / NIDA / SAMHSA" labelColor="var(--gold)" />
        <StatScroll stats={PK_STATS} label="Pakistan Data — UNODC / Ministry of Narcotics / ANF" labelColor="var(--green-light)" />

        <div style={{ padding: '3rem 3rem 0', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {['UN World Drug Report', 'Global Opioid Crisis Report', 'UN Drug Report Urdu'].map(r => (
            <a key={r} href="#" style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink)', background: 'var(--gold)', padding: '.75rem 1.4rem', transition: 'background .2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-light)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--gold)'}
            >Download {r}</a>
          ))}
          <Link to="/documented-research" style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.55)', border: '1px solid rgba(255,255,255,.15)', padding: '.75rem 1.4rem' }}>View All Research</Link>
        </div>
      </section>

      {/* PAGES GRID */}
      <section style={{ background: 'var(--cream)', padding: '6rem 0' }}>
        <div className="pages-intro pages-header" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'end', marginBottom: '3.5rem', padding: '0 3rem' }}>
          <div>
            <div className="section-tag">Explore the Site</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem,5vw,4rem)', lineHeight: .96, letterSpacing: '.02em' }}>EVERYTHING I DO,<br />IN ONE PLACE.</h2>
          </div>
          <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--text-muted)', fontWeight: 300 }}>From field photography in Karachi to board-level governance at SCP in the US, every section represents a different thread of the same work.</p>
        </div>

        <div className="pages-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: 'auto auto', gap: 2 }}>
          {[
            { to: '/journalism', bg: 'var(--green-deep)', num: '01', title: 'JOURNALISM', desc: 'Photo essays, field interviews, and documented stories from the drug crisis. Raw. Real. Evidence-based.', color: 'var(--white)', span: true },
            { to: '/documented-research', bg: 'var(--cream-dark)', num: '02', title: 'DOCUMENTED RESEARCH', desc: 'UN reports, CDC data, and field findings.', color: 'var(--green-deep)', span: false },
            { to: '/international-work', bg: 'var(--gold)', num: '03', title: 'INTERNATIONAL WORK', desc: 'Board-level work with SCP 501(c)(3).', color: 'var(--ink)', span: false },
            { to: '/about', bg: 'var(--green-bright)', num: '04', title: 'ABOUT DANIYAL', desc: 'Background, skills, and the story behind bridging two nations.', color: 'var(--white)', span: false },
          ].map((tile) => (
            <Link key={tile.to} to={tile.to} style={{ background: tile.bg, padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: tile.span ? 480 : 240, gridRow: tile.span ? 'span 2' : 'auto', position: 'relative', overflow: 'hidden', textDecoration: 'none', transition: 'filter .25s' }}
              onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.08)'}
              onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.18em', color: tile.color === 'var(--white)' ? 'rgba(255,255,255,.3)' : 'rgba(15,26,20,.35)', textTransform: 'uppercase' }}>{tile.num}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '.04em', color: tile.color, marginBottom: '.6rem', lineHeight: 1 }}>{tile.title}</div>
                <p style={{ fontSize: '.85rem', color: tile.color === 'var(--white)' ? 'rgba(255,255,255,.5)' : 'rgba(15,26,20,.55)', lineHeight: 1.6, fontWeight: 300 }}>{tile.desc}</p>
              </div>
              <span style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', fontSize: '1.8rem', color: tile.color === 'var(--white)' ? 'rgba(255,255,255,.2)' : 'rgba(15,26,20,.2)' }}>↗</span>
            </Link>
          ))}
          <Link to="/" className="blog-strip" style={{ gridColumn: 'span 2', background: 'var(--ink)', padding: '1.8rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', textDecoration: 'none', transition: 'filter .25s' }}
            onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.12)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.18em', color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', marginBottom: '.3rem' }}>05 Writing</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '.04em', color: 'var(--white)' }}>BLOG — CONNECTING THE DOTS</div>
            </div>
            <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.45)', maxWidth: 360, lineHeight: 1.6, fontWeight: 300 }}>Long-form writing bridging Pakistan ground reality with US policy and the SCP mission.</p>
            <span style={{ fontSize: '2rem', color: 'rgba(255,255,255,.15)', flexShrink: 0 }}>↗</span>
          </Link>
        </div>
      </section>

      {/* LATEST JOURNALISM */}
      <section className="cards-sec" style={{ background: 'var(--white)', padding: '6rem 3rem', borderTop: '1px solid var(--cream-dark)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="section-tag">From the Field</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,4vw,3.5rem)', lineHeight: .96, letterSpacing: '.02em' }}>LATEST FROM<br />THE GROUND</h2>
          </div>
          <Link to="/journalism" style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--green-mid)', borderBottom: '1px solid var(--green-mid)', paddingBottom: 2 }}>View All Work</Link>
        </div>
        <div className="cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
          {(journalism.length > 0 ? journalism.slice(0, 3) : [
            { _id: '1', title: 'Life at the Margins: Drug Addiction on the Streets of Karachi', excerpt: 'A field documentation series bringing into focus the lived reality of Pakistan drug crisis.', location: 'Karachi', date: '2024-05-01', type: 'Photo Essay', slug: { current: '#' } },
            { _id: '2', title: 'Bridging Pakistan Ground Realities with US Policy at SCP', excerpt: 'How board-level safeguarding frameworks connect global strategy with local execution.', location: 'Karachi / US', date: '2024-04-01', type: 'Field Report', slug: { current: '#' } },
            { _id: '3', title: 'Reading the UN World Drug Report Through a Pakistani Lens', excerpt: 'The UN global findings recontextualized against field observations and local data.', location: 'Pakistan', date: '2024-03-01', type: 'Interview', slug: { current: '#' } },
          ]).map(item => (
            <ArticleCard key={item._id} to={'/journalism/' + (item.slug?.current || '#')} imageUrl={item.coverUrl} category={item.type + ' — ' + item.location} title={item.title} excerpt={item.excerpt} meta={item.date ? new Date(item.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''} placeholderLabel="Field Documentation" />
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="mission-grid" style={{ background: 'var(--gold)', padding: '5rem 3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <blockquote style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem,2.8vw,2.2rem)', fontStyle: 'italic', fontWeight: 300, color: 'var(--green-deep)', lineHeight: 1.5 }}>
          Our ambition in media and journalism is to promote <strong style={{ fontStyle: 'normal', fontWeight: 700, color: 'var(--ink)' }}>responsible, fact-based reporting</strong> that strengthens public awareness and community safety.
        </blockquote>
        <div>
          <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'rgba(15,26,20,.7)', fontWeight: 300, marginBottom: '1.5rem' }}>
            Through ethical journalism and disciplined research, the goal is to build trust, credibility, and long-term impact within the communities we serve.
          </p>
          <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: '.8rem', fontFamily: 'var(--font-mono)', fontSize: '.7rem', letterSpacing: '.12em', textTransform: 'uppercase', background: 'var(--green-deep)', color: 'var(--white)', padding: '1rem 2rem' }}>Our Mission and Vision</Link>
        </div>
      </section>
    </>
  )
}
