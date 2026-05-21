import { useState, useEffect } from 'react'
import { client } from '../lib/sanityClient'
import { ALL_RESEARCH_QUERY, ALL_STATS_QUERY } from '../lib/queries'
import PageHero from '../components/PageHero'
import StatCard from '../components/StatCard'

const FALLBACK_REPORTS = [
  { _id: '1', title: 'UN World Drug Report', publisher: 'UNODC', publishedAt: '2023-06-01', country: 'Global', pdfUrl: '#' },
  { _id: '2', title: 'Global Opioid Crisis Report', publisher: 'UNODC', publishedAt: '2023-01-01', country: 'Global', pdfUrl: '#' },
  { _id: '3', title: 'NCHS Overdose Deaths Report 2023', publisher: 'CDC / NCHS', publishedAt: '2023-11-01', country: 'United States', pdfUrl: '#' },
  { _id: '4', title: 'Pakistan National Drug Survey', publisher: 'Ministry of Narcotics Control', publishedAt: '2021-01-01', country: 'Pakistan', pdfUrl: '#' },
  { _id: '5', title: 'Fentanyl and Opioid Crisis: NCHS Data Brief', publisher: 'NCHS', publishedAt: '2023-08-01', country: 'United States', pdfUrl: '#' },
]

// All 17 stats — US and Pakistan separated
const US_STATS = [
  { _id: 'us1', label: 'Provisional Overdose Deaths', value: '69,973', unit: 'Deaths · 2025', country: 'United States', source: 'CDC / NCHS 2025' },
  { _id: 'us2', label: 'Total Overdose Deaths', value: '80,391', unit: 'Deaths · 2024', country: 'United States', source: 'CDC / NCHS 2024' },
  { _id: 'us3', label: 'Overdose Deaths Reported', value: '105,007', unit: 'Deaths · 2023', country: 'United States', source: 'CDC / NCHS 2023' },
  { _id: 'us4', label: 'Peak Overdose Deaths', value: '107,941', unit: 'Deaths · 2022 Peak', country: 'United States', source: 'CDC / NCHS 2022' },
  { _id: 'us5', label: 'Fentanyl Share of Drug Fatalities', value: '70%', unit: 'Of All US Drug Deaths', country: 'United States', source: 'NIDA 2023' },
  { _id: 'us6', label: 'Cocaine-Involved Deaths', value: '29,449', unit: 'Deaths · 2023', country: 'United States', source: 'CDC 2023' },
  { _id: 'us7', label: 'Children with Addicted Parent', value: '1 in 10', unit: 'US Children Affected', country: 'United States', source: 'SAMHSA 2023' },
  { _id: 'us8', label: 'Co-occurring Mental Health', value: '50%', unit: 'Of Treatment Seekers', country: 'United States', source: 'SAMHSA 2023' },
]

const PK_STATS = [
  { _id: 'pk1', label: 'Regular Drug Users', value: '7.6M', unit: 'Nationally', country: 'Pakistan', source: 'Pakistan National Survey' },
  { _id: 'pk2', label: 'Estimated Daily Deaths', value: '700', unit: 'Deaths · Per Day', country: 'Pakistan', source: 'National Survey' },
  { _id: 'pk3', label: 'Estimated Annual Deaths', value: '250,000', unit: 'Deaths · Per Year', country: 'Pakistan', source: 'National Survey' },
  { _id: 'pk4', label: 'New Users Added Annually', value: '45,000+', unit: 'New Users Per Year', country: 'Pakistan', source: 'Ministry of Narcotics' },
  { _id: 'pk5', label: 'Heavy Opiate Users', value: '2.7M', unit: 'Opiate Dependent', country: 'Pakistan', source: 'Pakistan National Survey' },
  { _id: 'pk6', label: 'Users Who Are Breadwinners', value: '78%', unit: 'Primary Earners', country: 'Pakistan', source: 'Pakistan National Survey' },
  { _id: 'pk7', label: 'Dependents Per User', value: '6–8', unit: 'People Affected Per User', country: 'Pakistan', source: 'Pakistan National Survey' },
  { _id: 'pk8', label: 'Injecting Drug Users', value: '500,000+', unit: 'Active IDUs', country: 'Pakistan', source: 'Pakistan National Survey' },
  { _id: 'pk9', label: 'HIV Rate Among IDUs', value: '40%', unit: 'HIV Positive', country: 'Pakistan', source: 'UNAIDS / National Survey' },
]

const COUNTRIES = ['All', 'Global', 'United States', 'Pakistan']

