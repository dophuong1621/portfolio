import { FaCode, FaLayerGroup, FaTools } from 'react-icons/fa';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Skills({ isActive }) {
  return (
    <section id="skills">
      <motion.div 
        className="section-header"
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
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
          animate={isActive ? "visible" : "hidden"}
          viewport={{ once: true }}
        >
          <div className="skill-group-title"><FaCode /> Ngôn ngữ lập trình</div>
          <div className="skill-tags">
            {['PHP', 'JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML/CSS'].map(tag => (
              <motion.span key={tag} variants={itemVariants} className="skill-tag">{tag}</motion.span>
            ))}
          </div>
        </motion.div>
        <motion.div 
          className="skill-group"
          variants={containerVariants}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          viewport={{ once: true }}
        >
          <div className="skill-group-title"><FaLayerGroup /> Framework & Library</div>
          <div className="skill-tags">
            {['Laravel', 'Vue.js 3', 'Pinia', 'Vite', 'Laravel Echo', 'Pusher', 'Playwright', 'WebRTC'].map(tag => (
              <motion.span key={tag} variants={itemVariants} className="skill-tag">{tag}</motion.span>
            ))}
          </div>
        </motion.div>
        <motion.div 
          className="skill-group"
          variants={containerVariants}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          viewport={{ once: true }}
        >
          <div className="skill-group-title"><FaTools /> Tools & Platform</div>
          <div className="skill-tags">
            {['Git / GitHub', 'MySQL', 'Redis', 'Docker', 'XAMPP', 'Postman', 'VS Code', 'Linux'].map(tag => (
              <motion.span key={tag} variants={itemVariants} className="skill-tag">{tag}</motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
