import { useRef } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import ScrollableGrid from './ScrollableGrid';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.33, 1, 0.68, 1],
      delay: i * 0.1,
    }
  })
};

const projects = [
  {
    icon: '🔑',
    name: 'Ritokey',
    desc: 'Nền tảng mua bán tài khoản và dịch vụ kỹ thuật số (YouTube, Cursor, ...). Hỗ trợ giao dịch tự động, quản lý đơn hàng và hệ thống kho hàng thông minh.',
    tags: ['Laravel', 'MySQL', 'Redis Queue', 'Tailwind', 'JQuery', 'Ajax'],
    demo: 'https://ritokey.com',
  },
  {
    icon: '🏪',
    name: 'Kho tập trung – Kho thành viên',
    desc: 'Nền tảng thương mại điện tử chuyên cung cấp tài khoản game và dịch vụ số tự động. Tối ưu quy trình bảo mật, tốc độ giao dịch và quản lý kho thông minh.',
    tags: ['Laravel', 'MySQL', 'HTML/CSS', 'JavaScript', 'jQuery', 'Ajax'],
    demo: 'https://shoprito.com',
  },
  {
    icon: '💬',
    name: 'JiRim Chat System',
    desc: 'Hệ thống chat real-time đầy đủ tính năng: nhắn tin 1-1 & nhóm, gọi video P2P (WebRTC), emoji reactions, pin tin nhắn, presence tracking và E2E testing với Playwright.',
    tags: ['Laravel', 'Vue 3', 'WebRTC', 'WebSocket', 'Redis', 'Playwright', 'Unit Test'],
  },
  {
    icon: '🏠',
    name: 'Hub HQ',
    desc: 'Hệ thống Hub tổng hợp, kết nối và quản lý các dịch vụ nội bộ của HQ Group. Cung cấp giao diện trung tâm để điều hướng và vận hành các hệ thống con.',
    tags: ['Laravel', 'HTML/CSS', 'jQuery', 'Ajax', 'MySQL'],
  },
  {
    icon: '💳',
    name: 'HPay',
    desc: 'Hệ thống thanh toán nội bộ của HQ Group, xử lý giao dịch nạp tiền, rút tiền và quản lý ví người dùng một cách an toàn và tự động.',
    tags: ['Laravel', 'MySQL', 'REST API', 'JavaScript', 'jQuery'],
  },
  {
    icon: '📊',
    name: 'Báo cáo tài chính',
    desc: 'Hệ thống báo cáo tài chính nội bộ, tổng hợp dữ liệu giao dịch, xuất báo cáo theo kỳ và trực quan hóa số liệu cho ban quản lý.',
    tags: ['Laravel', 'MySQL', 'JavaScript', 'jQuery', 'Ajax'],
  },
  {
    icon: '🛒',
    name: 'Raonhanh365',
    desc: 'Nền tảng thương mại điện tử dạng rao vặt đa ngành hàng (xe cộ, đồ điện tử, đồ dùng cá nhân...). Hỗ trợ tìm kiếm, lọc, trò chuyện trực tiếp giữa người mua và người bán.',
    tags: ['Laravel', 'MySQL', 'HTML/CSS', 'JavaScript', 'jQuery', 'Ajax'],
    demo: 'https://raovat6s.com',
  },
];

export default function Projects({ isActive, isMobile }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0, margin: '-60px 0px -60px 0px' });
  const showAnim = isMobile ? isInView : isActive;

  return (
    <section id="projects" ref={ref} className={showAnim ? 'section-active' : ''}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: -20 }}
        animate={showAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label">Portfolio</p>
        <h2 className="section-title">Dự Án Nổi Bật</h2>
        <div className="section-line"></div>
      </motion.div>

      <ScrollableGrid className="projects-grid swiper-no-swiping">
        {projects.map((proj, i) => (
          <motion.div
            key={proj.name}
            className="project-card"
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate={showAnim ? 'visible' : 'hidden'}
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
                {proj.demo && <a href={proj.demo} className="project-link" target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> Live Demo</a>}
              </div>
            </div>
          </motion.div>
        ))}
      </ScrollableGrid>
    </section>
  );
}
