import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function Projects() {
  return (
    <section id="projects">
      <div className="section-header fade-in">
        <p className="section-label">Portfolio</p>
        <h2 className="section-title">Dự Án Nổi Bật</h2>
        <div className="section-line"></div>
      </div>
      <div className="projects-grid">
        <div className="project-card fade-in">
          <div className="project-img">💬</div>
          <div className="project-body">
            <div className="project-name">JiRim Chat System</div>
            <p className="project-desc">Hệ thống chat real-time đầy đủ tính năng: nhắn tin, gọi video P2P (WebRTC), nhóm chat, emoji reactions, pin tin nhắn, presence tracking và E2E testing.</p>
            <div className="project-tags">
              <span className="project-tag">Laravel 11</span>
              <span className="project-tag">Vue 3</span>
              <span className="project-tag">WebRTC</span>
              <span className="project-tag">Pusher</span>
              <span className="project-tag">Redis</span>
              <span className="project-tag">Playwright</span>
            </div>
            <div className="project-links">
              <a href="#" className="project-link"><FaGithub /> Source Code</a>
              <a href="#" className="project-link"><FaExternalLinkAlt /> Live Demo</a>
            </div>
          </div>
        </div>

        <div className="project-card fade-in">
          <div className="project-img">🛒</div>
          <div className="project-body">
            <div className="project-name">E-Commerce Platform</div>
            <p className="project-desc">Website bán hàng tích hợp cổng thanh toán VNPay/Momo, quản lý đơn hàng, tồn kho thời gian thực và dashboard admin với biểu đồ thống kê.</p>
            <div className="project-tags">
              <span className="project-tag">Laravel</span>
              <span className="project-tag">Vue.js</span>
              <span className="project-tag">MySQL</span>
              <span className="project-tag">VNPay API</span>
            </div>
            <div className="project-links">
              <a href="#" className="project-link"><FaGithub /> Source Code</a>
              <a href="#" className="project-link"><FaExternalLinkAlt /> Live Demo</a>
            </div>
          </div>
        </div>

        <div className="project-card fade-in">
          <div className="project-img">📊</div>
          <div className="project-body">
            <div className="project-name">HR Management System</div>
            <p className="project-desc">Hệ thống quản lý nhân sự nội bộ: chấm công, tính lương tự động, quản lý nghỉ phép và báo cáo xuất Excel cho phòng HR.</p>
            <div className="project-tags">
              <span className="project-tag">PHP</span>
              <span className="project-tag">Laravel</span>
              <span className="project-tag">MySQL</span>
              <span className="project-tag">Bootstrap</span>
            </div>
            <div className="project-links">
              <a href="#" className="project-link"><FaGithub /> Source Code</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
