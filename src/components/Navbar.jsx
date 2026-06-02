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
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 3rem', height: 'var(--nav-height)',
        background: scrolled ? 'rgba(15,26,20,.99)' : 'rgba(15,26,20,.96)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(201,168,76,.15)',
        transition: 'background .3s',
      }}>
        {/* Brand */}
        <Link to="/" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '.08em', color: 'var(--white)', flexShrink: 0 }}>
          DANIYAL<span style={{ color: 'var(--gold)' }}>.</span>
        </Link>

        {/* Desktop links */}
        <ul className="nav-links" style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'}
                style={({ isActive }) => ({
                  fontFamily: 'var(--font-mono)',
                  fontSize: '.65rem',
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--gold)' : 'rgba(255,255,255,.6)',
                  transition: 'color .2s',
                  paddingBottom: '2px',
                  borderBottom: isActive ? '1px solid var(--gold)' : '1px solid transparent',
                })}
              >{label}</NavLink>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Donate */}
          <a href="https://sawyer-culberson-project.org/donate" target="_blank" rel="noreferrer"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.14em', textTransform: 'uppercase', background: 'var(--gold)', color: 'var(--ink)', padding: '.5rem 1.2rem', fontWeight: 500, transition: 'background .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-light)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--gold)'}
          >Donate</a>

          {/* Hamburger — mobile only */}
          <button
            className="nav-mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: 24, height: 2,
                background: 'var(--white)',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px,5px)'
                  : i === 1 ? 'scaleX(0)'
                  : 'rotate(-45deg) translate(5px,-5px)'
                  : 'none',
                transition: 'transform .25s',
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 'var(--nav-height)', left: 0, right: 0, bottom: 0,
          background: 'rgba(15,26,20,.98)',
          zIndex: 99,
          display: 'flex', flexDirection: 'column',
          padding: '3rem 2rem',
          gap: '0',
        }}>
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-display)',
                fontSize: '2.5rem',
                letterSpacing: '.04em',
                color: isActive ? 'var(--gold)' : 'rgba(255,255,255,.8)',
                padding: '1rem 0',
                borderBottom: '1px solid rgba(255,255,255,.08)',
                transition: 'color .2s',
              })}
            >{label}</NavLink>
          ))}
          <a href="https://sawyer-culberson-project.org/donate" target="_blank" rel="noreferrer"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', letterSpacing: '.14em', textTransform: 'uppercase', background: 'var(--gold)', color: 'var(--ink)', padding: '1rem 2rem', fontWeight: 500, marginTop: '2rem', display: 'inline-block', width: 'fit-content' }}
          >Donate to SCP</a>
        </div>
      )}
    </>
  )
}
