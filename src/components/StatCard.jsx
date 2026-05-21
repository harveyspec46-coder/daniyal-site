export default function StatCard({ label, value, unit, country, source }) {
  const isUS = country === 'United States'
  const accentColor = isUS ? 'var(--gold)' : 'var(--green-light)'
  const flagBg = isUS ? 'rgba(201,168,76,.12)' : 'rgba(122,184,147,.1)'
  const flagBorder = isUS ? 'rgba(201,168,76,.3)' : 'rgba(122,184,147,.25)'
  const flag = isUS ? '🇺🇸 United States' : country === 'Pakistan' ? '🇵🇰 Pakistan' : '🌐 Global'

  return (
    <div style={{
      background: 'var(--ink)',
      padding: '2.5rem 2rem',
      position: 'relative',
      overflow: 'hidden',
      flexShrink: 0,
      width: '340px',
      borderRight: '1px solid rgba(255,255,255,.06)',
    }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: accentColor }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: accentColor, transformOrigin: 'left', animation: 'growBar 1.5s ease forwards' }} />

      <div style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.12em', textTransform: 'uppercase', padding: '.25rem .7rem', marginBottom: '1rem', background: flagBg, color: accentColor, border: `1px solid ${flagBorder}` }}>
        {flag}
      </div>

      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,5vw,4.2rem)', color: 'var(--white)', lineHeight: 1, letterSpacing: '.02em', marginBottom: '.6rem' }}>
        {value}
      </div>

      <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,.65)', fontWeight: 300, marginBottom: '.5rem', lineHeight: 1.4 }}>
        {label}
      </div>

      {unit && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.1em', color: accentColor, textTransform: 'uppercase', marginBottom: '.4rem' }}>
          {unit}
        </div>
      )}

      {source && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.06em', color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', marginTop: '.5rem' }}>
          Source: {source}
        </div>
      )}

      <style>{`@keyframes growBar{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
    </div>
  )
}
