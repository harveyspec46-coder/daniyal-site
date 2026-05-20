const items = [
  '111,466 CDC reported overdose deaths — US 2023',
  '79,000 opioid-involved deaths — US 2023',
  '70,000+ projected overdose deaths — US 2025',
  '700 estimated daily drug deaths — Pakistan',
  '250,000 estimated annual deaths — Pakistan',
  '7,000,000 drug users nationally — Pakistan',
  'UN World Drug Report — Available for download',
]

export default function Ticker() {
  const doubled = [...items, ...items]

  return (
    <div style={{
      background: 'var(--gold)',
      height: 40,
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        background: 'var(--green-deep)',
        color: 'var(--gold)',
        fontFamily: 'var(--font-mono)',
        fontSize: '.6rem',
        letterSpacing: '.18em',
        textTransform: 'uppercase',
        padding: '0 1.2rem',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        fontWeight: 500,
      }}>
        Live Data
      </div>

      <div style={{ overflow: 'hidden', flex: 1 }}>
        <div style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: 'tickerScroll 38s linear infinite',
        }}>
          {doubled.map((item, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '.65rem',
              letterSpacing: '.08em',
              color: 'var(--ink)',
              padding: '0 2.5rem',
              fontWeight: 500,
            }}>
              ● {item}
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
