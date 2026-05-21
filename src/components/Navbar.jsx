import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/',                    label: 'Home' },
  { to: '/documented-research', label: 'Documented Research' },
  { to: '/international-work',  label: 'International Work' },
  { to: '/journalism',          label: 'Journalism' },
  { to: '/about',               label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 3rem', height: 'var(--nav-height)',
      background: scrolled ? 'rgba(15,26,20,0.98)' : 'rgba(15,26,20,0.96)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(201,168,76,0.15)',
      transition: 'background .3s',
    }}>
      {/* Brand */}
      <Link to="/" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', letterSpacing: '.06em', color: 'var(--white)', lineHeight: 1 }}>
        VOICE OF <span style={{ color: 'var(--gold)' }}>DANIYAL</span><span style={{ color: 'var(--gold)' }}>.</span>
      </Link>

      {/* Secretary badge */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '.52rem',
        letterSpacing: '.12em',
        textTransform: 'uppercase',
        color: 'rgba(201,168,76,.7)',
        borderLeft: '1px solid rgba(201,168,76,.2)',
        paddingLeft: '1.2rem',
        lineHeight: 1.6,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Secretary, Board of Directors</span>
        <span>Sawyer Culberson Project · 501(c)(3)</span>
      </div>

      {/* Desktop links */}
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-mono)',
                fontSize: '.65rem',
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--gold)' : 'rgba(255,255,255,.6)',
                textDecoration: 'none',
                transition: 'color .2s',
                paddingBottom: '2px',
                borderBottom: isActive ? '1px solid var(--gold)' : '1px solid transparent',
              })}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Donate CTA */}
      <a
        href="https://sawyer-culberson-project.org/donate"
        target="_blank"
        rel="noreferrer"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '.65rem',
          letterSpacing: '.12em',
          textTransform: 'uppercase',
          background: 'var(--gold)',
          color: 'var(--ink)',
          padding: '.5rem 1.3rem',
          fontWeight: 500,
          transition: 'background .2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-light)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--gold)'}
      >
        Donate
      </a>
    </nav>
  )
}
