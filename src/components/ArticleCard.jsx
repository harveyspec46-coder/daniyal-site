import { Link } from 'react-router-dom'

export default function ArticleCard({ to, imageUrl, category, categoryColor = 'var(--green-mid)', title, excerpt, meta, placeholderLabel }) {
  return (
    <Link
      to={to}
      style={{
        background: 'var(--cream)',
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'transform .3s',
        overflow: 'hidden',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {/* Image */}
      <div style={{
        height: 200,
        background: 'var(--green-deep)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {imageUrl ? (
          <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <>
            <div style={{
              position: 'absolute', inset: 0, opacity: .12,
              backgroundImage: 'repeating-linear-gradient(45deg, var(--green-light) 0, var(--green-light) 1px, transparent 0, transparent 50%)',
              backgroundSize: '20px 20px',
            }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', position: 'relative', zIndex: 1 }}>
              {placeholderLabel || '📷 Field Documentation'}
            </span>
          </>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '0 1.5rem 1.5rem' }}>
        {category && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.12em', textTransform: 'uppercase', color: categoryColor, marginTop: '1.2rem', marginBottom: '.5rem' }}>
            {category}
          </div>
        )}
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.35, color: 'var(--green-deep)', marginBottom: '.8rem' }}>
          {title}
        </h3>
        {excerpt && (
          <p style={{ fontSize: '.8rem', color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300, marginBottom: '1rem' }}>
            {excerpt}
          </p>
        )}
        {meta && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.08em', color: 'rgba(0,0,0,.3)', textTransform: 'uppercase' }}>
            {meta}
          </div>
        )}
      </div>
    </Link>
  )
}
