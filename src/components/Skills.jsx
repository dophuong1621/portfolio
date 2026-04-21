import { FaCode, FaLayerGroup, FaTools } from 'react-icons/fa';

export default function Skills() {
  return (
    <section id="skills">
      <div className="section-header fade-in">
        <p className="section-label">Năng lực</p>
        <h2 className="section-title">Kỹ Năng Chuyên Môn</h2>
        <div className="section-line"></div>
      </div>
      <div className="skills-grid">
        <div className="skill-group fade-in">
          <div className="skill-group-title"><FaCode /> Ngôn ngữ lập trình</div>
          <div className="skill-tags">
            <span className="skill-tag">PHP</span>
            <span className="skill-tag">JavaScript</span>
            <span className="skill-tag">TypeScript</span>
            <span className="skill-tag">Python</span>
            <span className="skill-tag">SQL</span>
            <span className="skill-tag">HTML/CSS</span>
          </div>
        </div>
        <div className="skill-group fade-in">
          <div className="skill-group-title"><FaLayerGroup /> Framework & Library</div>
          <div className="skill-tags">
            <span className="skill-tag">Laravel</span>
            <span className="skill-tag">Vue.js 3</span>
            <span className="skill-tag">Pinia</span>
            <span className="skill-tag">Vite</span>
            <span className="skill-tag">Laravel Echo</span>
            <span className="skill-tag">Pusher</span>
            <span className="skill-tag">Playwright</span>
            <span className="skill-tag">WebRTC</span>
          </div>
        </div>
        <div className="skill-group fade-in">
          <div className="skill-group-title"><FaTools /> Tools & Platform</div>
          <div className="skill-tags">
            <span className="skill-tag">Git / GitHub</span>
            <span className="skill-tag">MySQL</span>
            <span className="skill-tag">Redis</span>
            <span className="skill-tag">Docker</span>
            <span className="skill-tag">XAMPP</span>
            <span className="skill-tag">Postman</span>
            <span className="skill-tag">VS Code</span>
            <span className="skill-tag">Linux</span>
          </div>
        </div>
      </div>
    </section>
  );
}
