export default function StatCard({ label, value, unit, country, source }) {
  const isUS = country === 'United States'
  const accentColor = isUS ? 'var(--gold)' : 'var(--green-light)'
  const flagBg = isUS ? 'rgba(201,168,76,.12)' : 'rgba(122,184,147,.1)'
  const flagBorder = isUS ? 'rgba(201,168,76,.3)' : 'rgba(122,184,147,.25)'
  const flag = isUS ? '🇺🇸 United States' : country === 'Pakistan' ? '🇵🇰 Pakistan' : '🌐 Global'

  return (
    <div style={{
      background: 'var(--ink)',
      padding: '2rem 1.8rem',
      position: 'relative',
      overflow: 'hidden',
      transition: 'background .25s',
      cursor: 'default',
    }}
      onMouseEnter={e => e.currentTarget.style.background = '#162010'}
      onMouseLeave={e => e.currentTarget.style.background = 'var(--ink)'}
    >
      {/* Left accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: 3, background: accentColor,
      }} />

      {/* Bottom accent bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 2, background: accentColor,
        transformOrigin: 'left',
        animation: 'growBar 1.5s ease forwards',
      }} />

      <div style={{
        display: 'inline-block',
        fontFamily: 'var(--font-mono)',
        fontSize: '.55rem',
        letterSpacing: '.12em',
        textTransform: 'uppercase',
        padding: '.2rem .6rem',
        marginBottom: '.8rem',
        background: flagBg,
        color: accentColor,
        border: `1px solid ${flagBorder}`,
      }}>
        {flag}
      </div>

      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2.5rem,4vw,3.8rem)',
        color: 'var(--white)',
        lineHeight: 1,
        letterSpacing: '.02em',
        marginBottom: '.4rem',
      }}>
        {value}
      </div>

      <div style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.55)', fontWeight: 300, marginBottom: '.4rem' }}>
        {label}
      </div>

      {unit && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.08em', color: accentColor, textTransform: 'uppercase', marginBottom: '.4rem' }}>
          {unit}
        </div>
      )}

      {source && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.06em', color: 'rgba(255,255,255,.25)', textTransform: 'uppercase', marginTop: '.4rem' }}>
          Source: {source}
        </div>
      )}

      <style>{`@keyframes growBar { from{transform:scaleX(0)} to{transform:scaleX(1)} }`}</style>
    </div>
  )
}
