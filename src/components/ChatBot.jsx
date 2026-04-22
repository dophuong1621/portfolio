import { useState, useRef, useEffect, useCallback } from 'react';

// ─────────────────────────────────────────────
// KNOWLEDGE BASE – Đỗ Thế Phương (PhuongDT)
// ─────────────────────────────────────────────
const KB = {
  name: 'Đỗ Thế Phương',
  alias: 'PhuongDT',
  roles: ['Senior Business Analyst (BA)', 'Full-stack Software Developer'],
  email: 'dtp1621@gmail.com',
  phone: '0522901602',
  zaloUrl: 'https://zalo.me/0522901602',
  techStack: {
    languages: ['PHP', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'SQL', 'Shell Script', 'Apps Script', 'Golang'],
    frameworks: ['Laravel', 'CodeIgniter', 'Vue.js', 'React', 'Node.js', 'jQuery', 'Ajax', 'Tailwind CSS', 'WebSocket', 'WebRTC', 'REST API'],
    tools: ['Git / GitHub', 'MySQL', 'Redis', 'Linux', 'Nginx', 'Postman', 'Figma', 'Playwright', 'Unit Test', 'Feature Test'],
  },
  projects: [
    {
      name: 'JiRim Chat System',
      icon: '💬',
      tags: ['Laravel', 'Vue', 'WebRTC', 'WebSocket', 'Redis', 'Playwright', 'Pusher'],
      desc: 'Hệ thống chat real-time đầy đủ: nhắn tin 1-1 & nhóm, gọi video P2P (WebRTC), emoji reactions, pin tin nhắn, presence tracking và E2E testing với Playwright.',
    },
    {
      name: 'Ritokey',
      icon: '🔑',
      tags: ['Laravel', 'Tailwind CSS', 'jQuery', 'Ajax', 'MySQL', 'Pusher'],
      desc: 'Nền tảng mua bán tài khoản và dịch vụ kỹ thuật số (YouTube, Cursor…). Giao dịch tự động, quản lý đơn hàng và kho hàng thông minh.',
      demo: 'https://ritokey.com',
    },
    {
      name: 'Hub HQ',
      icon: '🏠',
      tags: ['Laravel', 'jQuery', 'Ajax', 'MySQL'],
      desc: 'Hệ thống Hub tổng hợp kết nối và quản lý các dịch vụ nội bộ của HQ Group. Giao diện trung tâm điều hướng và vận hành các hệ thống con.',
    },
    {
      name: 'Kho tập trung – Kho thành viên',
      icon: '🏪',
      tags: ['Laravel', 'MySQL', 'JavaScript', 'jQuery', 'Ajax'],
      desc: 'Thương mại điện tử chuyên biệt cho tài khoản game và dịch vụ bổ trợ. Tập trung vào bảo mật, tốc độ giao dịch và quản lý kho thông minh.',
      demo: 'https://shoprito.com',
    },
    {
      name: 'HPay',
      icon: '💳',
      tags: ['Laravel', 'MySQL', 'REST API', 'JavaScript', 'jQuery'],
      desc: 'Hệ thống thanh toán nội bộ HQ Group: xử lý nạp/rút tiền và quản lý ví người dùng an toàn, tự động.',
    },
    {
      name: 'Báo cáo tài chính',
      icon: '📊',
      tags: ['Laravel', 'MySQL', 'JavaScript', 'jQuery', 'Ajax'],
      desc: 'Hệ thống báo cáo tài chính nội bộ: tổng hợp dữ liệu giao dịch, xuất báo cáo theo kỳ và trực quan hóa số liệu cho ban quản lý.',
    },
    {
      name: 'Raonhanh365',
      icon: '🛒',
      tags: ['Laravel', 'MySQL', 'JavaScript', 'jQuery', 'Ajax'],
      desc: 'Nền tảng rao vặt đa ngành (xe cộ, điện tử, đồ dùng cá nhân…). Hỗ trợ tìm kiếm, lọc nâng cao và chat trực tiếp giữa người mua & bán.',
      demo: 'https://raovat6s.com',
    },
  ],
  personality: {
    photography: 'Đam mê nhiếp ảnh điện ảnh (Cinematic), chụp chân dung với EOS R5 + 85mm f/1.4.',
    football: 'Đam mê bóng đá, từng ghi 5 bàn + 3 kiến tạo trong một trận.',
    ai: 'Yêu thích AI sáng tạo – tạo hình ảnh, sáng tác âm nhạc với công nghệ AI.',
  },
  cvLink: 'https://dophuong1621.github.io/portfolio/#hero',
  experience: [
    {
      period: '02/2023 — 05/2026',
      role: 'Web Developer',
      company: 'HQ Group',
      desc: 'Phát triển và vận hành hệ thống web thương mại điện tử tập trung, quản lý kho thành viên và tối ưu hạ tầng server.',
    },
    {
      period: '10/2022 — 12/2022',
      role: 'Web Developer Intern',
      company: 'Tigren',
      desc: 'Thực tập phát triển web, học nền tảng Magento và làm việc trực tiếp trên môi trường Linux.',
    },
    {
      period: '03/2022 — 06/2022',
      role: 'Web Developer Intern',
      company: 'timviec365',
      desc: 'Thực tập phát triển web tại nền tảng tuyển dụng trực tuyến hàng đầu Việt Nam.',
    },
  ],
};

