import { useState, useEffect } from 'react'
import { client } from '../lib/sanityClient'
import { ALL_RESEARCH_QUERY } from '../lib/queries'
import PageHero from '../components/PageHero'

const ALL_STATS = [
  { _id: 'u1', label: 'Total Overdose Deaths', value: '69,973', unit: 'Provisional 2025', country: 'United States', source: 'CDC 2025' },
  { _id: 'u2', label: 'Total Overdose Deaths', value: '80,391', unit: 'Deaths 2024', country: 'United States', source: 'CDC 2024' },
  { _id: 'u3', label: 'Total Overdose Deaths', value: '105,007', unit: 'Deaths 2023', country: 'United States', source: 'CDC 2023' },
  { _id: 'u4', label: 'Peak Overdose Deaths', value: '107,941', unit: 'Deaths 2022 Peak', country: 'United States', source: 'CDC 2022' },
  { _id: 'u5', label: 'Fentanyl Share of All Deaths', value: '70%', unit: 'Of All US Drug Fatalities', country: 'United States', source: 'CDC / NIDA' },
  { _id: 'u6', label: 'Cocaine-Involved Deaths', value: '29,449', unit: 'Deaths 2023', country: 'United States', source: 'CDC 2023' },
  { _id: 'u7', label: 'Children With Addicted Parent', value: '1 in 10', unit: 'US Children Affected', country: 'United States', source: 'SAMHSA' },
  { _id: 'u8', label: 'Dual Diagnosis Rate', value: '50%', unit: 'Co-occurring Mental Health', country: 'United States', source: 'SAMHSA' },
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

const US_STATS = ALL_STATS.filter(s => s.country === 'United States')
const PK_STATS = ALL_STATS.filter(s => s.country === 'Pakistan')

// Reports with "featured" having default cream background
const FALLBACK_REPORTS = [
  { _id: '1', title: 'UN World Drug Report', publisher: 'UNODC', publishedAt: '2023-06-01', country: 'Global', pdfUrl: '#', featured: true },
  { _id: '2', title: 'Global Opioid Crisis Report', publisher: 'UNODC', publishedAt: '2022-01-01', country: 'Global', pdfUrl: '#', featured: false },
  { _id: '3', title: 'NCHS Overdose Deaths Report 2023', publisher: 'CDC / NCHS', publishedAt: '2023-11-01', country: 'United States', pdfUrl: '#', featured: false },
  { _id: '4', title: 'Pakistan National Drug Survey', publisher: 'Ministry of Narcotics Control', publishedAt: '2021-01-01', country: 'Pakistan', pdfUrl: '#', featured: true },
  { _id: '5', title: 'Fentanyl and Opioid Crisis: NCHS Data Brief', publisher: 'NCHS', publishedAt: '2023-08-01', country: 'United States', pdfUrl: '#', featured: false },
  { _id: '6', title: 'UN World Drug Report', publisher: 'UNODC', publishedAt: '2023-06-01', country: 'Pakistan', pdfUrl: '#', featured: true },
]

const COUNTRIES = ['All', 'Global', 'United States', 'Pakistan']

function StatScroll({ stats, label, labelColor }) {
  const doubled = [...stats, ...stats]
  return (
    <div style={{ marginBottom: '2px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.2em', textTransform: 'uppercase', color: labelColor, padding: '.8rem 3rem', background: 'rgba(0,0,0,.2)', display: 'flex', alignItems: 'center', gap: '.8rem' }}>
        <span style={{ width: 20, height: 2, background: labelColor, display: 'inline-block' }} />
        {label}
      </div>
      <div style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', animation: 'statsScroll 40s linear infinite', width: 'max-content' }}>
          {doubled.map((stat, i) => (
            <div key={i} style={{ background: 'var(--ink)', padding: '2.5rem 2.5rem', flexShrink: 0, width: '300px', borderRight: '1px solid rgba(255,255,255,.06)', position: 'relative', transition: 'background .25s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#162010'; e.currentTarget.parentElement.style.animationPlayState = 'paused' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.parentElement.style.animationPlayState = 'running' }}
            >
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: labelColor }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.55rem', letterSpacing: '.1em', textTransform: 'uppercase', padding: '.2rem .6rem', marginBottom: '.8rem', display: 'inline-block', background: stat.country === 'United States' ? 'rgba(201,168,76,.12)' : 'rgba(122,184,147,.1)', color: labelColor, border: `1px solid ${stat.country === 'United States' ? 'rgba(201,168,76,.3)' : 'rgba(122,184,147,.25)'}` }}>
                {stat.source}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,4vw,3.5rem)', color: 'var(--white)', lineHeight: 1, marginBottom: '.5rem' }}>{stat.value}</div>
              <div style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.6)', fontWeight: 300, lineHeight: 1.4, marginBottom: '.4rem' }}>{stat.label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.08em', color: labelColor, textTransform: 'uppercase' }}>{stat.unit}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

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

      {/* Animated stats */}
      <section style={{ background: 'var(--green-deep)', padding: '5rem 0' }}>
        <div style={{ padding: '0 3rem', marginBottom: '3rem' }}>
          <div className="section-tag" style={{ color: 'var(--gold-light)' }}>Key Statistics</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,4vw,3.8rem)', color: 'var(--white)', letterSpacing: '.02em' }}>THE NUMBERS</h2>
        </div>
        <StatScroll stats={US_STATS} label="United States — CDC / NIDA / SAMHSA" labelColor="var(--gold)" />
        <StatScroll stats={PK_STATS} label="Pakistan — UNODC / Ministry of Narcotics / ANF" labelColor="var(--green-light)" />
      </section>

      {/* Reports */}
      <section style={{ background: 'var(--cream)', padding: '6rem 3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="section-tag">Published Reports</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,3.5vw,3rem)', letterSpacing: '.02em' }}>REPORTS &amp; PUBLICATIONS</h2>
          </div>
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
            {COUNTRIES.map(c => (
              <button key={c} onClick={() => setFilter(c)} style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.1em', textTransform: 'uppercase', padding: '.45rem 1rem', border: filter === c ? '1px solid var(--green-mid)' : '1px solid var(--cream-dark)', background: filter === c ? 'var(--green-deep)' : 'transparent', color: filter === c ? 'var(--white)' : 'var(--text-muted)', cursor: 'pointer', transition: 'all .2s' }}>{c}</button>
            ))}
          </div>
        </div>

        <div className="report-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2 }}>
          {filtered.map(r => (
            <div key={r._id} style={{
              background: r.featured ? 'var(--white)' : 'var(--cream)',
              padding: '2rem',
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'flex-start',
              border: r.featured ? '1px solid var(--cream-dark)' : '1px solid transparent',
              transition: 'border-color .2s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--green-light)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = r.featured ? 'var(--cream-dark)' : 'transparent'}
            >
              <div style={{ width: 52, height: 52, background: r.country === 'United States' ? 'rgba(201,168,76,.15)' : r.country === 'Pakistan' ? 'rgba(45,90,61,.15)' : 'rgba(15,26,20,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0, borderRadius: 4 }}>
                {r.country === 'United States' ? '🇺🇸' : r.country === 'Pakistan' ? '🇵🇰' : '🌐'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '.5rem' }}>
                  {r.publisher} · {r.publishedAt && new Date(r.publishedAt).getFullYear()}
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--green-deep)', marginBottom: '.8rem', lineHeight: 1.4 }}>{r.title}</h3>
                {r.summary && <p style={{ fontSize: '.9rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>{r.summary}</p>}
                <a href={r.pdfUrl || r.externalUrl || '#'} target="_blank" rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink)', background: 'var(--gold)', padding: '.5rem 1.2rem', transition: 'background .2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-light)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--gold)'}
                >Download PDF</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
