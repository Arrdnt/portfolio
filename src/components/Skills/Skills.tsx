
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './Skills.css';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
}

const skills: Skill[] = [
  { name: 'React', level: 95, category: 'Frontend', icon: '⚛️' },
  { name: 'JavaScript', level: 90, category: 'Frontend', icon: '📜' },
  { name: 'TypeScript', level: 85, category: 'Frontend', icon: '🔤' },
  { name: 'Node.js', level: 80, category: 'Backend', icon: '🐳' },
  { name: 'Python', level: 75, category: 'Backend', icon: '🐍' },
  { name: 'MongoDB', level: 70, category: 'Database', icon: '🗄️' },
  { name: 'CSS3', level: 95, category: 'Styling', icon: '🎨' },
  { name: 'Sass', level: 85, category: 'Styling', icon: '💅' },
  { name: 'Figma', level: 80, category: 'Design', icon: '🎯' },
  { name: 'Git', level: 90, category: 'Tools', icon: '📂' }
];

const categories = ['All', 'Frontend', 'Backend', 'Database', 'Styling', 'Design', 'Tools'];

const Skills: React.FC = () => {
  const { settings } = useTheme();
  const [filterCategory, setFilterCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [animatedSkills, setAnimatedSkills] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillName = (entry.target as HTMLElement).dataset.skill;
          if (skillName) {
            setAnimatedSkills(prev => new Set([...prev, skillName]));
          }
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-card').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const filteredSkills = skills.filter(skill => 
    filterCategory === 'All' || skill.category === filterCategory
  );

  return (
    <section id="skills" className="skills">
      <h2 className="section-title">Technical Skills</h2>
      <h3 className="skills-subtitle">Mastering these technologies to build exceptional products</h3>
      <div className="skills-filter">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${filterCategory === cat ? 'active' : ''}`}
            onClick={() => setFilterCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="skills-grid">
        {filteredSkills.map((skill) => (
          <div
            key={skill.name}
            className="skill-card interactive-box"
            data-skill={skill.name}
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <div className="skill-icon">{skill.icon}</div>
            <h4>{skill.name}</h4>
            <p className="skill-category">{skill.category}</p>
            <div className="skill-bar">
              <div
                className="skill-progress"
                style={{
                  width: animatedSkills.has(skill.name) ? `${skill.level}%` : '0%',
                  background: `linear-gradient(90deg, ${settings.primaryColor}, ${settings.secondaryColor})`
                }}
              ></div>
            </div>
            <span className="skill-level">{skill.level}%</span>
            {hoveredSkill === skill.name && (
              <div className="skill-tooltip">
                Proficiency: {skill.level}% - Expert level in {skill.name} with {skill.level > 90 ? 'advanced' : 'strong'} practical experience.
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="skills-description">
        <p>Continuously learning and adapting to new technologies. Focused on clean code, performance optimization, and creating scalable solutions that drive real impact.</p>
      </div>
    </section>
  );
};

export default Skills;
