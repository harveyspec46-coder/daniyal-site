import { Link } from 'react-router-dom'

const pages = [
  { to: '/',                    label: 'Home' },
  { to: '/documented-research', label: 'Documented Research' },
  { to: '/international-work',  label: 'International Work' },
  { to: '/journalism',          label: 'Journalism' },
  { to: '/about',               label: 'About' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', padding: '4rem 3rem 2rem' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
        gap: '3rem',
        paddingBottom: '3rem',
        borderBottom: '1px solid rgba(255,255,255,.07)',
        marginBottom: '2rem',
      }}>
        {/* Brand col */}
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--white)', letterSpacing: '.04em', marginBottom: '.8rem' }}>
            DANIYAL<span style={{ color: 'var(--gold)' }}>.</span>
          </div>
          <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.35)', lineHeight: 1.8, fontWeight: 300, maxWidth: 260 }}>
            Field researcher, photojournalist &amp; board member documenting the drug crisis across Pakistan and the United States.
          </p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '.8rem',
            background: 'transparent', border: '1px solid rgba(122,184,147,.2)',
            padding: '.4rem .9rem', marginTop: '1.2rem',
            fontFamily: 'var(--font-mono)', fontSize: '.6rem',
            letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--green-light)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green-light)', animation: 'pulse 2s ease-in-out infinite' }} />
            Partner · SCP 501(c)(3) · United States
          </div>
        </div>

        {/* Pages */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.2rem' }}>
            Pages
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {pages.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.4)', transition: 'color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.4)'}
                >{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Reports */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.2rem' }}>
            Reports
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {['UN World Drug Report', 'Global Opioid Crisis', 'UN Drug Report (Urdu)', 'Pakistan National Survey'].map(r => (
              <li key={r}><a href="#" style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.4)', transition: 'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.4)'}
              >{r}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.2rem' }}>
            Contact
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {['SCP — US Office', 'Field Inquiries', 'Media Requests', 'Donate to SCP'].map(r => (
              <li key={r}><a href="#" style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.4)', transition: 'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.4)'}
              >{r}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.08em', color: 'rgba(255,255,255,.2)', textTransform: 'uppercase' }}>
          © {new Date().getFullYear()} Daniyal · All rights reserved · Karachi, Pakistan
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.1em', color: 'var(--green-light)', textTransform: 'uppercase', border: '1px solid rgba(122,184,147,.2)', padding: '.3rem .8rem' }}>
          Partner · Sawyer Culberson Project · SCP 501(c)(3)
        </div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:.7} }`}</style>
    </footer>
  )
}
