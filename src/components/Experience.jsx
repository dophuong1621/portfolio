import { useRef } from 'react';
import { useInView } from 'framer-motion';
import ScrollableGrid from './ScrollableGrid';

export default function Experience({ isActive, isMobile }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const showAnim = isMobile ? isInView : isActive;

  return (
    <section id="experience" ref={ref} className={showAnim ? 'section-active' : ''}>
      <div 
        className={`section-header fade-in ${showAnim ? 'visible' : ''}`}
      >
        <p className="section-label">Hành trình</p>
        <h2 className="section-title">Kinh Nghiệm Làm Việc</h2>
        <div className="section-line"></div>
      </div>
      
      <ScrollableGrid className="experience-grid swiper-no-swiping">
        <div className="experience-card fade-up-item" style={{ animationDelay: '0.1s' }}>
          <div className="timeline-meta" style={{ marginBottom: '1.2rem', alignItems: 'flex-start' }}>
            <span className="timeline-period">02/2023 — 05/2026</span>
            <div className="timeline-role">Web Developer</div>
            <div className="company-name">HQ Group</div>
          </div>
          <p className="timeline-desc">Phát triển và vận hành hệ thống web thương mại điện tử tập trung, quản lý kho thành viên và tối ưu hạ tầng server.</p>
          <ul className="experience-bullets">
            <li>Thiết kế &amp; phát triển <b>giao diện người dùng</b> (Frontend)</li>
            <li>Phát triển tính năng, tối ưu <b>backend</b> và hệ thống</li>
            <li>Quản trị hạ tầng, <b>cấu hình server</b> và điều phối tài nguyên</li>
          </ul>
        </div>

        <div className="experience-card fade-up-item" style={{ animationDelay: '0.2s' }}>
          <div className="timeline-meta" style={{ marginBottom: '1.2rem', alignItems: 'flex-start' }}>
            <span className="timeline-period">10/2022 — 12/2022</span>
            <div className="timeline-role">Web Developer Intern</div>
            <div className="company-name">Công ty Tigren</div>
          </div>
          <p className="timeline-desc">Thực tập phát triển web tại Tigren, học nền tảng Magento và làm việc trực tiếp trên môi trường Linux.</p>
          <ul className="experience-bullets">
            <li>Học và thực hành phát triển với <b>Magento</b> (nền tảng eCommerce)</li>
            <li>Làm việc trên hệ điều hành <b>Linux</b> trong môi trường thực tế</li>
            <li>Tìm hiểu quy trình phát triển <b>thương mại điện tử</b> doanh nghiệp</li>
          </ul>
        </div>

        <div className="experience-card fade-up-item" style={{ animationDelay: '0.3s' }}>
          <div className="timeline-meta" style={{ marginBottom: '1.2rem', alignItems: 'flex-start' }}>
            <span className="timeline-period">03/2022 — 06/2022</span>
            <div className="timeline-role">Web Developer Intern</div>
            <div className="company-name">Công ty timviec365</div>
          </div>
          <p className="timeline-desc">Thực tập phát triển web tại timviec365 — nền tảng tuyển dụng trực tuyến hàng đầu Việt Nam.</p>
          <ul className="experience-bullets">
            <li>Hỗ trợ phát triển và bảo trì <b>giao diện người dùng</b></li>
            <li>Làm quen với quy trình phát triển phần mềm thực tế</li>
            <li>Công nghệ: <b>PHP · HTML/CSS · JavaScript · MySQL</b></li>
          </ul>
        </div>
      </ScrollableGrid>
    </section>
  );
}
