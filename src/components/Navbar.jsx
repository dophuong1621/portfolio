import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{ boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,.4)' : 'none' }}>
      <div className="logo">ĐTP.</div>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><a href="#hero" onClick={() => setIsOpen(false)}>Trang chủ</a></li>
        <li><a href="#skills" onClick={() => setIsOpen(false)}>Kỹ năng</a></li>
        <li><a href="#experience" onClick={() => setIsOpen(false)}>Kinh nghiệm</a></li>
        <li><a href="#projects" onClick={() => setIsOpen(false)}>Dự án</a></li>
        <li><a href="#contact" className="nav-cta" onClick={() => setIsOpen(false)}>Liên hệ</a></li>
      </ul>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
}
