export default function PageHero({ eyebrow, title, titleAccent, subtitle }) {
  return (
    <section style={{
      background: 'var(--green-deep)',
      paddingTop: 'calc(var(--nav-height) + 5rem)',
      paddingBottom: '5rem',
      paddingLeft: '3rem',
      paddingRight: '3rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* decorative letter */}
      <div aria-hidden="true" style={{
        position: 'absolute', right: '-4%', top: '-10%',
        fontFamily: 'var(--font-display)',
        fontSize: '30vw',
        color: 'rgba(255,255,255,.022)',
        lineHeight: 1,
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        {title?.[0]}
      </div>

      {eyebrow && (
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '.65rem',
          letterSpacing: '.22em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '.8rem',
        }}>
          <span style={{ width: 32, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
          {eyebrow}
        </div>
      )}

      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(3.5rem, 7vw, 6rem)',
        lineHeight: .96,
        letterSpacing: '.02em',
        color: 'var(--white)',
        maxWidth: 800,
        marginBottom: subtitle ? '1.5rem' : 0,
      }}>
        {title}
        {titleAccent && <span style={{ color: 'var(--gold)' }}> {titleAccent}</span>}
      </h1>

      {subtitle && (
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.1rem',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'rgba(255,255,255,.6)',
          lineHeight: 1.8,
          maxWidth: 600,
          marginTop: '1rem',
        }}>
          {subtitle}
        </p>
      )}
    </section>
  )
}
