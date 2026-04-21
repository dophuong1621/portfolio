export default function Experience() {
  return (
    <section id="experience">
      <div className="section-header fade-in">
        <p className="section-label">Hành trình</p>
        <h2 className="section-title">Kinh Nghiệm Làm Việc</h2>
        <div className="section-line"></div>
      </div>
      <div className="timeline">
        <div className="timeline-item fade-in">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <div className="timeline-card">
              <div className="timeline-meta">
                <span className="timeline-period">06/2024 — Hiện tại</span>
                <div className="timeline-role">IT Developer Intern</div>
                <div className="company-name">FPT Telecom</div>
              </div>
              <p className="timeline-desc">Phát triển và duy trì hệ thống quản lý dịch vụ khách hàng với backend ổn định.</p>
              <ul className="timeline-bullets">
                <li>Xử lý khối lượng hơn <b>+5.000 đơn/ngày</b></li>
                <li>Tích hợp Pusher WebSockets chat nội bộ realtime</li>
                <li>Tối ưu response time từ 800ms xuống còn <b>120ms (-85%)</b></li>
                <li>Tăng tỷ lệ E2E test coverage lên <b>35%</b> bằng Playwright</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="timeline-item fade-in">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <div className="timeline-card">
              <div className="timeline-meta">
                <span className="timeline-period">01/2023 — 05/2024</span>
                <div className="timeline-role">Fullstack Web Developer</div>
                <div className="company-name">Freelancer</div>
              </div>
              <p className="timeline-desc">Nhận phát triển giải pháp trọn gói cho các khách hàng cá nhân, doanh nghiệp nhỏ.</p>
              <ul className="timeline-bullets">
                <li>Thực hiện thành công <b>8+ dự án</b> (ecommerce, landing pages, HR)</li>
                <li>Tích hợp cổng thanh toán <b>VNPay và Momo</b> an toàn</li>
                <li>Đạt đánh giá <b>4.9/5.0</b> và 100% dự án đúng hạn</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
