import { useRef } from 'react';
import { FaCode, FaLayerGroup, FaTools } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';

// Hiệu ứng cho từng card: slide up + fade in
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.33, 1, 0.68, 1],
      delay: i * 0.15, // card 0→0s, card 1→0.15s, card 2→0.30s
    }
  })
};

export default function Skills({ isActive, isMobile }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const showAnim = isMobile ? isInView : isActive;

  const groups = [
    {
      icon: <FaCode />,
      title: 'Core Stack (Chuyên sâu)',
      tags: ['PHP', 'Laravel', 'UX/UI', 'MySQL', 'Redis', 'Nginx', 'REST API'],
      delay: 0.07,
    },
    {
      icon: <FaLayerGroup />,
      title: 'System Architecture & Testing',
      tags: ['System Design', 'API Specs', 'Performance Optimization', 'Playwright', 'Unit Test'],
      delay: 0.06,
    },
    {
      icon: <FaTools />,
      title: 'DevOps & Exploring',
      tags: ['Linux Server', 'CI/CD Pipelines', 'Docker', 'Git / GitHub', 'WebRTC', 'Golang', 'React', 'Figma', 'WebSocket'],
      delay: 0.07,
    },
  ];

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
        {groups.map((group, i) => (
          <motion.div
            key={group.title}
            className="skill-group"
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate={showAnim ? "visible" : "hidden"}
          >
            <div className="skill-group-title">
              {group.icon} {group.title}
            </div>
            <div className="skill-tags">
              {group.tags.map((tag, j) => (
                <span
                  key={tag}
                  className="skill-tag"
                  style={{ animationDelay: `${i * 0.15 + j * group.delay}s` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


