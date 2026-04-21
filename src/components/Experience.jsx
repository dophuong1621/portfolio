import { motion } from 'framer-motion';
import ScrollableGrid from './ScrollableGrid';


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export default function Experience({ isActive }) {

  return (
    <section id="experience">
      <motion.div 
        className="section-header"
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
        }}
      >
        <p className="section-label">Hành trình</p>
        <h2 className="section-title">Kinh Nghiệm Làm Việc</h2>
        <div className="section-line"></div>
      </motion.div>
      
      <ScrollableGrid
        className="experience-grid swiper-no-swiping"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        <motion.div variants={cardVariants} className="experience-card">
          <div className="timeline-meta" style={{ marginBottom: '1.2rem', alignItems: 'flex-start' }}>
            <span className="timeline-period">06/2024 — Hiện tại</span>
            <div className="timeline-role">IT Developer Intern</div>
            <div className="company-name">FPT Telecom</div>
          </div>
          <p className="timeline-desc">Phát triển và duy trì hệ thống quản lý dịch vụ khách hàng với backend ổn định.</p>
          <ul className="experience-bullets">
            <li>Xử lý khối lượng hơn <b>+5.000 đơn/ngày</b></li>
            <li>Tích hợp Pusher WebSockets chat nội bộ realtime</li>
            <li>Tối ưu response time từ 800ms xuống còn <b>120ms (-85%)</b></li>
            <li>Tăng tỷ lệ E2E test coverage lên <b>35%</b> bằng Playwright</li>
          </ul>
        </motion.div>

        <motion.div variants={cardVariants} className="experience-card">
          <div className="timeline-meta" style={{ marginBottom: '1.2rem', alignItems: 'flex-start' }}>
            <span className="timeline-period">01/2023 — 05/2024</span>
            <div className="timeline-role">Fullstack Web Developer</div>
            <div className="company-name">Freelancer</div>
          </div>
          <p className="timeline-desc">Nhận phát triển giải pháp trọn gói cho các khách hàng cá nhân, doanh nghiệp nhỏ.</p>
          <ul className="experience-bullets">
            <li>Thực hiện thành công <b>8+ dự án</b> (ecommerce, landing pages, HR)</li>
            <li>Tích hợp cổng thanh toán <b>VNPay và Momo</b> an toàn</li>
            <li>Đạt đánh giá <b>4.9/5.0</b> và 100% dự án đúng hạn</li>
          </ul>
        </motion.div>

        <motion.div variants={cardVariants} className="experience-card">
          <div className="timeline-meta" style={{ marginBottom: '1.2rem', alignItems: 'flex-start' }}>
            <span className="timeline-period">10/2021 — 12/2022</span>
            <div className="timeline-role">Junior Frontend Dev</div>
            <div className="company-name">Tech Agency</div>
          </div>
          <p className="timeline-desc">Tham gia xây dựng giao diện tương tác cao cho các chiến dịch marketing và sự kiện.</p>
          <ul className="experience-bullets">
            <li>Chuyển đổi PSD/Figma sang React/Vue chuẩn <b>pixel-perfect</b></li>
            <li>Áp dụng GSAP và Framer Motion tạo hiệu ứng <b>chuyên nghiệp</b></li>
            <li>Đảm bảo responsive hoạt động mượt mà trên mọi thiết bị</li>
          </ul>
        </motion.div>
      </ScrollableGrid>
    </section>
  );
}
