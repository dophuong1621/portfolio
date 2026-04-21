import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/Animated/ParticleBackground';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, HashNavigation } from 'swiper/modules';
import useIsMobile from './hooks/useIsMobile';

import 'swiper/css';
import 'swiper/css/pagination';
import { useState } from 'react';

function App() {
  const [swiper, setSwiper] = useState(null);
  const isMobile = useIsMobile(480); // <= 480px → bỏ slide

  return (
    <>
      <CustomCursor />
      <ParticleBackground />

      <Navbar swiper={isMobile ? null : swiper} isMobile={isMobile} />

      {isMobile ? (
        /* ── MOBILE NHỎ: scroll bình thường, không dùng Swiper ── */
        <main className="mobile-scroll-layout">
          <Hero swiper={null} isActive={true} />
          <Skills isActive={true} />
          <Experience isActive={true} />
          <Projects isActive={true} />
          <div className="mobile-contact-footer">
            <Contact isActive={true} />
            <Footer />
          </div>
        </main>
      ) : (
        /* ── TABLET / PC: dùng Swiper full-page ── */
        <Swiper
          onSwiper={setSwiper}
          direction={'vertical'}
          slidesPerView={1}
          spaceBetween={0}
          mousewheel={{
            thresholdDelta: 50,
            sensitivity: 1,
          }}
          pagination={{ clickable: true }}
          hashNavigation={{ watchState: true }}
          modules={[Mousewheel, Pagination, HashNavigation]}
          className="mySwiper"
          speed={800}
        >
          <SwiperSlide data-hash="hero">
            {({ isActive }) => <Hero swiper={swiper} isActive={isActive} />}
          </SwiperSlide>
          <SwiperSlide data-hash="skills">
            {({ isActive }) => <Skills isActive={isActive} />}
          </SwiperSlide>
          <SwiperSlide data-hash="experience">
            {({ isActive }) => <Experience isActive={isActive} />}
          </SwiperSlide>
          <SwiperSlide data-hash="projects">
            {({ isActive }) => <Projects isActive={isActive} />}
          </SwiperSlide>
          <SwiperSlide data-hash="contact">
            {({ isActive }) => (
              <div className="contact-footer-wrapper">
                <Contact isActive={isActive} />
                <Footer />
              </div>
            )}
          </SwiperSlide>
        </Swiper>
      )}
    </>
  );
}

export default App;
