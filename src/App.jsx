import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar   from './components/Navbar'
import Footer   from './components/Footer'
import Home              from './pages/Home'
import Journalism        from './pages/Journalism'
import JournalismPost    from './pages/JournalismPost'
import Research          from './pages/Research'
import InternationalWork from './pages/InternationalWork'
import About             from './pages/About'
import BlogPost          from './pages/BlogPost'

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"                          element={<Home />} />
          <Route path="/journalism"                element={<Journalism />} />
          <Route path="/journalism/:slug"          element={<JournalismPost />} />
          <Route path="/documented-research"       element={<Research />} />
          <Route path="/international-work"        element={<InternationalWork />} />
          <Route path="/about"                     element={<About />} />
          <Route path="/blog/:slug"                element={<BlogPost />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
