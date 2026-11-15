import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 antialiased">
      <Navbar />

      <main id="main-content">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Stats + About (combined) */}
        <About />

        {/* 4. Skills */}
        <Skills />

        {/* 5. Projects */}
        <Projects />

        {/* 6. Experience & Education */}
        <Experience />

        {/* 7. Contact */}
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
