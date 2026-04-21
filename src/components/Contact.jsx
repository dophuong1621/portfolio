import { FaPhone, FaEnvelope, FaLinkedinIn, FaGithub, FaFacebookF } from 'react-icons/fa';

export default function Contact() {
  return (
    <section id="contact">
      <div className="section-header fade-in">
        <p className="section-label">Kết nối</p>
        <h2 className="section-title">Liên Hệ Với Tôi</h2>
        <div className="section-line"></div>
      </div>
      <div className="contact-inner fade-in">
        <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
          Bạn có dự án muốn hợp tác, hoặc đơn giản chỉ muốn xin chào? 
          Đừng ngần ngại nhắn cho tôi — tôi luôn sẵn sàng lắng nghe!
        </p>
        <div className="contact-cards">
          <a href="tel:0522901602" className="contact-card">
            <div className="contact-icon"><FaPhone /></div>
            <div>
              <div className="contact-label">Điện thoại</div>
              <div className="contact-value">0522 901 602</div>
            </div>
          </a>
          <a href="mailto:dtp1621@gmail.com" className="contact-card">
            <div className="contact-icon"><FaEnvelope /></div>
            <div>
              <div className="contact-label">Email</div>
              <div className="contact-value">dtp1621@gmail.com</div>
            </div>
          </a>
        </div>
        <div className="social-links">
          <a href="#" className="social-link" title="LinkedIn"><FaLinkedinIn /></a>
          <a href="#" className="social-link" title="GitHub"><FaGithub /></a>
          <a href="#" className="social-link" title="Facebook"><FaFacebookF /></a>
        </div>
      </div>
    </section>
  );
}
