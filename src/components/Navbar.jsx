import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HASHES = ['hero', 'skills', 'experience', 'projects', 'contact'];

export default function Navbar({ swiper, isMobile }) {
  const [isOpen, setIsOpen] = useState(false);

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
                className={index === 4 ? 'nav-cta' : ''}
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

