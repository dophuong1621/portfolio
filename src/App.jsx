import { lazy, Suspense, useState } from 'react';
import Navbar           from './components/Navbar';
import Hero             from './components/Hero';
import ParticleBackground from './components/Animated/ParticleBackground';
import CustomCursor     from './components/CustomCursor';
import useIsMobile      from './hooks/useIsMobile';

// ── Lazy-load mọi thứ DƯỚI Hero → tách khỏi main chunk
// Rollup sẽ tạo các chunk riêng, chỉ fetch khi cần
const Skills     = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Projects   = lazy(() => import('./components/Projects'));
const Contact    = lazy(() => import('./components/Contact'));
const Footer     = lazy(() => import('./components/Footer'));
const ChatBot    = lazy(() => import('./components/ChatBot'));

// Lazy-load Swiper ONLY khi cần (desktop) — mobile không bao giờ fetch chunk này
const DesktopSwiper = lazy(() => import('./components/DesktopSwiper'));

// ── Skeleton fallbacks nhẹ (CSS-only, zero JS cost)
const SectionSkeleton = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.3,
  }}>
    <div style={{
      width: '40px', height: '40px',
      border: '3px solid rgba(168,85,247,0.3)',
      borderTopColor: '#a855f7',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
  </div>
);

// ChatBot skeleton: giữ nguyên vị trí tab để tránh layout shift
const ChatBotSkeleton = () => (
  <div style={{
    position: 'fixed',
    bottom: '2.5rem', right: 0,
    width: '44px', height: '90px',
    background: 'linear-gradient(180deg, #4f46e5, #7c3aed)',
    borderRadius: '12px 0 0 12px',
    opacity: 0.6,
    zIndex: 100010,
  }} />
);

function App() {
  const [swiper, setSwiper] = useState(null);
  const isMobile = useIsMobile(900); // <= 900px → scroll bình thường (sync với CSS breakpoint)

  return (
    <>
      <CustomCursor />
      <ParticleBackground />

      {/* ChatBot lazy-loaded với skeleton giữ chỗ */}
      <Suspense fallback={<ChatBotSkeleton />}>
        <ChatBot />
      </Suspense>

      <Navbar swiper={isMobile ? null : swiper} isMobile={isMobile} />

      {isMobile ? (
        /* ── MOBILE: scroll thường, không load Swiper ── */
        <main className="mobile-scroll-layout">
          {/* Hero là eager (LCP element) — KHÔNG lazy */}
          <Hero swiper={null} isActive={true} isMobile={isMobile} />

          {/* Tất cả sections dưới fold → lazy-loaded */}
          <Suspense fallback={<SectionSkeleton />}>
            <Skills isActive={true} isMobile={isMobile} />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <Experience isActive={true} isMobile={isMobile} />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <Projects isActive={true} isMobile={isMobile} />
          </Suspense>
          <div className="mobile-contact-footer">
            <Suspense fallback={<SectionSkeleton />}>
              <Contact isActive={true} />
            </Suspense>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
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
