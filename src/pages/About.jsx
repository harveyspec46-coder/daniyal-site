import PageHero from '../components/PageHero'
import { Link } from 'react-router-dom'

const SKILLS = [
  { title: 'Secretary, Board of Directors', desc: 'Serving as Secretary of the Board of Directors at the Sawyer Culberson Project 501(c)(3), responsible for governance documentation, board communications, PSEA frameworks, and international safeguarding protocols across Pakistan and US operations.', highlight: true },
  { title: 'Board Member', desc: 'Active board member of the Sawyer Culberson Project, a US-based nonprofit. Responsible for strategic direction, policy oversight, and bridging international field operations between Pakistan and the United States.' },
  { title: 'Photojournalist', desc: 'Field photographer documenting the human cost of drug addiction across Karachi and Pakistan. Published photo essays and interview series bringing ground-level evidence to international audiences.' },
  { title: 'Researcher', desc: 'Data-driven analysis combining field observations with UN, CDC, NCHS, and national survey data to produce evidence-based narratives on drug addiction and poverty.' },
  { title: 'Software Engineer', desc: 'Self-taught full-stack developer. Built this platform from scratch using React, Sanity CMS, and Vercel. Comfortable with modern web tooling, APIs, and production deployments.' },
  { title: 'Consultant', desc: 'Nonprofit strategy and international safeguarding consultant. Advises on cross-border operations, PSEA compliance, and community-facing policy implementation.' },
]

const TIMELINE = [
  { year: '2024', event: 'Appointed Secretary, Board of Directors — Sawyer Culberson Project 501(c)(3), United States.' },
  { year: '2024', event: 'Launched this personal platform documenting field work, research, and SCP advocacy.' },
  { year: '2024', event: 'Ongoing field documentation — photo essays and interview series from Karachi.' },
  { year: '2023', event: 'Board Member appointment at Sawyer Culberson Project, 501(c)(3), United States.' },
  { year: '2023', event: 'Published first field report on Pakistan drug crisis cross-referenced with CDC and UNODC data.' },
  { year: '2022', event: 'Began systematic documentation of drug addiction in Karachi neighborhoods.' },
  { year: '2021', event: 'Self-taught software engineering — built first production web applications.' },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="Secretary & Board Member — SCP 501(c)(3) · Karachi, Pakistan"
        title="ABOUT"
        titleAccent="DANIYAL"
        subtitle="Secretary of the Board of Directors, photojournalist, researcher — one person documenting a crisis that crosses two nations."
      />

      {/* Intro */}
      <section className="inner-two-col" style={{ background: 'var(--white)', padding: '6rem 3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start', borderBottom: '1px solid var(--cream-dark)' }}>
        <div>
          <div className="section-tag">Who I Am</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,4vw,3.8rem)', lineHeight: .96, letterSpacing: '.02em', marginBottom: '1.5rem' }}>
            ONE PERSON.<br />
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--green-mid)', fontSize: '.85em' }}>Two nations.</span><br />
            ONE MISSION.
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: '1.2rem', fontWeight: 300 }}>
            I am Daniyal — based in Karachi, Pakistan, and serving as Secretary of the Board of Directors of the Sawyer Culberson Project, a 501(c)(3) nonprofit registered in the United States.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: '1.2rem', fontWeight: 300 }}>
            My work sits at the intersection of photojournalism, data research, and nonprofit governance. I document the drug addiction crisis on the ground in Pakistan — photographing, interviewing, and reporting — while simultaneously feeding those findings into US-facing policy conversations through my work with SCP.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--text-muted)', fontWeight: 300 }}>
            I am also a self-taught software engineer, which means I built the tools I needed to tell this story better — including this website.
          </p>
        </div>

        {/* Facts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {[
            ['Primary Role', 'Secretary, Board of Directors — SCP 501(c)(3)'],
            ['Also Serving As', 'Board Member — SCP 501(c)(3)'],
            ['Location', 'Karachi, Pakistan'],
            ['Nonprofit', 'Sawyer Culberson Project — United States'],
            ['Focus', 'Drug Addiction · Poverty · Policy'],
            ['Countries', 'Pakistan · United States'],
            ['Skills', 'Engineering · Journalism · Research · Consulting'],
          ].map(([label, value]) => (
            <div key={label} className="about-facts" style={{ background: 'var(--cream)', padding: '1.2rem 1.5rem', display: 'grid', gridTemplateColumns: '150px 1fr', gap: '1rem', alignItems: 'center', borderLeft: '3px solid var(--gold)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</div>
              <div style={{ fontSize: '.95rem', color: 'var(--ink)', fontWeight: 500 }}>{value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section style={{ background: 'var(--cream)', padding: '6rem 3rem' }}>
        <div className="section-tag">What I Do</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,4vw,3.5rem)', letterSpacing: '.02em', marginBottom: '3rem' }}>ROLES &amp; EXPERTISE</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 2 }}>
          {SKILLS.map(s => (
            <div key={s.title} style={{
              background: s.highlight ? 'var(--green-deep)' : 'var(--white)',
              padding: '2.5rem 2rem',
              borderBottom: s.highlight ? '3px solid var(--gold)' : '3px solid transparent',
              transition: 'border-color .25s',
              position: 'relative',
            }}
              onMouseEnter={e => { if (!s.highlight) e.currentTarget.style.borderBottomColor = 'var(--gold)' }}
              onMouseLeave={e => { if (!s.highlight) e.currentTarget.style.borderBottomColor = 'transparent' }}
            >
              {s.highlight && (
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.8rem' }}>Primary Role</div>
              )}
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', letterSpacing: '.04em', color: s.highlight ? 'var(--white)' : 'var(--green-deep)', marginBottom: '.8rem' }}>{s.title}</h3>
              <p style={{ fontSize: '.95rem', color: s.highlight ? 'rgba(255,255,255,.65)' : 'var(--text-muted)', lineHeight: 1.8, fontWeight: 300 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: 'var(--green-deep)', padding: '6rem 3rem' }}>
        <div className="section-tag" style={{ color: 'var(--gold-light)' }}>Background</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,4vw,3.5rem)', color: 'var(--white)', letterSpacing: '.02em', marginBottom: '3rem' }}>TIMELINE</h2>
        <div className="timeline-col" style={{ maxWidth: 700 }}>
          {TIMELINE.map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '2rem', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: i < TIMELINE.length - 1 ? '1px solid rgba(255,255,255,.08)' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--gold)', letterSpacing: '.04em' }}>{item.year}</div>
              <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,.65)', lineHeight: 1.8, fontWeight: 300 }}>{item.event}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--gold)', padding: '4rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,2.8rem)', letterSpacing: '.02em', color: 'var(--ink)', marginBottom: '.5rem' }}>WANT TO CONNECT?</h2>
          <p style={{ fontSize: '1rem', color: 'rgba(15,26,20,.65)', fontWeight: 300 }}>Media inquiries, research collaboration, or SCP partnership opportunities.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="mailto:contact@daniyal.com"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', letterSpacing: '.12em', textTransform: 'uppercase', background: 'var(--green-deep)', color: 'var(--white)', padding: '.9rem 2rem', transition: 'background .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--green-mid)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--green-deep)'}
          >Get in Touch</a>
          <Link to="/journalism"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', letterSpacing: '.12em', textTransform: 'uppercase', background: 'transparent', color: 'var(--ink)', padding: '.9rem 2rem', border: '1px solid var(--ink)', transition: 'background .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(15,26,20,.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >View My Work</Link>
        </div>
      </section>
    </>
  )
}