// ─────────────────────────────────────────────
// SMART RESPONSE ENGINE (rule-based NLP)
// ─────────────────────────────────────────────
function generateResponse(userInput) {
  const msg = userInput.toLowerCase().trim();

  // Fix lỗi bắt nhầm chuỗi con (VD: "kinh nghiệm" chứa "hi", "bạn" chứa "ba")
  const cleanMsg = ' ' + msg.replace(/[.,!?()[\]{}"':;\-]/g, ' ') + ' ';
  const match = (...keywords) => keywords.some(k => {
    // Từ khóa ngắn (<=3 ký tự) bắt buộc phải đứng riêng rẽ như một từ
    if (k.length <= 3) return cleanMsg.includes(' ' + k + ' ');
    // Khắt khe thêm một chút với các từ đặc biệt nếu cần, nhưng nói chung >=4 ký tự ít bị trùng
    return msg.includes(k);
  });

  // Greetings
  if (match('hello', 'hi', 'xin chào', 'chào', 'hey', 'alo')) {
    return `👋 Xin chào! Tôi là trợ lý AI của **${KB.name}** – một Senior BA & Full-stack Developer.\n\nBạn muốn biết gì về Phương? Kỹ năng, dự án, hay muốn tải CV? Tôi sẵn sàng hỗ trợ! 😊`;
  }

  // Who / Introduction
  if (match('phương là ai', 'giới thiệu', 'who is', 'introduce', 'về phương', 'về anh ấy', 'about')) {
    return `**${KB.name}** là một Senior BA & Full-stack Developer với điểm mạnh đặc biệt:\n\n• 🔍 **BA**: Phân tích nghiệp vụ, thiết kế luồng hệ thống\n• 💻 **Dev**: Lập trình từ backend đến frontend\n• 🖥️ **DevOps**: Cấu hình Nginx, bảo mật server\n\nPhương cover **toàn bộ vòng đời** của một dự án phần mềm!\n\n📄 Tải CV đầy đủ ở đầu trang nhé!`;
  }

  // Tech stack / Skills
  if (match('skill', 'kỹ năng', 'tech', 'stack', 'công nghệ', 'laravel', 'php', 'vue', 'react', 'backend', 'frontend', 'server', 'nginx', 'websocket', 'typescript', 'golang', 'playwright', 'redis')) {
    const ts = KB.techStack;
    return `⚡ **Tech Stack của Phương:**\n\n🔤 **Ngôn ngữ:** ${ts.languages.join(', ')}\n\n📦 **Framework & Library:** ${ts.frameworks.join(', ')}\n\n🛠️ **Tools & Platform:** ${ts.tools.join(', ')}\n\nKéo xuống phần **Kỹ Năng** để xem chi tiết!`;
  }

  // Projects
  if (match('dự án', 'project', 'work', 'làm gì', 'portfolio', 'jirim', 'ritokey', 'hub hq', 'hpay', 'raonhanh', 'kho', 'báo cáo', 'tài chính', 'chat', 'warehouse')) {
    const projectList = KB.projects.map(p => {
      const tagStr = p.tags ? ` _(${p.tags.slice(0, 3).join(', ')}…)_` : '';
      const link = p.demo ? ` → [Demo](${p.demo})` : p.source ? ` → [Source](${p.source})` : '';
      return `• **${p.icon} ${p.name}**${tagStr}: ${p.desc}${link}`;
    }).join('\n');
    return `🚀 **Các dự án nổi bật (${KB.projects.length} dự án):**\n\n${projectList}\n\nKéo xuống phần **Dự Án** để xem chi tiết!`;
  }

  // Experience / Career
  if (match('kinh nghiệm', 'experience', 'năm kinh nghiệm', 'career', 'sự nghiệp', 'làm việc', 'công ty', 'hq group', 'tigren', 'timviec')) {
    const expList = KB.experience.map(e =>
      `• **${e.role}** @ **${e.company}** _(${e.period})_\n  ${e.desc}`
    ).join('\n');
    return `💼 **Kinh nghiệm làm việc:**\n\n${expList}\n\nTổng cộng **3+ năm** kinh nghiệm. Kéo xuống phần **Kinh Nghiệm** để xem chi tiết!`;
  }

  // Real-time / WebSocket
  if (match('realtime', 'real-time', 'chat', 'websocket', 'socket')) {
    return `💬 **Real-time Chat System:**\n\nPhương đã xây dựng hoàn chỉnh hệ thống chat WebSocket với:\n• Đồng bộ biệt danh người dùng\n• Đếm unread_count per-user chính xác\n• Đánh dấu đọc / chưa đọc real-time\n• Tự động test với **ReadUnreadTest** (PHPUnit)\n\nRất phù hợp cho các hệ thống cần tính năng real-time!`;
  }

  // Testing / Unit Test
  if (match('test', 'unit test', 'phpunit', 'automation', 'tự động')) {
    return `🧪 **Testing:**\n\nPhương viết Unit Test nghiêm túc với **PHPUnit / Laravel**:\n• Test case cho các luồng nghiệp vụ phức tạp\n• Ví dụ: **ReadUnreadTest** cho hệ thống chat\n• Đảm bảo chất lượng code trước khi deploy\n\nĐây là điểm cộng lớn khi so với nhiều developer khác!`;
  }

  // Contact / Hire
  if (match('liên hệ', 'contact', 'email', 'hire', 'tuyển dụng', 'recruit', 'work together', 'hợp tác', 'offer')) {
    return `📬 **Liên hệ với Phương:**\n\n• 📧 **Email:** [${KB.email}](mailto:${KB.email})\n• 📞 **Điện thoại:** [${KB.phone}](tel:${KB.phone})\n• 💬 **Zalo:** [Nhắn tin Zalo](${KB.zaloUrl})\n\nPhương đang **mở cửa cho các cơ hội mới**! Hãy gửi email hoặc gọi trực tiếp để trao đổi nhé. 🤝`;
  }

  // CV / Resume
  if (match('cv', 'resume', 'hồ sơ', 'tải', 'download')) {
    return `📄 **Tải CV của Phương:**\n\nCV đầy đủ có sẵn ngay ở **đầu trang** (nút "Tải CV" trong phần Hero)!\n\nCV bao gồm:\n• Kinh nghiệm làm việc chi tiết\n• Tech stack & dự án nổi bật\n• Thông tin liên hệ\n\n⬆️ Cuộn lên đầu trang để tải nhé!`;
  }

  // Salary / sensitive info
  if (match('lương', 'salary', 'mức lương', 'compensation', 'số điện thoại', 'phone', 'address', 'địa chỉ', 'zalo')) {
    return `ℹ️ Về thông tin này, bạn có thể **trao đổi trực tiếp với anh Phương** nhé!\n\n📧 **Email:** [${KB.email}](mailto:${KB.email})\n💬 **Zalo:** [${KB.phone}](${KB.zaloUrl})`;
  }

  // Hobbies / Personality
  if (match('sở thích', 'hobby', 'hobbies', 'ngoài công việc', 'outside work', 'nhiếp ảnh', 'photo', 'bóng đá', 'football', 'ai', 'sáng tạo')) {
    return `🌟 **Ngoài công việc, Phương:**\n\n📸 **Nhiếp ảnh điện ảnh** – Chụp chân dung cinematic với Canon EOS R5 + 85mm f/1.4\n⚽ **Bóng đá** – Từng ghi 5 bàn + 3 kiến tạo trong 1 trận\n🤖 **AI sáng tạo** – Đam mê tạo hình ảnh & âm nhạc bằng AI\n\nPhương là người đa tài và sáng tạo cả trong lẫn ngoài công việc! 😄`;
  }

  // BA / Business Analyst
  if (match('ba', 'business analyst', 'phân tích', 'nghiệp vụ', 'system design', 'thiết kế hệ thống')) {
    return `📊 **Business Analyst skills:**\n\nPhương kết hợp BA + Developer hiếm có:\n• **Phân tích nghiệp vụ** từ yêu cầu khách hàng\n• **Thiết kế luồng hệ thống** (flow, ERD, API spec)\n• **Trực tiếp lập trình** thay vì chỉ viết tài liệu\n\nĐiều này giúp giảm chi phí communication và rút ngắn thời gian phát triển đáng kể!`;
  }

  // Why hire
  if (match('tại sao', 'why hire', 'điểm mạnh', 'strength', 'why phuong', 'why should', 'lý do')) {
    return `🏆 **Tại sao chọn Phương?**\n\n✅ **Toàn vòng đời:** BA → Code → Deploy – chỉ 1 người\n✅ **Laravel chuyên sâu** + viết Unit Test nghiêm túc\n✅ **Real-time systems** với WebSocket\n✅ **Server management** (Nginx, bảo mật)\n✅ **Tư duy hệ thống** của một BA, tay nghề của một Developer\n\n📄 Tải CV để xem chi tiết → nút ở đầu trang!`;
  }

  // Default fallback
  return `🤔 Cảm ơn bạn đã hỏi! Tôi chưa có thông tin chính xác về điều này.\n\nBạn có thể hỏi về:\n• 💼 **Kỹ năng & Tech Stack**\n• 🚀 **Dự án đã làm**\n• 📊 **Kinh nghiệm BA**\n• 📬 **Cách liên hệ**\n• 📄 **Tải CV**\n\nHoặc liên hệ trực tiếp: **${KB.email}**`;
}

// ─────────────────────────────────────────────
// QUICK PROMPTS
// ─────────────────────────────────────────────
const QUICK_PROMPTS = [
  { label: '💼 Tech Stack', value: 'Kỹ năng và công nghệ của Phương là gì?' },
  { label: '🚀 Dự án', value: 'Kể tôi nghe về các dự án nổi bật' },
  { label: '🏢 Kinh nghiệm', value: 'Kinh nghiệm làm việc của Phương' },
  { label: '📤 Liên hệ', value: 'Làm sao để liên hệ với Phương?' },
  // { label: '🏆 Vì sao chọn?', value: 'Tại sao nên tuyển dụng Phương?' },
];

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: `👋 Xin chào! Tôi là **AI Assistant** của **Đỗ Thế Phương**.\n\nBạn muốn tìm hiểu gì về Phương? Kỹ năng, dự án hay cơ hội hợp tác? 😊`,
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMsg, setHasNewMsg] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (open) {
      scrollToBottom();
      setHasNewMsg(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, messages, scrollToBottom]);

  const sendMessage = useCallback(async (text) => {
    const userText = (text || input).trim();
    if (!userText) return;

    const userMsg = { id: Date.now(), role: 'user', text: userText, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // simulate typing delay
    await new Promise(r => setTimeout(r, 700 + Math.random() * 600));

    const reply = generateResponse(userText);
    setMessages(prev => [
      ...prev,
      { id: Date.now() + 1, role: 'assistant', text: reply, time: new Date() },
    ]);
    setIsTyping(false);

    if (!open) setHasNewMsg(true);
  }, [input, open]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ─── Render markdown-like text (safe, no capture-group split issues)
  function renderText(text) {
    // tokenise: **bold**, [label](url), newline → everything else is plain text
    const TOKEN_RE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\n)/g;
    const tokens = [];
    let lastIndex = 0;
    let match;

    while ((match = TOKEN_RE.exec(text)) !== null) {
      // plain text before this token
      if (match.index > lastIndex) {
        tokens.push({ type: 'text', value: text.slice(lastIndex, match.index) });
      }
      const raw = match[0];
      if (raw === '\n') {
        tokens.push({ type: 'br' });
      } else if (raw.startsWith('**')) {
        tokens.push({ type: 'bold', value: raw.slice(2, -2) });
      } else {
        const lm = raw.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (lm) tokens.push({ type: 'link', label: lm[1], href: lm[2] });
        else tokens.push({ type: 'text', value: raw });
      }
      lastIndex = match.index + raw.length;
    }
    // trailing plain text
    if (lastIndex < text.length) {
      tokens.push({ type: 'text', value: text.slice(lastIndex) });
    }

    return tokens.map((tok, i) => {
      if (tok.type === 'br')   return <br key={i} />;
      if (tok.type === 'bold') return <strong key={i}>{tok.value}</strong>;
      if (tok.type === 'link') return (
        <a key={i} href={tok.href} target="_blank" rel="noopener noreferrer"
          style={{ color: '#a78bfa', textDecoration: 'underline' }}>
          {tok.label}
        </a>
      );
      return tok.value;
    });
  }

  const fmtTime = (d) =>
    d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      {/* ── Vertical Tab (mép phải) ── */}
      <button
        className={`chatbot-tab ${open ? 'chatbot-tab--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Mở/đóng AI Chat"
        id="chatbot-toggle-btn"
      >
        {open ? (
          /* icon chevron right khi mở */
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        ) : (
          /* icon chat khi đóng */
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <circle cx="9" cy="10" r="0.8" fill="currentColor" />
            <circle cx="12" cy="10" r="0.8" fill="currentColor" />
            <circle cx="15" cy="10" r="0.8" fill="currentColor" />
          </svg>
        )}
        <span className="chatbot-tab-label">AI Chat</span>
        {hasNewMsg && !open && <span className="chatbot-badge" />}
      </button>

      {/* ── Backdrop (click ngoài để đóng) ── */}
      {open && (
        <div
          className="chatbot-backdrop"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Side Drawer (toàn chiều cao, trượt từ phải) ── */}
      <div
        className={`chatbot-drawer ${open ? 'chatbot-drawer--open' : ''}`}
        id="chatbot-widget"
        role="dialog"
        aria-label="AI Chat Assistant"
      >
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-avatar">
            <span>AI</span>
            <span className="chatbot-online-dot" />
          </div>
          <div className="chatbot-header-info">
            <p className="chatbot-header-name">PhuongDT Assistant</p>
            <p className="chatbot-header-status">
              {isTyping ? '✦ Đang nhập...' : '● Online'}
            </p>
          </div>
          <button
            className="chatbot-close-btn"
            onClick={() => setOpen(false)}
            aria-label="Đóng chat"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages" id="chatbot-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`chatbot-msg chatbot-msg--${msg.role}`}>
              {msg.role === 'assistant' && (
                <div className="chatbot-msg-avatar"><span>AI</span></div>
              )}
              <div className="chatbot-msg-bubble">
                <p className="chatbot-msg-text">{renderText(msg.text)}</p>
                <span className="chatbot-msg-time">{fmtTime(msg.time)}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chatbot-msg chatbot-msg--assistant">
              <div className="chatbot-msg-avatar"><span>AI</span></div>
              <div className="chatbot-msg-bubble chatbot-typing">
                <span /><span /><span />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="chatbot-quick-prompts">
          {QUICK_PROMPTS.map(q => (
            <button
              key={q.value}
              className="chatbot-quick-btn"
              onClick={() => sendMessage(q.value)}
              id={`quick-${q.label.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {q.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="chatbot-input-row">
          <input
            ref={inputRef}
            id="chatbot-input"
            className="chatbot-input"
            type="text"
            placeholder="Nhập câu hỏi của bạn..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={300}
          />
          <button
            className="chatbot-send-btn"
            onClick={() => sendMessage()}
            disabled={!input.trim() || isTyping}
            aria-label="Gửi tin nhắn"
            id="chatbot-send-btn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>

        <p className="chatbot-footer-note">Powered by PhuongDT AI · Built with ♥</p>
      </div>
    </>
  );
}

