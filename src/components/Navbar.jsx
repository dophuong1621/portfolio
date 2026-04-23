import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HASHES = ['hero', 'skills', 'experience', 'projects', 'contact'];

export default function Navbar({ swiper, isMobile }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Desktop: Theo dõi Swiper slide change
  useEffect(() => {
    if (swiper) {
      const onSlideChange = () => setActiveIndex(swiper.activeIndex);
      swiper.on('slideChange', onSlideChange);
      // set initial state in case it's not 0
      setActiveIndex(swiper.activeIndex);
      return () => swiper.off('slideChange', onSlideChange);
    }
  }, [swiper]);

  // Mobile: Theo dõi scroll
  useEffect(() => {
    if (isMobile) {
      const handleScroll = () => {
        // Offset 100px để trigger sớm 1 chút khi cuộn
        const scrollPosition = window.scrollY + 100;
        let currentIdx = 0;
        for (let i = 0; i < HASHES.length; i++) {
          const el = document.getElementById(HASHES[i]);
          if (el && el.offsetTop <= scrollPosition) {
            currentIdx = i;
          }
        }
        setActiveIndex(currentIdx);
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      // Chạy 1 lần lúc mount
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile]);

  const handleNav = (e, index) => {
    e.preventDefault();
    if (swiper) {
      // Tablet / PC – dùng Swiper
      swiper.slideTo(index);
    } else {
      // Mobile nhỏ – scroll bình thường đến section
      const target = document.getElementById(HASHES[index]);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navItems = [
    { label: 'Trang chủ', index: 0 },
    { label: 'Kỹ năng', index: 1 },
    { label: 'Kinh nghiệm', index: 2 },
    { label: 'Dự án', index: 3 },
    { label: 'Liên hệ', index: 4 },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <div className="logo">ĐTP.</div>

        {/* Desktop links */}
        <ul className="nav-links">
          {navItems.map(({ label, index }) => (
            <li key={index}>
              <a
                href={`#${['hero','skills','experience','projects','contact'][index]}`}
                onClick={(e) => handleNav(e, index)}
                className={`${index === 4 ? 'nav-cta' : ''} ${activeIndex === index ? 'active' : ''}`.trim()}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className={`hamburger ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </motion.nav>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Slide-in Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="nav-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Nút X đóng drawer */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Đóng menu"
              style={{
                position:       'absolute',
                top:            16,
                right:          18,
                width:          34,
                height:         34,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                background:     'rgba(255,255,255,0.07)',
                border:         '1px solid rgba(255,255,255,0.1)',
                borderRadius:   '50%',
                color:          '#f1f0ff',
                cursor:         'pointer',
                fontSize:       16,
                transition:     'background 0.18s',
                zIndex:         1,
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(168,85,247,0.3)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
            >
              ✕
            </button>

            <ul className="drawer-links">
              {navItems.map(({ label, index }, i) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <a
                    href={`#${['hero','skills','experience','projects','contact'][index]}`}
                    onClick={(e) => handleNav(e, index)}
                    className={activeIndex === index ? 'active' : ''}
                  >
                    <span className="drawer-num">0{i + 1}</span>
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

