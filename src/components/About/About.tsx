
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './About.css';

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: string;
  category: 'education' | 'experience' | 'achievement' | 'skill' | 'personal';
  details?: string;
  image?: string;
}

const milestones: Milestone[] = [
  {
    year: '2018',
    title: 'Started Coding Journey',
    description: 'Began learning web development with HTML, CSS, and JavaScript through online courses and personal projects.',
    icon: '💻',
    category: 'personal',
    details: 'Built my first static website at age 16, sparking a lifelong passion for creating digital experiences.'
  },
  {
    year: '2020',
    title: 'Computer Science Degree',
    description: 'Graduated with honors in Computer Science from University of Technology, specializing in full-stack development.',
    icon: '🎓',
    category: 'education',
    details: 'Thesis on "Responsive Web Applications Using Modern Frameworks" – explored React ecosystem and performance optimization.',
    image: 'https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Graduation'
  },
  {
    year: '2021',
    title: 'First Professional Role',
    description: 'Joined TechCorp as a Junior Frontend Developer, working on e-commerce platforms and UI components.',
    icon: '💼',
    category: 'experience',
    details: 'Collaborated with a team of 10 to launch 5 major features, improving user engagement by 40%. Learned agile methodologies and code reviews.'
  },
  {
    year: '2022',
    title: 'Hackathon Winner',
    description: 'Won the Global Hackathon 2023 for an AI-powered task management app built in 48 hours.',
    icon: '🏆',
    category: 'achievement',
    details: 'Team of 4; integrated NLP for natural language input. Judged on innovation, usability, and technical execution. Gained 500+ GitHub stars.',
    image: 'https://via.placeholder.com/300x200/FFE66D/000000?text=Hackathon'
  },
  {
    year: '2023',
    title: 'Senior Developer Promotion',
    description: 'Promoted to Senior Full-Stack Developer at Innovate Inc., leading projects with 20+ team members.',
    icon: '🚀',
    category: 'experience',
    details: 'Mentored juniors, architected scalable APIs using Node.js and microservices. Delivered a dashboard that reduced data processing time by 60%.'
  },
  {
    year: '2024',
    title: 'Open-Source Contributor',
    description: 'Contributed to major React and Node.js repositories, with 50+ pull requests merged.',
    icon: '🌟',
    category: 'achievement',
    details: 'Key contributions: Performance hooks for React and security enhancements for Express.js. Built community through conferences and workshops.'
  }
];

const values = [
  { icon: '🎯', title: 'Innovation', description: 'Always pushing boundaries with cutting-edge technologies to create unique solutions.' },
  { icon: '🤝', title: 'Collaboration', description: 'Thriving in team environments, valuing diverse perspectives to achieve collective success.' },
  { icon: '⚡', title: 'Efficiency', description: 'Focused on clean, scalable code that optimizes performance without compromising quality.' },
  { icon: '🌱', title: 'Growth', description: 'Lifelong learner, continuously upskilling in emerging trends like AI and Web3.' }
];

const hobbies = [
  { icon: '📸', title: 'Photography', description: 'Capturing moments and experimenting with digital art to inspire creative coding projects.' },
  { icon: '🥾', title: 'Hiking', description: 'Exploring nature trails to clear the mind and find inspiration in the world around us.' },
  { icon: '📚', title: 'Sci-Fi Reading', description: 'Diving into futuristic stories that fuel innovative ideas for tech solutions.' },
  { icon: '🎮', title: 'Gaming', description: 'Analyzing game mechanics to understand user engagement and interactive design principles.' }
];

