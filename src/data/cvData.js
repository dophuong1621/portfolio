// ─── Nguồn dữ liệu duy nhất (Single Source of Truth) ──────────────────────────
// Mọi thay đổi ở đây sẽ tự động phản ánh cả lên Portfolio lẫn file CV tải về.

export const userInfo = {
  name: 'Đỗ Thế Phương',
  title: 'Full-Stack Developer (PHP / Laravel)',
  dob: '16/02/2001',
  email: 'phuongdt1621@gmail.com',
  phone: '0522901602',
  address: 'Phố Vọng, Hoàng Mai, Hà Nội',
  github: 'github.com/dophuong1621',
  website: 'https://dophuong1621.github.io/portfolio',
  summary:
    'Là một chuyên gia trong việc xây dựng và tối ưu hoá những hệ thống đa nền tảng, giải quyết những bài toán kỹ thuật phức tạp của doanh nghiệp.',
};

export const education = [
  {
    period: '2019 – 2023',
    school: 'Học viện CNTT Bách Khoa - Hà Nội',
    degree: 'Kỹ sư Công nghệ thông tin',
  },
];

export const experiences = [
  {
    period: '03/2022 — 06/2022',
    role: 'Web Developer Intern',
    company: 'Công ty timviec365',
    desc: 'Thực tập phát triển web tại timviec365 — nền tảng tuyển dụng trực tuyến hàng đầu Việt Nam.',
    bullets: [
      'Hỗ trợ phát triển và bảo trì giao diện người dùng',
      'Làm quen với quy trình phát triển phần mềm thực tế',
      'Công nghệ: PHP, Codeigniter, HTML/CSS, JavaScript, jQuery, MySQL',
    ],
  },
  {
    period: '10/2022 — 12/2022',
    role: 'Web Developer Intern',
    company: 'Công ty Tigren',
    desc: 'Thực tập phát triển web tại Tigren, học nền tảng Magento và làm việc trực tiếp trên môi trường Linux.',
    bullets: [
      'Học và thực hành phát triển với Magento (nền tảng eCommerce)',
      'Làm việc trên hệ điều hành Linux trong môi trường thực tế',
      'Tìm hiểu quy trình phát triển thương mại điện tử doanh nghiệp',
    ],
  },
  {
    period: '02/2023 — 05/2026',
    role: 'Web Developer',
    company: 'HQ Group',
    desc: 'Tham gia phát triển và vận hành các hệ thống web nội bộ của HQ Group, bao gồm: nền tảng thương mại điện tử, hệ thống quản lý kho thành viên, hệ thống thanh toán (nạp/rút tiền, quản lý ví, đối soát giao dịch) và các giải pháp bảo mật hạ tầng như chống DDoS, chống spam, rate limiting.',
    bullets: [
      'Tham gia thiết kế, phát triển các hệ thống web nội bộ theo yêu cầu của doanh nghiệp',
      'Phát triển tính năng, tối ưu backend và hệ thống',
      'Quản trị hạ tầng, cấu hình server và điều phối tài nguyên',
    ],
  },
];

