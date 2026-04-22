import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ScrollableGrid from './ScrollableGrid';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 100, damping: 10 }
  }
};

export default function Projects({ isActive }) {

  const projects = [
    {
      icon: "💬",
      name: "JiRim Chat System",
      desc: "Hệ thống chat real-time đầy đủ tính năng: nhắn tin 1-1 & nhóm, gọi video P2P (WebRTC), emoji reactions, pin tin nhắn, presence tracking và E2E testing với Playwright.",
      tags: ["Laravel", "Vue", "WebRTC", "WebSocket", "Redis", "Playwright", "Pusher"],
    },
    {
      icon: "🔑",
      name: "Ritokey",
      desc: "Nền tảng mua bán tài khoản và dịch vụ kỹ thuật số (YouTube, Cursor, ...). Hỗ trợ giao dịch tự động, quản lý đơn hàng và hệ thống kho hàng thông minh.",
      tags: ["Laravel", "HTML/CSS", "Tailwind CSS", "jQuery", "Ajax", "MySQL", "Pusher"],
      demo: "https://ritokey.com",
    },
    {
      icon: "🏠",
      name: "Hub HQ",
      desc: "Hệ thống Hub tổng hợp, kết nối và quản lý các dịch vụ nội bộ của HQ Group. Cung cấp giao diện trung tâm để điều hướng và vận hành các hệ thống con.",
      tags: ["Laravel", "HTML/CSS", "jQuery", "Ajax", "MySQL"],
    },
    {
      icon: "🏪",
      name: "Kho tập trung – Kho thành viên",
      desc: "Nền tảng thương mại điện tử chuyên biệt cho phép người dùng tìm kiếm, mua sắm tài khoản game và các dịch vụ bổ trợ một cách tự động. Tập trung vào bảo mật, tốc độ giao dịch và quản lý kho hàng thông minh.",
      tags: ["Laravel", "MySQL", "HTML/CSS", "JavaScript", "jQuery", "Ajax"],
      demo: 'https://shoprito.com',
    },
    {
      icon: "💳",
      name: "HPay",
      desc: "Hệ thống thanh toán nội bộ của HQ Group, xử lý giao dịch nạp tiền, rút tiền và quản lý ví người dùng một cách an toàn và tự động.",
      tags: ["Laravel", "MySQL", "REST API", "JavaScript", "jQuery"],
    },
    {
      icon: "📊",
      name: "Báo cáo tài chính",
      desc: "Hệ thống báo cáo tài chính nội bộ, tổng hợp dữ liệu giao dịch, xuất báo cáo theo kỳ và trực quan hóa số liệu cho ban quản lý.",
      tags: ["Laravel", "MySQL", "JavaScript", "jQuery", "Ajax"],
    },
    {
      icon: "🛒",
      name: "Raonhanh365",
      desc: "Nền tảng thương mại điện tử dạng rao vặt đa ngành hàng (xe cộ, đồ điện tử, đồ dùng cá nhân...). Hỗ trợ tìm kiếm, lọc, trò chuyện trực tiếp giữa người mua và người bán.",
      tags: ["Laravel", "MySQL", "HTML/CSS", "JavaScript", "jQuery", "Ajax"],
      demo: "https://raovat6s.com",
    },
  ];

  return (
    <section id="projects">
      <motion.div 
        className="section-header"
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }}
      >
        <p className="section-label">Portfolio</p>
        <h2 className="section-title">Dự Án Nổi Bật</h2>
        <div className="section-line"></div>
      </motion.div>
      
      <ScrollableGrid
        className="projects-grid swiper-no-swiping"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        {projects.map((proj, idx) => (
          <motion.div 
            key={idx} 
            className="project-card"
            variants={cardVariants}
            whileHover={{ y: -8, rotateX: 5, rotateY: -5, boxShadow: "0 20px 40px rgba(168,85,247,0.15)" }}
            style={{ perspective: 1000 }}
          >
            <div className="project-img">{proj.icon}</div>
            <div className="project-body">
              <div className="project-name">{proj.name}</div>
              <p className="project-desc">{proj.desc}</p>
              <div className="project-tags">
                {proj.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}
              </div>
              <div className="project-links">
                {proj.source && <a href={proj.source} className="project-link"><FaGithub /> Source Code</a>}
                {proj.demo && <a href={proj.demo} className="project-link"><FaExternalLinkAlt /> Live Demo</a>}
              </div>
            </div>
          </motion.div>
        ))}
      </ScrollableGrid>
    </section>
  );
}
