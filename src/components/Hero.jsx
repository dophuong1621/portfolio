import { useState, useEffect } from 'react';
import { FaFileAlt, FaPaperPlane } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';
import { motion, useReducedMotion } from 'framer-motion';
import Magnetic from './Animated/Magnetic';
import useIsMobile from '../hooks/useIsMobile';

export default function Hero({ swiper, isActive }) {
  const isMobile = useIsMobile(900);
  const shouldReduceMotion = useReducedMotion();

  // Fix G: Defer Typewriter — không chạy animation trong lúc LCP image đang load
  const [showTypewriter, setShowTypewriter] = useState(false);
  useEffect(() => {
    // 600ms: đủ để LCP image đã decode xong trước khi Typewriter chiếm main thread
    const t = setTimeout(() => setShowTypewriter(true), 600);
    return () => clearTimeout(t);
  }, []);

  const handleContactClick = (e) => {
    e.preventDefault();
    if (swiper) swiper.slideTo(4); // slide 4 is Contact
  };

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCV = (e) => {
    if (isDownloading) {
      e.preventDefault();
      return;
    }
    setIsDownloading(true);
    // Giữ trạng thái loading 2.5s để chống spam click
    setTimeout(() => {
      setIsDownloading(false);
    }, 2500);
  };

  return (
    <section id="hero">
      <div className="hero-inner">
        <motion.div 
          className="hero-text"
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          variants={{
             hidden: { opacity: 0 },
             visible: { opacity: 1, transition: { duration: 0.8 } }
          }}
        >
          <div className="hero-badge">✦ Available for work</div>
          <div style={{ overflow: 'hidden', paddingBottom: '5px' }}>
            <motion.h1 
              className="hero-name"
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
              }}
            >
              Đỗ Thế <span>Phương</span>
            </motion.h1>
          </div>
          <div className="hero-role" style={{ minHeight: '30px' }}>
              {showTypewriter ? (
                <Typewriter
                  options={{
                    strings: ['Full-Stack Developer', 'System Architecture', 'UI/UX Enthusiast'],
                    autoStart: true,
                    loop: true,
                    delay: 40,
                    deleteSpeed: 20,
                  }}
                />
              ) : (
                // Placeholder giữ chỗ để không có CLS
                <span style={{ color: 'var(--muted)', fontWeight: 600 }}>Full-Stack Developer</span>
              )}
            </div>
            <p className="hero-desc">
              Là một Full Stack Developer đam mê công nghệ, tôi có thế mạnh trong việc thiết kế kiến trúc hệ thống linh hoạt và tối ưu hóa trải nghiệm người dùng. Mục tiêu của tôi là xây dựng các nền tảng chất lượng cao, hiệu năng vượt trội với hệ sinh thái đa dạng (Laravel, Vue 3, Tailwind, jQuery...) nhằm giải quyết các bài toán khó của doanh nghiệp.
            </p>
          <div className="hero-btns" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {/* Fix E: Magnetic chỉ trên desktop — mobile không có chuột */}
            {isMobile ? (
              <a
                href={`${import.meta.env.BASE_URL}CV.pdf`}
                download
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-primary ${isDownloading ? 'loading-btn' : ''}`}
                onClick={handleDownloadCV}
                style={{ opacity: isDownloading ? 0.7 : 1 }}
              >
                {isDownloading ? <>⏳ Đang chuẩn bị...</> : <><FaFileAlt /> Tải CV (PDF)</>}
              </a>
            ) : (
              // Desktop: dùng dynamic import để tránh đưa Magnetic vào initial parse
              <motion.a
                whileHover={!isDownloading ? { scale: 1.05 } : {}}
                whileTap={!isDownloading ? { scale: 0.95 } : {}}
                href={`${import.meta.env.BASE_URL}CV.pdf`}
                download target="_blank" rel="noopener noreferrer"
                className={`btn-primary ${isDownloading ? 'loading-btn' : ''}`}
                onClick={handleDownloadCV}
                style={{ opacity: isDownloading ? 0.7 : 1, cursor: isDownloading ? 'wait' : 'pointer' }}
              >
                {isDownloading ? <>⏳ Đang chuẩn bị...</> : <><FaFileAlt /> Tải CV (PDF)</>}
              </motion.a>
            )}
            {isMobile ? (
              <a href="#contact" onClick={handleContactClick} className="btn-outline">
                <FaPaperPlane /> Liên hệ ngay
              </a>
            ) : (
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#contact" onClick={handleContactClick} className="btn-outline">
                <FaPaperPlane /> Liên hệ ngay
              </motion.a>
            )}
          </div>
          <div className="stat-chips">
            <div
              className="stat-chip stat-chip--link"
              onClick={() => swiper && swiper.slideTo(2)}
              title="Xem Kinh nghiệm"
            >
              <b>3+</b> năm kinh nghiệm
            </div>
            <div
              className="stat-chip stat-chip--link"
              onClick={() => swiper && swiper.slideTo(3)}
              title="Xem Dự án"
            >
              <b>10+</b> dự án hoàn thành
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="hero-avatar"
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          variants={{
             hidden: { opacity: 0, scale: 0.8 },
             visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
          }}
          whileHover={{ y: -10, boxShadow: "0 40px 90px rgba(168,85,247,0.3)" }}
        >
          {/* Dùng CSS animation thay framer-motion để tránh JS reflow */}
          <div className="avatar-ring" />
          <picture>
            {/* Mobile ≤768px → ảnh nhỏ 22 KB (420px wide) */}
            <source
              media="(max-width: 768px)"
              srcSet={`${import.meta.env.BASE_URL}avatar-mobile.jpg`}
            />
            {/* Desktop → ảnh gốc 44 KB */}
            <img
              src={`${import.meta.env.BASE_URL}avatar.jpg`}
              alt="Đỗ Thế Phương — PHP & Laravel Developer"
              className="hero-avatar-img"
              fetchpriority="high"
              loading="eager"
              decoding="async"
              width="300"
              height="390"
              style={{ willChange: 'auto' }}
            />
          </picture>
        </motion.div>
      </div>
    </section>
  );
}
