import PageHero from '../components/PageHero'
import { Link } from 'react-router-dom'

const SKILLS = [
  { title: 'Software Engineer', desc: 'Self-taught full-stack developer. Built this site from scratch. Comfortable with React, Node.js, APIs, and modern tooling.' },
  { title: 'Photojournalist', desc: 'Field photographer documenting the human cost of drug addiction across Karachi and Pakistan. Published photo essays and interview series.' },
  { title: 'Researcher', desc: 'Data-driven analysis combining field observations with UN, CDC, and national survey data to produce evidence-based narratives.' },
  { title: 'Board Secretary & Consultant', desc: 'Secretary of the Board of Directors at Sawyer Culberson Project, 501(c)(3). Nonprofit governance, international safeguarding, and board-level decision-making across cross-border operations.' },
]

const TIMELINE = [
  { year: '2024', event: 'Appointed Secretary of the Board of Directors — Sawyer Culberson Project, 501(c)(3), United States. February 2024.' },
  { year: '2024', event: 'Launched this personal platform documenting field work, research, and SCP advocacy.' },
  { year: '2024', event: 'Ongoing field documentation — photo essays and interview series from Karachi.' },
  { year: '2023', event: 'Published first field report on Pakistan drug crisis cross-referenced with CDC data.' },
  { year: '2022', event: 'Began systematic documentation of drug addiction in Karachi neighborhoods.' },
  { year: '2021', event: 'Self-taught software engineering — built first production web applications.' },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="Karachi, Pakistan · Secretary, Board of Directors — SCP 501(c)(3)"
        title="ABOUT"
        titleAccent="DANIYAL"
        subtitle="Muhammad Daniyal Siddiqui — Photojournalist, researcher, and Secretary of the Board of Directors at the Sawyer Culberson Project."
      />

      {/* ── Intro ── */}
      <section style={{ background: 'var(--white)', padding: 'var(--section-pad)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start', borderBottom: '1px solid var(--cream-dark)' }}>
        <div>
          <div className="section-tag">Who I Am</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,3.5vw,3rem)', lineHeight: .96, letterSpacing: '.02em', marginBottom: '1.5rem' }}>
            ONE PERSON.<br />
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--green-mid)', fontSize: '.85em' }}>Two nations.</span><br />
            ONE MISSION.
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: '1.2rem', fontWeight: 300 }}>
            I'm Muhammad Daniyal Siddiqui — based in Karachi, Pakistan, and serving as <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Secretary of the Board of Directors</strong> at the Sawyer Culberson Project, a 501(c)(3) nonprofit in the United States, since February 2024.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: '1.2rem', fontWeight: 300 }}>
            My work sits at the intersection of photojournalism, data research, and nonprofit governance. I document the drug addiction crisis on the ground in Pakistan — photographing, interviewing, and reporting — while simultaneously feeding those findings into US-facing policy conversations through my work with SCP.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--text-muted)', fontWeight: 300 }}>
            I'm also a self-taught software engineer, which means I built the tools I needed to tell this story better — including this website.
          </p>
        </div>

        {/* Stats about me */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {[
            ['Full Name', 'Muhammad Daniyal Siddiqui'],
            ['Location', 'Karachi, Pakistan'],
            ['Board Role', 'Secretary, Board of Directors'],
            ['Organization', 'Sawyer Culberson Project · 501(c)(3)'],
            ['Appointed', 'February 2024'],
            ['Focus', 'Drug Addiction · Poverty · Policy'],
            ['Countries', 'Pakistan · United States'],
            ['Skills', 'Engineering · Journalism · Research · Governance'],
          ].map(([label, value]) => (
            <div key={label} style={{ background: 'var(--cream)', padding: '1.2rem 1.5rem', display: 'grid', gridTemplateColumns: '130px 1fr', gap: '1rem', alignItems: 'center', borderLeft: `3px solid ${label === 'Board Role' || label === 'Appointed' ? 'var(--green-mid)' : 'var(--gold)'}` }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</div>
              <div style={{ fontSize: '1rem', color: label === 'Board Role' ? 'var(--green-deep)' : 'var(--ink)', fontWeight: label === 'Board Role' ? 700 : 500 }}>{value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Skills ── */}
      <section style={{ background: 'var(--cream)', padding: 'var(--section-pad)' }}>
        <div className="section-tag">What I Do</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,3rem)', letterSpacing: '.02em', marginBottom: '3rem' }}>SKILLS &amp; EXPERTISE</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2 }}>
          {SKILLS.map(s => (
            <div key={s.title}
              style={{ background: 'var(--white)', padding: '2.5rem 2rem', borderBottom: '3px solid transparent', transition: 'border-color .25s' }}
              onMouseEnter={e => e.currentTarget.style.borderBottomColor = 'var(--gold)'}
              onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'transparent'}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', letterSpacing: '.04em', color: 'var(--green-deep)', marginBottom: '.8rem' }}>{s.title}</h3>
              <p style={{ fontSize: '.92rem', color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 300 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ background: 'var(--green-deep)', padding: 'var(--section-pad)' }}>
        <div className="section-tag" style={{ color: 'var(--gold-light)' }}>Background</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,3rem)', color: 'var(--white)', letterSpacing: '.02em', marginBottom: '3rem' }}>TIMELINE</h2>
        <div style={{ maxWidth: 700 }}>
          {TIMELINE.map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '2rem', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: i < TIMELINE.length - 1 ? '1px solid rgba(255,255,255,.08)' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--gold)', letterSpacing: '.04em' }}>{item.year}</div>
              <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,.65)', lineHeight: 1.8, fontWeight: 300 }}>{item.event}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--gold)', padding: '4rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,2.8rem)', letterSpacing: '.02em', color: 'var(--ink)', marginBottom: '.5rem' }}>WANT TO CONNECT?</h2>
          <p style={{ fontSize: '.95rem', color: 'rgba(15,26,20,.65)', fontWeight: 300 }}>Media inquiries, research collaboration, or SCP partnership opportunities.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="mailto:contact@daniyal.com"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', letterSpacing: '.12em', textTransform: 'uppercase', background: 'var(--green-deep)', color: 'var(--white)', padding: '.85rem 2rem', transition: 'background .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--green-mid)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--green-deep)'}
          >Get in Touch →</a>
          <Link to="/journalism"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', letterSpacing: '.12em', textTransform: 'uppercase', background: 'transparent', color: 'var(--ink)', padding: '.85rem 2rem', border: '1px solid var(--ink)', transition: 'background .2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(15,26,20,.08)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          >View My Work</Link>
        </div>
      </section>
    </>
  )
}
