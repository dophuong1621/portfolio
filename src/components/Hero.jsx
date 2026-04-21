import { FaFileAlt, FaPaperPlane, FaUser } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import Magnetic from './Animated/Magnetic';

export default function Hero({ swiper, isActive }) {
  const handleContactClick = (e) => {
    e.preventDefault();
    if (swiper) swiper.slideTo(4); // slide 4 is Contact
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
            <Typewriter
              options={{
                strings: ['PHP Developer', 'Full-Stack Developer', 'Linux Server Admin', 'QA Automation Tester', 'UI/UX Enthusiast'],
                autoStart: true,
                loop: true,
                delay: 40,
                deleteSpeed: 20,
              }}
            />
          </div>
          <p className="hero-desc">
            Lập trình viên với niềm đam mê thiết kế giao diện và xây dựng hệ thống web toàn diện.
            Có kinh nghiệm phát triển end-to-end từ backend API, cấu hình server đến giao diện người dùng,
            luôn hướng tới sản phẩm ổn định, hiệu năng cao và trải nghiệm người dùng xuất sắc.
          </p>
          <div className="hero-btns" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Magnetic>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#" className="btn-primary">
                <FaFileAlt /> Xem CV
              </motion.a>
            </Magnetic>
            <Magnetic>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#contact" onClick={handleContactClick} className="btn-outline">
                <FaPaperPlane /> Liên hệ ngay
              </motion.a>
            </Magnetic>
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
          <motion.div 
            className="avatar-ring"
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <img src={`${import.meta.env.BASE_URL}avatar.jpg`} alt="Avatar" className="hero-avatar-img" />
        </motion.div>
      </div>
    </section>
  );
}
