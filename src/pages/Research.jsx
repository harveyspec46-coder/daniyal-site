import { useState, useEffect } from 'react'
import { client } from '../lib/sanityClient'
import { ALL_RESEARCH_QUERY, ALL_STATS_QUERY } from '../lib/queries'
import PageHero from '../components/PageHero'
import StatCard from '../components/StatCard'

const FALLBACK_REPORTS = [
  { _id: '1', title: 'UN World Drug Report', publisher: 'UNODC', publishedAt: '2023-06-01', country: 'Global', pdfUrl: '#' },
  { _id: '2', title: 'Global Opioid Crisis Report', publisher: 'UNODC', publishedAt: '2023-01-01', country: 'Global', pdfUrl: '#' },
  { _id: '3', title: 'NCHS Overdose Deaths Report 2023', publisher: 'CDC / NCHS', publishedAt: '2023-11-01', country: 'United States', pdfUrl: '#' },
  { _id: '4', title: 'Pakistan National Drug Survey', publisher: 'Ministry of Narcotics Control', publishedAt: '2022-01-01', country: 'Pakistan', pdfUrl: '#' },
  { _id: '5', title: 'UN World Drug Report (Urdu)', publisher: 'UNODC', publishedAt: '2023-06-01', country: 'Pakistan', pdfUrl: '#' },
  { _id: '6', title: 'Fentanyl and Opioid Crisis: NCHS Data Brief', publisher: 'NCHS', publishedAt: '2023-08-01', country: 'United States', pdfUrl: '#' },
]

const FALLBACK_STATS = [
  { _id: '1', label: 'NCHS Reported Overdose Deaths', value: '111,466', unit: 'Deaths · 2023', country: 'United States', source: 'CDC / NCHS 2023' },
  { _id: '2', label: 'Opioid-Involved Overdose Deaths', value: '79,000', unit: 'Deaths · 2023', country: 'United States', source: 'NCHS 2023' },
  { _id: '3', label: 'Projected Overdose Deaths', value: '70,000+', unit: 'Projected · 2025', country: 'United States', source: 'NCHS 2025 Estimate' },
  { _id: '4', label: 'Estimated Daily Deaths', value: '700', unit: 'Deaths · Per Day', country: 'Pakistan', source: 'National Survey' },
  { _id: '5', label: 'Estimated Annual Deaths', value: '250,000', unit: 'Deaths · Per Year', country: 'Pakistan', source: 'National Survey' },
  { _id: '6', label: 'National Drug Users', value: '7M', unit: 'Users Nationally', country: 'Pakistan', source: 'Pakistan National Survey' },
]

const COUNTRIES = ['All', 'Global', 'United States', 'Pakistan']

export default function Research() {
  const [reports, setReports] = useState(FALLBACK_REPORTS)
  const [stats, setStats]     = useState(FALLBACK_STATS)
  const [filter, setFilter]   = useState('All')

  useEffect(() => {
    client.fetch(ALL_RESEARCH_QUERY).then(d => { if (d?.length) setReports(d) }).catch(() => {})
    client.fetch(ALL_STATS_QUERY).then(d => { if (d?.length) setStats(d) }).catch(() => {})
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

      {/* Stats */}
      <section style={{ background: 'var(--green-deep)', padding: 'var(--section-pad)' }}>
        <div className="section-tag" style={{ color: 'var(--gold-light)' }}>Key Statistics</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,3rem)', color: 'var(--white)', letterSpacing: '.02em', marginBottom: '3rem' }}>
          THE NUMBERS
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(255,255,255,.06)' }}>
          {stats.map(s => <StatCard key={s._id} {...s} />)}
        </div>
      </section>

      {/* Reports */}
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
          {filtered.map(r => (
            <div key={r._id} style={{ background: 'var(--white)', padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', border: '1px solid var(--cream-dark)', transition: 'border-color .2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--green-light)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--cream-dark)'}
            >
              <div style={{ width: 48, height: 48, background: r.country === 'United States' ? 'rgba(201,168,76,.15)' : r.country === 'Pakistan' ? 'rgba(45,90,61,.15)' : 'rgba(15,26,20,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>
                {r.country === 'United States' ? '🇺🇸' : r.country === 'Pakistan' ? '🇵🇰' : '🌐'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '.4rem' }}>
                  {r.publisher} · {r.publishedAt && new Date(r.publishedAt).getFullYear()}
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 700, color: 'var(--green-deep)', marginBottom: '.6rem', lineHeight: 1.4 }}>{r.title}</h3>
                {r.summary && <p style={{ fontSize: '.8rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '.8rem' }}>{r.summary}</p>}
                <a href={r.pdfUrl || r.externalUrl || '#'} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink)', background: 'var(--gold)', padding: '.4rem 1rem', transition: 'background .2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-light)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--gold)'}
                >
                  ↓ Download PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
