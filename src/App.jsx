import { lazy, Suspense, useState } from 'react';
import Navbar           from './components/Navbar';
import Hero             from './components/Hero';
import Skills           from './components/Skills';
import Experience       from './components/Experience';
import Projects         from './components/Projects';
import Contact          from './components/Contact';
import Footer           from './components/Footer';
import CustomCursor     from './components/CustomCursor';
import ParticleBackground from './components/Animated/ParticleBackground';
import ChatBot          from './components/ChatBot';
import useIsMobile      from './hooks/useIsMobile';

// Lazy-load Swiper ONLY khi cần (desktop) — mobile không bao giờ fetch chunk này
const DesktopSwiper = lazy(() => import('./components/DesktopSwiper'));

function App() {
  const [swiper, setSwiper] = useState(null);
  const isMobile = useIsMobile(900); // <= 900px → scroll bình thường (sync với CSS breakpoint)

  return (
    <>
      <CustomCursor />
      <ParticleBackground />
      <ChatBot />

      <Navbar swiper={isMobile ? null : swiper} isMobile={isMobile} />

      {isMobile ? (
        /* ── MOBILE: scroll thường, không load Swiper ── */
        <main className="mobile-scroll-layout">
          <Hero      swiper={null} isActive={true} isMobile={isMobile} />
          <Skills    isActive={true} isMobile={isMobile} />
          <Experience isActive={true} isMobile={isMobile} />
          <Projects  isActive={true} isMobile={isMobile} />
          <div className="mobile-contact-footer">
            <Contact isActive={true} />
            <Footer />
          </div>
        </main>
      ) : (
        /* ── TABLET / PC: Swiper lazy-loaded ── */
        <Suspense fallback={null}>
          <DesktopSwiper swiper={swiper} setSwiper={setSwiper} />
        </Suspense>
      )}
    </>
  );
}

export default App;
