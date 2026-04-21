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
      desc: "Hệ thống chat real-time đầy đủ tính năng: nhắn tin, gọi video P2P (WebRTC), nhóm chat, emoji reactions, pin tin nhắn, presence tracking và E2E testing.",
      tags: ["Laravel 11", "Vue 3", "WebRTC", "Pusher", "Redis", "Playwright"],
      source: "#",
      demo: "#"
    },
    {
      icon: "🛒",
      name: "E-Commerce Platform",
      desc: "Website bán hàng tích hợp cổng thanh toán VNPay/Momo, quản lý đơn hàng, tồn kho thời gian thực và dashboard admin với biểu đồ thống kê.",
      tags: ["Laravel", "Vue.js", "MySQL", "VNPay API"],
      source: "#",
      demo: "#"
    },
    {
      icon: "📊",
      name: "HR Management System",
      desc: "Hệ thống quản lý nhân sự nội bộ: chấm công, tính lương tự động, quản lý nghỉ phép và báo cáo xuất Excel cho phòng HR.",
      tags: ["PHP", "Laravel", "MySQL", "Bootstrap"],
      source: "#"
    }
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
