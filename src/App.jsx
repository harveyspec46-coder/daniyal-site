import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Dynamic Navigation */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.5rem', height: '64px',
        background: 'rgba(15,26,20,.96)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(201,168,76,.15)'
      }}>
        <Link to="/" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '.08em', color: 'var(--white)' }}>
          DANIYAL<span style={{ color: 'var(--gold)' }}>.</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="https://sawyer-culberson-project.org/donate" target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.14em', textTransform: 'uppercase', background: 'var(--gold)', color: 'var(--ink)', padding: '.5rem 1rem' }}>Donate</a>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'flex', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer' }}>
            <span style={{ display: 'block', width: 24, height: 2, background: 'var(--white)' }} />
            <span style={{ display: 'block', width: 24, height: 2, background: 'var(--white)' }} />
            <span style={{ display: 'block', width: 24, height: 2, background: 'var(--white)' }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay — Fixed Sizing */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: '64px 0 0 0', background: 'rgba(15,26,20,.98)', zIndex: 99, display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem', gap: '1rem' }}>
          {['Home', 'Documented Research', 'International Work', 'Journalism', 'About'].map((label) => (
            <Link key={label} to={label === 'Home' ? '/' : '/' + label.toLowerCase().replace(' ', '-')} onClick={() => setMenuOpen(false)} style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--white)', borderBottom: '1px solid rgba(255,255,255,.08)', paddingBottom: '0.5rem' }}>{label}</Link>
          ))}
        </div>
      )}

      {/* Main Landing Responsive Grid */}
      <div style={{ paddingTop: '64px' }}>
        <div className="pages-grid">
          
          {/* Tile 1 — Journalism */}
          <Link to="/journalism" className="tile-span" style={{ background: 'var(--green-deep)', color: 'var(--white)' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.75rem', opacity: 0.4 }}>01</span>
              <h2 className="hero-h1" style={{ fontFamily: 'var(--font-display)', lineHeight: 1, marginTop: '1rem' }}>JOURNALISM</h2>
            </div>
            <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,0.7)', maxWidth: '300px', marginTop: '1rem' }}>Photo essays, field reports, and interviews documenting the drug addiction crisis. Raw. Real. Evidence-based.</p>
          </Link>

          {/* Tile 2 — Documented Research */}
          <Link to="/documented-research" style={{ background: 'var(--cream-dark)', color: 'var(--ink)', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '300px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.75rem', opacity: 0.4 }}>02</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', lineHeight: 1, marginTop: '1rem' }}>DOCUMENTED RESEARCH</h2>
            </div>
            <p style={{ fontSize: '.9rem', color: 'var(--text-muted)', marginTop: '1rem' }}>UN reports, CDC data, and field findings.</p>
          </Link>

          {/* Tile 3 — International Work */}
          <Link to="/international-work" style={{ background: 'var(--gold)', color: 'var(--ink)', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '300px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.75rem', opacity: 0.4 }}>03</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', lineHeight: 1, marginTop: '1rem' }}>INTERNATIONAL WORK</h2>
            </div>
            <p style={{ fontSize: '.9rem', color: 'rgba(15,26,20,0.7)', marginTop: '1rem' }}>Board-level work with SCP 501(c)(3).</p>
          </Link>

          {/* Tile 4 — About */}
          <Link to="/about" style={{ background: 'var(--green-mid)', color: 'var(--white)', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '300px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.75rem', opacity: 0.4 }}>04</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', lineHeight: 1, marginTop: '1rem' }}>ABOUT DANIYAL</h2>
            </div>
            <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,0.7)', marginTop: '1rem' }}>Background, skills, and the story behind bridging two nations.</p>
          </Link>

        </div>
      </div>
    </div>
  )
}
