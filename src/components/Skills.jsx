import { useRef } from 'react';
import { FaCode, FaLayerGroup, FaTools } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';

// Dùng CSS animation đơn giản thay vì motion.span để giảm JS overhead
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function Skills({ isActive, isMobile }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const showAnim = isMobile ? isInView : isActive;

  return (
    <section id="skills" ref={ref} className={showAnim ? 'section-active' : ''}>
      <motion.div 
        className="section-header"
        initial="hidden"
        animate={showAnim ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
      >
        <p className="section-label">Năng lực</p>
        <h2 className="section-title">Kỹ Năng Chuyên Môn</h2>
        <div className="section-line"></div>
      </motion.div>
      <div className="skills-grid">
        <motion.div 
          className="skill-group"
          variants={containerVariants}
          initial="hidden"
          animate={showAnim ? "visible" : "hidden"}
          viewport={{ once: true }}
        >
          <div className="skill-group-title"><FaCode /> Ngôn ngữ lập trình</div>
          <div className="skill-tags">
            {['PHP', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'SQL', 'Shell Script', 'Apps Script', 'Golang'].map((tag, i) => (
              <span
                key={tag}
                className="skill-tag"
                style={{ animationDelay: `${i * 0.07}s` }}
              >{tag}</span>
            ))}
          </div>
        </motion.div>
        <motion.div 
          className="skill-group"
          variants={containerVariants}
          initial="hidden"
          animate={showAnim ? "visible" : "hidden"}
          viewport={{ once: true }}
        >
          <div className="skill-group-title"><FaLayerGroup /> Framework &amp; Library</div>
          <div className="skill-tags">
            {['Laravel', 'CodeIgniter', 'Vue.js', 'React', 'Node.js', 'jQuery', 'Ajax', 'Tailwind CSS', 'WebSocket', 'WebRTC', 'REST API'].map((tag, i) => (
              <span
                key={tag}
                className="skill-tag"
                style={{ animationDelay: `${i * 0.06}s` }}
              >{tag}</span>
            ))}
          </div>
        </motion.div>
        <motion.div 
          className="skill-group"
          variants={containerVariants}
          initial="hidden"
          animate={showAnim ? "visible" : "hidden"}
          viewport={{ once: true }}
        >
          <div className="skill-group-title"><FaTools /> Tools &amp; Platform</div>
          <div className="skill-tags">
            {['Git / GitHub', 'MySQL', 'Redis', 'Linux', 'Nginx', 'Postman', 'Figma', 'Playwright', 'Unit Test', 'Feature Test'].map((tag, i) => (
              <span
                key={tag}
                className="skill-tag"
                style={{ animationDelay: `${i * 0.07}s` }}
              >{tag}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
