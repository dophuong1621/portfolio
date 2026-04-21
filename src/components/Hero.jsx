import { FaFileAlt, FaPaperPlane, FaUser } from 'react-icons/fa';

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <div className="hero-badge">✦ Available for work</div>
          <h1 className="hero-name">Đỗ Thế<br/><span>Phương</span></h1>
          <p className="hero-role">IT Developer</p>
          <p className="hero-desc">
            Lập trình viên với niềm đam mê xây dựng các ứng dụng web real-time hiện đại.
            Có kinh nghiệm phát triển hệ thống từ backend API đến giao diện người dùng,
            luôn hướng tới sản phẩm ổn định, hiệu năng cao và trải nghiệm người dùng xuất sắc.
          </p>
          <div className="hero-btns">
            <a href="#" className="btn-primary"><FaFileAlt /> Xem CV</a>
            <a href="#contact" className="btn-outline"><FaPaperPlane /> Liên hệ ngay</a>
          </div>
          <div className="stat-chips">
            <div className="stat-chip"><b>2+</b> năm kinh nghiệm</div>
            <div className="stat-chip"><b>10+</b> dự án hoàn thành</div>
            <div className="stat-chip">🟢 Sẵn sàng nhận việc</div>
          </div>
        </div>
        <div className="hero-avatar">
          <div className="avatar-ring"></div>
          <FaUser />
        </div>
      </div>
    </section>
  );
}
