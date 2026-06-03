import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Research from './pages/Research'
import InternationalWork from './pages/InternationalWork'
import Journalism from './pages/Journalism'
import JournalismPost from './pages/JournalismPost'
import BlogPost from './pages/BlogPost'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/documented-research" element={<Research />} />
        <Route path="/international-work" element={<InternationalWork />} />
        <Route path="/journalism" element={<Journalism />} />
        <Route path="/journalism/:slug" element={<JournalismPost />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </>
  )
}
