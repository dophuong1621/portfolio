import{r,j as n}from"./vendor-react-CoeMXAFd.js";const a={name:"Đỗ Thế Phương",email:"dtp1621@gmail.com",phone:"0522901602",zaloUrl:"https://zalo.me/0522901602",techStack:{languages:["PHP","JavaScript","TypeScript","HTML5","CSS3","SQL","Shell Script","Apps Script","Golang"],frameworks:["Laravel","CodeIgniter","Vue.js","React","Node.js","jQuery","Ajax","Tailwind CSS","WebSocket","WebRTC","REST API"],tools:["Git / GitHub","MySQL","Redis","Linux","Nginx","Postman","Figma","Playwright","Unit Test","Feature Test"]},projects:[{name:"JiRim Chat System",icon:"💬",tags:["Laravel","Vue","WebRTC","WebSocket","Redis","Playwright","Pusher"],desc:"Hệ thống chat real-time đầy đủ tính năng: nhắn tin 1-1 & nhóm, gọi video P2P (WebRTC), emoji reactions, pin tin nhắn, presence tracking và E2E testing."},{name:"Ritokey",icon:"🔑",tags:["Laravel","HTML/CSS","Tailwind CSS","jQuery","Ajax","MySQL","Pusher"],desc:"Nền tảng mua bán tài khoản và dịch vụ kỹ thuật số (YouTube, Cursor, ...). Hỗ trợ giao dịch tự động, quản lý đơn hàng và hệ thống kho thông minh.",demo:"https://ritokey.com"},{name:"Hub HQ",icon:"🏠",tags:["Laravel","HTML/CSS","jQuery","Ajax","MySQL"],desc:"Hệ thống Hub tổng hợp, kết nối và quản lý các dịch vụ nội bộ của HQ Group. Cung cấp giao diện trung tâm để điều hướng và vận hành các hệ thống con."},{name:"Kho tập trung – Kho thành viên",icon:"🏪",tags:["Laravel","MySQL","HTML/CSS","JavaScript","jQuery","Ajax"],desc:"Nền tảng thương mại điện tử chuyên cung cấp tài khoản game và dịch vụ số tự động. Tối ưu quy trình bảo mật, tốc độ giao dịch và quản lý kho thông minh.",demo:"https://shoprito.com"},{name:"HPay",icon:"💳",tags:["Laravel","MySQL","REST API","JavaScript","jQuery"],desc:"Hệ thống thanh toán nội bộ của HQ Group, xử lý giao dịch nạp tiền, rút tiền và quản lý ví người dùng một cách an toàn và tự động."},{name:"Báo cáo tài chính",icon:"📊",tags:["Laravel","MySQL","JavaScript","jQuery","Ajax"],desc:"Hệ thống báo cáo tài chính nội bộ, tổng hợp dữ liệu giao dịch, xuất báo cáo theo kỳ và trực quan hóa số liệu cho ban quản lý."},{name:"Raonhanh365",icon:"🛒",tags:["Laravel","MySQL","HTML/CSS","JavaScript","jQuery","Ajax"],desc:"Nền tảng thương mại điện tử dạng rao vặt đa ngành hàng (xe cộ, đồ điện tử, đồ dùng cá nhân...). Hỗ trợ tìm kiếm, lọc, trò chuyện trực tiếp.",demo:"https://raovat6s.com"}],experience:[{period:"02/2023 — 05/2026",role:"Web Developer",company:"HQ Group",desc:"Phát triển và vận hành hệ thống web thương mại điện tử tập trung, quản lý kho thành viên và tối ưu hạ tầng server."},{period:"10/2022 — 12/2022",role:"Web Developer Intern",company:"Tigren",desc:"Thực tập phát triển web, học nền tảng Magento và làm việc trực tiếp trên môi trường Linux."},{period:"03/2022 — 06/2022",role:"Web Developer Intern",company:"timviec365",desc:"Thực tập phát triển web tại nền tảng tuyển dụng trực tuyến hàng đầu Việt Nam."}]};function P(s){const m=s.toLowerCase().trim(),b=" "+m.replace(/[.,!?()[\]{}"':;\-]/g," ")+" ",i=(...c)=>c.some(e=>e.length<=3?b.includes(" "+e+" "):m.includes(e));if(i("hello","hi","xin chào","chào","hey","alo"))return`👋 Xin chào! Tôi là trợ lý AI của **${a.name}** – một Full-stack Developer nhiệt huyết.

Bạn muốn biết gì về Phương? Kỹ năng, dự án, hay muốn xem CV? Tôi sẵn sàng hỗ trợ! 😊`;if(i("phương là ai","giới thiệu","who is","introduce","về phương","về anh ấy","about","thông tin cá nhân","cá nhân","bản thân"))return`**${a.name}** là một Full-stack Developer với năng lực phát triển toàn diện:

• 💻 **Dev**: Xây dựng Backend API & thiết kế Frontend UI/UX
• 🖥️ **DevOps**: Cấu hình Nginx, Linux Server Admin
• 🧪 **QA**: Tự động hóa kiểm thử phần mềm

Phương cover **toàn bộ vòng đời** của một dự án web!

📄 Bạn có thể bấm nút "Tải CV" ở màn hình đầu trang để biết thêm nha!`;if(i("skill","kỹ năng","tech","stack","công nghệ","laravel","php","vue","react","backend","frontend","server","nginx","websocket","typescript","golang","playwright","redis")){const c=a.techStack;return`⚡ **Tech Stack của Phương:**

🔤 **Ngôn ngữ:** ${c.languages.join(", ")}

📦 **Framework & Library:** ${c.frameworks.join(", ")}

🛠️ **Tools & Platform:** ${c.tools.join(", ")}

Kéo xuống phần **Kỹ Năng** để xem chi tiết!`}if(i("dự án","project","work","làm gì","portfolio","jirim","ritokey","hub hq","hpay","raonhanh","kho","báo cáo","tài chính","chat","warehouse")){const c=a.projects.map(e=>{const d=e.tags?` _(${e.tags.slice(0,3).join(", ")}…)_`:"",v=e.demo?` → [Demo](${e.demo})`:e.source?` → [Source](${e.source})`:"";return`• **${e.icon} ${e.name}**${d}: ${e.desc}${v}`}).join(`
`);return`🚀 **Các dự án nổi bật (${a.projects.length} dự án):**

${c}

Kéo xuống phần **Dự Án** để xem chi tiết!`}return i("kinh nghiệm","experience","năm kinh nghiệm","career","sự nghiệp","làm việc","công ty","hq group","tigren","timviec")?`💼 **Kinh nghiệm làm việc:**

${a.experience.map(e=>`• **${e.role}** @ **${e.company}** _(${e.period})_
  ${e.desc}`).join(`
`)}

Tổng cộng **3+ năm** kinh nghiệm. Kéo xuống phần **Kinh Nghiệm** để xem chi tiết!`:i("realtime","real-time","chat","websocket","socket")?`💬 **Real-time Chat System:**

Phương đã xây dựng hoàn chỉnh hệ thống chat WebSocket với:
• Đồng bộ biệt danh người dùng
• Đếm unread_count per-user chính xác
• Đánh dấu đọc / chưa đọc real-time
• Tự động test với **ReadUnreadTest** (PHPUnit)

Rất phù hợp cho các hệ thống cần tính năng real-time!`:i("test","unit test","phpunit","automation","tự động")?`🧪 **Testing:**

Phương viết Unit Test nghiêm túc với **PHPUnit / Laravel**:
• Test case cho các luồng nghiệp vụ phức tạp
• Ví dụ: **ReadUnreadTest** cho hệ thống chat
• Đảm bảo chất lượng code trước khi deploy

Đây là điểm cộng lớn khi so với nhiều developer khác!`:i("liên hệ","contact","email","hire","tuyển dụng","recruit","work together","hợp tác","offer")?`📬 **Liên hệ với Phương:**

• 📧 **Email:** [${a.email}](mailto:${a.email})
• 📞 **Điện thoại:** [${a.phone}](tel:${a.phone})
• 💬 **Zalo:** [Nhắn tin Zalo](${a.zaloUrl})

Phương đang **mở cửa cho các cơ hội mới**! Hãy gửi email hoặc gọi trực tiếp để trao đổi nhé. 🤝`:i("cv","resume","hồ sơ","tải","download")?`📄 **Tải CV của Phương:**

Bạn có thể nhấn nút **"Tải CV"** ngay tại phần giới thiệu ở đầu trang web nhé!

CV bao gồm:
• Kinh nghiệm làm việc chi tiết
• Quá trình học tập & Kỹ năng
• Các dự án nổi bật

⬆️ Cuộn lên và bấm nút "Tải CV" nha!`:i("lương","salary","mức lương","compensation","số điện thoại","phone","address","địa chỉ","zalo")?`ℹ️ Về thông tin này, bạn có thể **trao đổi trực tiếp với anh Phương** nhé!

📧 **Email:** [${a.email}](mailto:${a.email})
💬 **Zalo:** [${a.phone}](${a.zaloUrl})`:i("sở thích","hobby","hobbies","ngoài công việc","outside work","nhiếp ảnh","photo","bóng đá","football","ai","sáng tạo")?`🌟 **Ngoài công việc, Phương:**

📸 **Nhiếp ảnh điện ảnh** – Chụp chân dung cinematic với Canon EOS R5 + 85mm f/1.4
⚽ **Bóng đá** – Từng ghi 5 bàn + 3 kiến tạo trong 1 trận
🤖 **AI sáng tạo** – Đam mê tạo hình ảnh & âm nhạc bằng AI

Phương là người đa tài và sáng tạo cả trong lẫn ngoài công việc! 😄`:i("system design","thiết kế hệ thống","kiến trúc","architecture","hiệu năng","performance","metric","con số")?`📊 **System Architecture & Performance:**

Phương thiết kế hệ thống tập trung vào hiệu năng và khả năng mở rộng:
• **Tối ưu tự động hóa:** Giảm 85% thời gian xử lý đơn (Dự án Ritokey).
• **Tối ưu tài nguyên:** Giảm 70% băng thông server nhờ kiến trúc WebRTC (Dự án JiRim).
• **Thiết kế luồng dữ liệu:** Xây dựng ERD, Sequence Diagram, API Specs rõ ràng để scale hệ thống an toàn.

Sự kết hợp giữa code tốt và thiết kế chuẩn giúp hệ thống luôn ổn định!`:i("tại sao","why hire","điểm mạnh","strength","why phuong","why should","lý do")?`🏆 **Tại sao chọn Phương?**

✅ **Fullstack Expertise:** Thành thạo cả Backend lẫn Frontend, phát triển sản phẩm end-to-end.
✅ **Deep Knowledge:** Chuyên sâu PHP/Laravel & Vue 3, giải quyết các bài toán khó (Race Condition, WebSocket, WebRTC).
✅ **DevOps Mindset:** Quản lý Linux Server, CI/CD, Nginx, hướng tới High Availability.
✅ **Data-driven:** Tối ưu hóa và đo lường hệ thống bằng con số (SLA 99.9%, latency < 50ms).

📄 Bạn tải CV để xem chi tiết nhé → nút ở đầu trang!`:`🤔 Cảm ơn bạn đã hỏi! Tôi chưa có thông tin chính xác về điều này.

Bạn có thể hỏi về:
• 💼 **Kỹ năng & Tech Stack**
• 🚀 **Dự án đã làm**
• 📊 **Kiến trúc hệ thống**
• 📬 **Cách liên hệ**
• 📄 **Tải CV**

Hoặc liên hệ trực tiếp: **${a.email}**`}const N=[{label:"👋 Giới thiệu",value:"Hãy giới thiệu thông tin cá nhân của Phương"},{label:"💼 Tech Stack",value:"Kỹ năng và công nghệ của Phương là gì?"},{label:"🚀 Dự án",value:"Kể tôi nghe về các dự án nổi bật"},{label:"🏢 Kinh nghiệm",value:"Kinh nghiệm làm việc của Phương"},{label:"📤 Liên hệ",value:"Làm sao để liên hệ với Phương?"}];function $(){const[s,m]=r.useState(!1),[b,i]=r.useState([{id:1,role:"assistant",text:`👋 Xin chào! Tôi là **AI Assistant** của **Đỗ Thế Phương**.

Bạn muốn tìm hiểu gì về Phương? Kỹ năng, dự án hay cơ hội hợp tác? 😊`,time:new Date}]),[c,e]=r.useState(""),[d,v]=r.useState(!1),[T,y]=r.useState(!1),j=r.useRef(null),f=r.useRef(null),k=r.useCallback(()=>{j.current?.scrollIntoView({behavior:"smooth"})},[]);r.useEffect(()=>{s&&(k(),y(!1),setTimeout(()=>f.current?.focus(),300))},[s,b,k]);const x=r.useCallback(async t=>{const p=(t||c).trim();if(!p)return;const l={id:Date.now(),role:"user",text:p,time:new Date};i(o=>[...o,l]),e(""),v(!0),await new Promise(o=>setTimeout(o,700+Math.random()*600));const g=P(p);i(o=>[...o,{id:Date.now()+1,role:"assistant",text:g,time:new Date}]),v(!1),s||y(!0)},[c,s]),S=t=>{t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),x())};function C(t){const p=/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\n)/g,l=[];let g=0,o;for(;(o=p.exec(t))!==null;){o.index>g&&l.push({type:"text",value:t.slice(g,o.index)});const h=o[0];if(h===`
`)l.push({type:"br"});else if(h.startsWith("**"))l.push({type:"bold",value:h.slice(2,-2)});else{const u=h.match(/^\[([^\]]+)\]\(([^)]+)\)$/);u?l.push({type:"link",label:u[1],href:u[2]}):l.push({type:"text",value:h})}g=o.index+h.length}return g<t.length&&l.push({type:"text",value:t.slice(g)}),l.map((h,u)=>h.type==="br"?n.jsx("br",{},u):h.type==="bold"?n.jsx("strong",{children:h.value},u):h.type==="link"?n.jsx("a",{href:h.href,target:"_blank",rel:"noopener noreferrer",style:{color:"#a78bfa",textDecoration:"underline"},children:h.label},u):h.value)}const w=t=>t.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"});return n.jsxs(n.Fragment,{children:[n.jsxs("button",{className:`chatbot-tab ${s?"chatbot-tab--open":""}`,onClick:()=>m(t=>!t),"aria-label":"Mở/đóng AI Chat",id:"chatbot-toggle-btn",children:[s?n.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:n.jsx("polyline",{points:"9 18 15 12 9 6"})}):n.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[n.jsx("path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}),n.jsx("circle",{cx:"9",cy:"10",r:"0.8",fill:"currentColor"}),n.jsx("circle",{cx:"12",cy:"10",r:"0.8",fill:"currentColor"}),n.jsx("circle",{cx:"15",cy:"10",r:"0.8",fill:"currentColor"})]}),n.jsx("span",{className:"chatbot-tab-label",children:"AI Chat"}),T&&!s&&n.jsx("span",{className:"chatbot-badge"})]}),s&&n.jsx("div",{className:"chatbot-backdrop",onClick:()=>m(!1),"aria-hidden":"true"}),n.jsxs("div",{className:`chatbot-drawer ${s?"chatbot-drawer--open":""}`,id:"chatbot-widget",role:"dialog","aria-label":"AI Chat Assistant",children:[n.jsxs("div",{className:"chatbot-header",children:[n.jsxs("div",{className:"chatbot-avatar",children:[n.jsx("span",{children:"AI"}),n.jsx("span",{className:"chatbot-online-dot"})]}),n.jsxs("div",{className:"chatbot-header-info",children:[n.jsx("p",{className:"chatbot-header-name",children:"PhuongDT Assistant"}),n.jsx("p",{className:"chatbot-header-status",children:d?"✦ Đang nhập...":"● Online"})]}),n.jsx("button",{className:"chatbot-close-btn",onClick:()=>m(!1),"aria-label":"Đóng chat",children:n.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:n.jsx("polyline",{points:"9 18 15 12 9 6"})})})]}),n.jsxs("div",{className:"chatbot-messages",id:"chatbot-messages",children:[b.map(t=>n.jsxs("div",{className:`chatbot-msg chatbot-msg--${t.role}`,children:[t.role==="assistant"&&n.jsx("div",{className:"chatbot-msg-avatar",children:n.jsx("span",{children:"AI"})}),n.jsxs("div",{className:"chatbot-msg-bubble",children:[n.jsx("p",{className:"chatbot-msg-text",children:C(t.text)}),n.jsx("span",{className:"chatbot-msg-time",children:w(t.time)})]})]},t.id)),d&&n.jsxs("div",{className:"chatbot-msg chatbot-msg--assistant",children:[n.jsx("div",{className:"chatbot-msg-avatar",children:n.jsx("span",{children:"AI"})}),n.jsxs("div",{className:"chatbot-msg-bubble chatbot-typing",children:[n.jsx("span",{}),n.jsx("span",{}),n.jsx("span",{})]})]}),n.jsx("div",{ref:j})]}),n.jsx("div",{className:"chatbot-quick-prompts",children:N.map(t=>n.jsx("button",{className:"chatbot-quick-btn",onClick:()=>x(t.value),id:`quick-${t.label.replace(/\s+/g,"-").toLowerCase()}`,children:t.label},t.value))}),n.jsxs("div",{className:"chatbot-input-row",children:[n.jsx("input",{ref:f,id:"chatbot-input",className:"chatbot-input",type:"text",placeholder:"Nhập câu hỏi của bạn...",value:c,onChange:t=>e(t.target.value),onKeyDown:S,maxLength:300}),n.jsx("button",{className:"chatbot-send-btn",onClick:()=>x(),disabled:!c.trim()||d,"aria-label":"Gửi tin nhắn",id:"chatbot-send-btn",children:n.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",children:n.jsx("path",{d:"M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"})})})]}),n.jsx("p",{className:"chatbot-footer-note",children:"Powered by PhuongDT AI · Built with ♥"})]})]})}export{$ as default};