export const projects = [
  {
    name: 'Kho tập trung – Kho thành viên',
    desc: 'Shop acc chuyên mua bán tài khoản và dịch vụ số (game, streaming, phần mềm...). Hệ thống quản lý kho tài khoản theo từng loại sản phẩm, tự động giao hàng sau thanh toán, theo dõi tồn kho và lịch sử giao dịch theo thời gian thực.',
    bullets: [
      'Thiết kế & phát triển giao diện người dùng (storefront) và giao diện quản trị (admin panel)',
      'Tối ưu hiệu năng server, bảo mật hệ thống và cấu hình Nginx',
      'Xây dựng và quản lý domain, cấu hình SSL, DNS',
      'Triển khai các giải pháp chống DDoS, chống spam và rate limiting',
    ],
    tech: 'PHP | Laravel | MySQL | Redis | HTML/CSS | JavaScript | jQuery | Ajax',
  },
  {
    name: 'RitoKey',
    desc: 'Nền tảng mua bán tài khoản và dịch vụ kỹ thuật số (YouTube Premium, Cursor AI, ...). Hệ thống xử lý giao dịch hoàn toàn tự động, quản lý đơn hàng theo thời gian thực và kho hàng thông minh.',
    bullets: [
      'Xây dựng luồng giao dịch tự động: thanh toán → cấp tài khoản',
      'Tích hợp Redis Queue xử lý hàng ngàn đơn hàng đồng thời không block hệ thống',
      'Triển khai rate limiting và các lớp bảo mật chống lạm dụng API',
    ],
    tech: 'PHP | Laravel | MySQL | Redis Queue | Tailwind | JavaScript | jQuery | Ajax',
  },
  {
    name: 'Hub HQ',
    desc: 'Hệ thống kho tập trung quản lý tài khoản, mật khẩu và gift card. Cho phép nhập kho hàng loạt, phân loại theo danh mục và phân phối xuống các kho con (shop thành viên) để bán nick, gift card cho người dùng cuối.',
    bullets: [
      'Xây dựng module nhập kho hàng loạt và quản lý tài khoản/gift card theo danh mục',
      'Thiết kế cơ chế phân phối tự động từ kho trung tâm xuống các kho con theo cấu hình',
      'Xây dựng dashboard theo dõi tồn kho, lịch sử phân phối và báo cáo theo thời gian thực',
    ],
    tech: 'PHP | Laravel | MySQL | Redis | HTML/CSS | JavaScript | jQuery | Ajax',
  },
  {
    name: 'HPay – Hệ thống thanh toán nội bộ',
    desc: 'Hệ thống thanh toán nội bộ của HQ Group, xử lý toàn bộ vòng đời giao dịch: nạp tiền, rút tiền, quản lý ví người dùng và đối soát tài chính. Đảm bảo tính nhất quán dữ liệu và an toàn giao dịch trong môi trường đa hệ thống.',
    bullets: [
      'Phát triển API nạp/rút tiền, đồng bộ số dư ví theo thời gian thực',
      'Tích hợp webhook xử lý callback từ cổng thanh toán bên thứ ba',
      'Xây dựng module đối soát giao dịch và báo cáo tài chính tự động',
    ],
    tech: 'PHP | Laravel | MySQL | REST API | JavaScript | jQuery',
  },
  {
    name: 'JiRim Chat System',
    desc: 'Hệ thống chat nội bộ real-time đầy đủ tính năng: nhắn tin 1-1 & nhóm, gọi video P2P (WebRTC), emoji reactions, ghim tin nhắn, theo dõi trạng thái online (presence tracking). Được kiểm thử toàn diện với E2E testing và Unit Test.',
    bullets: [
      'Thiết kế kiến trúc WebSocket với Laravel Broadcasting + Redis Pub/Sub',
      'Tích hợp WebRTC cho tính năng gọi video P2P không cần máy chủ trung gian',
      'Viết bộ E2E test tự động bằng Playwright và Unit Test cho các module nghiệp vụ',
    ],
    tech: 'PHP | Laravel | Vue 3 | WebRTC | WebSocket | Redis | Playwright | Unit Test',
  },
];

export const skills = {
  core: ['PHP', 'Laravel', 'MySQL', 'Redis', 'Nginx', 'REST API', 'UX/UI'],
  architecture: ['System Design', 'API Specs', 'Performance Optimization', 'Playwright', 'Unit Test'],
  devops: ['Linux Server', 'CI/CD', 'Docker', 'Git / GitHub', 'WebRTC', 'Vue 3', 'React', 'WebSocket'],
};

export const activities = [
  { icon: '🏃', name: 'Chạy bộ',    desc: 'Tham gia đầy đủ các giải nội bộ, thành tích top finisher' },
  { icon: '⚽', name: 'Bóng đá',    desc: 'Vô địch giải phong trào toàn công ty' },
  { icon: '🏸', name: 'Pickleball', desc: '🏆 Vô địch đôi nam – Giải Ngày Hội HQ' },
  { icon: '🏸', name: 'Cầu lông',   desc: 'Chơi thường xuyên, tham gia sân ngoại khoá' },
  { icon: '🤖', name: 'AI sáng tạo',desc: 'Tạo hình ảnh & âm nhạc bằng công nghệ AI' },
];
