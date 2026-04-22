import { FaPhone, FaEnvelope, FaLinkedinIn, FaGithub, FaFacebookF } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Magnetic from './Animated/Magnetic';
const ZaloIcon = () => (
  <svg viewBox="0 0 50 50" width="1.2em" height="1.2em" style={{ verticalAlign: 'middle', display: 'inline-block', transform: 'translateY(-1px)' }}>
    <defs>
      <mask id="zalo-mask">
        <rect width="50" height="50" fill="white" />
        <path d="M20.5632 17H10.8382V19.0853H17.5869L10.9329 27.3317C10.7244 27.635 10.5728 27.9194 10.5728 28.5639V29.0947H19.748C20.203 29.0947 20.5822 28.7156 20.5822 28.2606V27.1421H13.4922L19.748 19.2938C19.8428 19.1801 20.0134 18.9716 20.0893 18.8768L20.1272 18.8199C20.4874 18.2891 20.5632 17.8341 20.5632 17.2844V17Z" fill="black"/>
        <path d="M32.9416 29.0947H34.3255V17H32.2402V28.3933C32.2402 28.7725 32.5435 29.0947 32.9416 29.0947Z" fill="black"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M25.814 19.6924C23.1979 19.6924 21.0747 21.8156 21.0747 24.4317C21.0747 27.0478 23.1979 29.171 25.814 29.171C28.4301 29.171 30.5533 27.0478 30.5533 24.4317C30.5723 21.8156 28.4491 19.6924 25.814 19.6924ZM25.814 27.2184C24.2785 27.2184 23.0273 25.9672 23.0273 24.4317C23.0273 22.8962 24.2785 21.645 25.814 21.645C27.3495 21.645 28.6007 22.8962 28.6007 24.4317C28.6007 25.9672 27.3685 27.2184 25.814 27.2184Z" fill="black"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M40.4867 19.6162C37.8516 19.6162 35.7095 21.7584 35.7095 24.3934C35.7095 27.0285 37.8516 29.1707 40.4867 29.1707C43.1217 29.1707 45.2639 27.0285 45.2639 24.3934C45.2639 21.7584 43.1217 19.6162 40.4867 19.6162ZM40.4867 27.2181C38.9322 27.2181 37.681 25.9669 37.681 24.4124C37.681 22.8579 38.9322 21.6067 40.4867 21.6067C42.0412 21.6067 43.2924 22.8579 43.2924 24.4124C43.2924 25.9669 42.0412 27.2181 40.4867 27.2181Z" fill="black"/>
        <path d="M29.4562 29.0944H30.5747V19.957H28.6221V28.2793C28.6221 28.7153 29.0012 29.0944 29.4562 29.0944Z" fill="black"/>
      </mask>
    </defs>
    <path mask="url(#zalo-mask)" fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M7.779 43.5892C10.1019 43.846 13.0061 43.1836 15.0682 42.1825C24.0225 47.1318 38.0197 46.8954 46.4923 41.4732C46.8209 40.9803 47.1279 40.4677 47.4128 39.9363C49.1062 36.7779 50.0004 33.22 50.0004 27.1316V22.7175C50.0004 16.629 49.1062 13.0711 47.4128 9.91273C45.7385 6.75436 43.2461 4.28093 40.0877 2.58758C36.9293 0.894239 33.3714 0 27.283 0H22.8499C17.6644 0 14.2982 0.652754 11.4699 1.89893C11.3153 2.03737 11.1636 2.17818 11.0151 2.32135C2.71734 10.3203 2.08658 27.6593 9.12279 37.0782C9.13064 37.0921 9.13933 37.1061 9.14889 37.1203C10.2334 38.7185 9.18694 41.5154 7.55068 43.1516C7.28431 43.399 7.37944 43.5512 7.779 43.5892Z"/>
  </svg>
);

export default function Contact({ isActive }) {
  return (
    <section id="contact">
      <motion.div 
        className="section-header"
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        <p className="section-label">Kết nối</p>
        <h2 className="section-title">Liên Hệ Với Tôi</h2>
        <div className="section-line"></div>
      </motion.div>
      <motion.div 
        className="contact-inner"
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } }
        }}
      >
        <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
          Tôi đang tìm kiếm cơ hội việc làm phù hợp để phát triển bản thân.
          Nếu bạn là nhà tuyển dụng hoặc có cơ hội muốn chia sẻ, đừng ngần ngại liên hệ — tôi luôn sẵn sàng!
        </p>
        <div className="contact-cards">
          <a href="tel:0522901602" className="contact-card">
            <div className="contact-icon"><FaPhone /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div className="contact-label">Điện thoại</div>
              <div className="contact-value">0522 901 602</div>
            </div>
          </a>
          <a href="mailto:dtp1621@gmail.com" className="contact-card">
            <div className="contact-icon"><FaEnvelope /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div className="contact-label">Email</div>
              <div className="contact-value">dtp1621@gmail.com</div>
            </div>
          </a>
        </div>
        <div className="social-links">
          <Magnetic><a href="https://www.linkedin.com/in/ph%C6%B0%C6%A1ng-%C4%91%E1%BB%97-7471162b6/" target="_blank" rel="noreferrer" className="social-link" title="LinkedIn"><FaLinkedinIn /></a></Magnetic>
          <Magnetic><a href="https://github.com/dophuong1621" target="_blank" rel="noreferrer" className="social-link" title="GitHub"><FaGithub /></a></Magnetic>
          <Magnetic><a href="https://www.facebook.com/jirim1621" target="_blank" rel="noreferrer" className="social-link" title="Facebook"><FaFacebookF /></a></Magnetic>
          <Magnetic><a href="https://zalo.me/0522901602" target="_blank" rel="noreferrer" className="social-link" title="Zalo"><ZaloIcon /></a></Magnetic>
        </div>
      </motion.div>
    </section>
  );
}
