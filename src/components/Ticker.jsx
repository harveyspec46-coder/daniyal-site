const items = [
  'US 2025: 69,973 provisional overdose deaths',
  'US 2024: 80,391 total overdose deaths — a 27% drop',
  'US 2023: 105,007 overdose deaths reported',
  'US 2022 Peak: 107,941 overdose deaths',
  'Fentanyl accounts for 70% of all US drug fatalities',
  'Pakistan: 700 estimated drug deaths every single day',
  'Pakistan: 250,000 estimated annual drug deaths',
  'Pakistan: 7.6 million active drug users nationally',
  'Pakistan: 78% of drug users are primary breadwinners',
  'Pakistan HIV rate among injecting drug users: 40%',
  'UN World Drug Report — Available for download',
]

export default function Ticker() {
  const doubled = [...items, ...items]
  return (
    <div style={{
      background: 'var(--gold)',
      height: 48,
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      borderTop: '2px solid rgba(0,0,0,.1)',
    }}>
      <div style={{
        background: 'var(--green-deep)',
        color: 'var(--gold)',
        fontFamily: 'var(--font-mono)',
        fontSize: '.68rem',
        letterSpacing: '.2em',
        textTransform: 'uppercase',
        padding: '0 1.5rem',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        fontWeight: 500,
        borderRight: '2px solid rgba(201,168,76,.3)',
      }}>
        Live Data
      </div>

      <div style={{ overflow: 'hidden', flex: 1 }}>
        <div style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: 'tickerScroll 90s linear infinite',
          alignItems: 'center',
        }}>
          {doubled.map((item, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '.72rem',
              letterSpacing: '.06em',
              color: 'var(--ink)',
              padding: '0 3rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '.8rem',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ink)', opacity: .4, flexShrink: 0 }} />
              {item}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