export default function Research() {
  const [reports, setReports] = useState(FALLBACK_REPORTS)
  const [filter, setFilter]   = useState('All')

  useEffect(() => {
    client.fetch(ALL_RESEARCH_QUERY).then(d => { if (d?.length) setReports(d) }).catch(() => {})
  }, [])

  const filtered = filter === 'All' ? reports : reports.filter(r => r.country === filter)

  return (
    <>
      <PageHero
        eyebrow="Data · UN Reports · Field Findings"
        title="DOCUMENTED"
        titleAccent="RESEARCH"
        subtitle="UN reports, CDC data, field analysis and academic research — all in one place."
      />

      {/* ── STATS: Animated Scroll ── */}
      <section style={{ background: 'var(--green-deep)', padding: 'var(--section-pad)', overflow: 'hidden' }}>
        <div className="section-tag" style={{ color: 'var(--gold-light)' }}>Key Statistics</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,3rem)', color: 'var(--white)', letterSpacing: '.02em', marginBottom: '2.5rem' }}>
          THE NUMBERS
        </h2>

        {/* US Row */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '.8rem' }}>
            <span>🇺🇸</span> United States
          </div>
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            <div className="stats-scroll-us" style={{ display: 'flex', gap: 2 }}>
              {[...US_STATS, ...US_STATS].map((s, i) => (
                <StatCard key={`us-${i}`} {...s} />
              ))}
            </div>
          </div>
        </div>

        {/* Pakistan Row */}
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--green-light)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '.8rem' }}>
            <span>🇵🇰</span> Pakistan
          </div>
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            <div className="stats-scroll-pk" style={{ display: 'flex', gap: 2 }}>
              {[...PK_STATS, ...PK_STATS].map((s, i) => (
                <StatCard key={`pk-${i}`} {...s} />
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .stats-scroll-us {
            animation: statsScrollLeft 35s linear infinite;
            width: max-content;
          }
          .stats-scroll-pk {
            animation: statsScrollLeft 42s linear infinite reverse;
            width: max-content;
          }
          .stats-scroll-us:hover,
          .stats-scroll-pk:hover {
            animation-play-state: paused;
          }
          @keyframes statsScrollLeft {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ── REPORTS ── */}
      <section style={{ background: 'var(--cream)', padding: 'var(--section-pad)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="section-tag">Published Reports</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,3rem)', letterSpacing: '.02em' }}>REPORTS &amp; PUBLICATIONS</h2>
          </div>
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
            {COUNTRIES.map(c => (
              <button key={c} onClick={() => setFilter(c)} style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.1em', textTransform: 'uppercase', padding: '.4rem 1rem', border: filter === c ? '1px solid var(--green-mid)' : '1px solid var(--cream-dark)', background: filter === c ? 'var(--green-deep)' : 'transparent', color: filter === c ? 'var(--white)' : 'var(--text-muted)', cursor: 'pointer', transition: 'all .2s' }}>{c}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2 }}>
          {filtered.map(r => {
            // Cards 2,3,6 (index 1,2,5 in 1-based) get default cream/white style
            const idx = FALLBACK_REPORTS.findIndex(x => x._id === r._id)
            const isDefaultStyle = idx === 1 || idx === 2 || idx === 4 // IDs: UNODC Global, CDC, NCHS (replacing 5th)

            return (
              <div key={r._id}
                style={{
                  background: 'var(--white)',
                  padding: '2rem',
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'flex-start',
                  border: '1px solid var(--cream-dark)',
                  transition: 'border-color .2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--green-light)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--cream-dark)'}
              >
                <div style={{
                  width: 48, height: 48,
                  background: 'var(--cream)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.4rem', flexShrink: 0,
                }}>
                  {r.country === 'United States' ? '🇺🇸' : r.country === 'Pakistan' ? '🇵🇰' : '🌐'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '.4rem' }}>
                    {r.publisher} · {r.publishedAt && new Date(r.publishedAt).getFullYear()}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 700, color: 'var(--green-deep)', marginBottom: '.6rem', lineHeight: 1.4 }}>{r.title}</h3>
                  {r.summary && <p style={{ fontSize: '.8rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '.8rem' }}>{r.summary}</p>}
                  <a href={r.pdfUrl || r.externalUrl || '#'} target="_blank" rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink)', background: 'var(--gold)', padding: '.4rem 1rem', transition: 'background .2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-light)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--gold)'}
                  >
                    ↓ Download PDF
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