const About: React.FC = () => {
  const { settings } = useTheme();
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [hoveredHobby, setHoveredHobby] = useState<number | null>(null);
  const [currentTab, setCurrentTab] = useState<'journey' | 'values' | 'hobbies'>('journey');
  const [animatedMilestones, setAnimatedMilestones] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setAnimatedMilestones(prev => new Set([...prev, index]));
          }, index * 200);
        }
      });
    }, { threshold: 0.3 });

    const milestoneElements = document.querySelectorAll('.milestone-item');
    milestoneElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const Stats = () => (
    <div className="stats-circle">
      <div className="stat-item">
        <div className="stat-number">3+</div>
        <div className="stat-label">Years Experience</div>
        <div className="stat-ring">
          <div className="ring-fill" style={{ '--progress': '80' } as React.CSSProperties}></div>
        </div>
      </div>
      <div className="stat-item">
        <div className="stat-number">25+</div>
        <div className="stat-label">Projects Delivered</div>
        <div className="stat-ring">
          <div className="ring-fill" style={{ '--progress': '90' } as React.CSSProperties}></div>
        </div>
      </div>
      <div className="stat-item">
        <div className="stat-number">10+</div>
        <div className="stat-label">Technologies Mastered</div>
        <div className="stat-ring">
          <div className="ring-fill" style={{ '--progress': '100' } as React.CSSProperties}></div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="about" className="about">
      <div className="about-hero">
        <h2 className="section-title animated-text">About Me</h2>
        <p className="intro-text">
          I'm a passionate full-stack developer with a creative edge, dedicated to crafting exceptional digital experiences. 
          From innovative web apps to seamless user interfaces, I blend technical expertise with artistic vision to solve real-world problems.
        </p>
        <Stats />
      </div>

      <div className="about-tabs">
        <button
          className={`tab-btn ${currentTab === 'journey' ? 'active' : ''}`}
          onClick={() => setCurrentTab('journey')}
        >
          My Journey
        </button>
        <button
          className={`tab-btn ${currentTab === 'values' ? 'active' : ''}`}
          onClick={() => setCurrentTab('values')}
        >
          Core Values
        </button>
        <button
          className={`tab-btn ${currentTab === 'hobbies' ? 'active' : ''}`}
          onClick={() => setCurrentTab('hobbies')}
        >
          Personal Life
        </button>
      </div>

      <div className="about-content">
        {currentTab === 'journey' && (
          <div className="journey-timeline">
            <div className="timeline-line"></div>
            {milestones.map((milestone, idx) => (
              <div
                key={idx}
                className={`milestone-item ${animatedMilestones.has(idx) ? 'animated' : ''} ${activeMilestone === idx ? 'active' : ''}`}
                onClick={() => setActiveMilestone(idx)}
              >
                <div className="milestone-marker">
                  <span className="marker-icon">{milestone.icon}</span>
                  <span className="marker-year">{milestone.year}</span>
                </div>
                <div className="milestone-content">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                  {activeMilestone === idx && milestone.details && (
                    <div className="milestone-details">
                      {milestone.details}
                      {milestone.image && <img src={milestone.image} alt={milestone.title} className="milestone-image" />}
                    </div>
                  )}
                </div>
                <div className={`milestone-category ${milestone.category}`} />
              </div>
            ))}
          </div>
        )}

        {currentTab === 'values' && (
          <div className="values-grid">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="value-card interactive-box"
                onMouseEnter={() => setHoveredValue(idx)}
                onMouseLeave={() => setHoveredValue(null)}
              >
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
                {hoveredValue === idx && <div className="value-glow"></div>}
              </div>
            ))}
          </div>
        )}

        {currentTab === 'hobbies' && (
          <div className="hobbies-grid">
            {hobbies.map((hobby, idx) => (
              <div
                key={idx}
                className="hobby-card interactive-box"
                onMouseEnter={() => setHoveredHobby(idx)}
                onMouseLeave={() => setHoveredHobby(null)}
              >
                <div className="hobby-icon">{hobby.icon}</div>
                <h3>{hobby.title}</h3>
                <p>{hobby.description}</p>
                {hoveredHobby === idx && <div className="hobby-overlay">
                  <p>Passions that fuel my creativity and balance in life.</p>
                </div>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="about-footer">
        <p>Ready to bring your ideas to life? Let's connect and start collaborating on something extraordinary.</p>
        <button className="cta-btn" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
          Get In Touch
        </button>
      </div>
    </section>
  );
};

export default About;
