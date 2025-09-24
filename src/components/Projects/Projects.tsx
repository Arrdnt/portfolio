
import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './Projects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  link: string;
  tech: string[];
  features: string[];
  category: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern web app built with React and Node.js.',
    longDescription: 'Full-stack e-commerce solution with user authentication, payment integration, and admin dashboard. Features real-time inventory management, responsive design, and SEO optimization for all devices.',
    image: 'https://via.placeholder.com/400x250/FF6B6B/FFFFFF?text=E-Commerce',
    link: '#',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    features: ['User Auth', 'Payments', 'Admin Panel', 'Responsive', 'SEO'],
    category: 'Web App'
  },
  {
    id: 2,
    title: 'Social Media Dashboard',
    description: 'An analytics platform with stunning UI.',
    longDescription: 'Interactive dashboard for social media metrics, including advanced charts, dynamic filters, export options, and predictive analytics. Built with Vue and integrates multiple APIs for real-time data visualization.',
    image: 'https://via.placeholder.com/400x250/4ECDC4/FFFFFF?text=Dashboard',
    link: '#',
    tech: ['Vue', 'Chart.js', 'Express', 'APIs'],
    features: ['Real-time Charts', 'Filters', 'Export Data', 'Multi-API', 'Analytics'],
    category: 'Dashboard'
  },
  {
    id: 3,
    title: 'Mobile Fitness App',
    description: 'Mobile app design and development.',
    longDescription: 'Cross-platform fitness tracker with personalized workout plans, AI progress tracking, social sharing, and health metrics integration. Uses React Native for seamless iOS and Android experience with offline capabilities and push notifications.',
    image: 'https://via.placeholder.com/400x250/FFE66D/000000?text=Fitness+App',
    link: '#',
    tech: ['React Native', 'Firebase', 'Redux'],
    features: ['Workout Plans', 'Progress Tracking', 'Social Share', 'Offline Mode', 'AI Insights'],
    category: 'Mobile'
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'Personal portfolio with interactive elements.',
    longDescription: 'This very site! A dynamic portfolio built with React, featuring advanced theme customization, smooth animations, persistent storage, accessibility features, and performance optimizations for modern browsers.',
    image: 'https://via.placeholder.com/400x250/6C5CE7/FFFFFF?text=Portfolio',
    link: '#',
    tech: ['React', 'CSS3', 'TypeScript'],
    features: ['Theme Switcher', 'Animations', 'Responsive', 'Persistent Settings', 'Accessibility'],
    category: 'Portfolio'
  },
  {
    id: 5,
    title: 'AI Chatbot',
    description: 'Intelligent chatbot using machine learning.',
    longDescription: 'Conversational AI assistant for customer support, integrated with NLP and sentiment analysis. Handles queries in multiple languages with 95% accuracy and learns from interactions.',
    image: 'https://via.placeholder.com/400x250/A78BFA/FFFFFF?text=Chatbot',
    link: '#',
    tech: ['Python', 'TensorFlow', 'React'],
    features: ['NLP', 'Sentiment Analysis', 'Multi-language', 'Learning', 'Integration'],
    category: 'AI'
  },
  {
    id: 6,
    title: 'Task Management Tool',
    description: 'Collaborative project management app.',
    longDescription: 'Feature-rich task manager with team collaboration, Kanban boards, time tracking, and integrations with calendars and notifications. Built for scalability and team productivity.',
    image: 'https://via.placeholder.com/400x250/45B7D1/FFFFFF?text=Task+Manager',
    link: '#',
    tech: ['Next.js', 'PostgreSQL', 'Socket.io'],
    features: ['Kanban Boards', 'Time Tracking', 'Notifications', 'Integrations', 'Team Collab'],
    category: 'Productivity'
  }
];

const categories = ['All', 'Web App', 'Dashboard', 'Mobile', 'Portfolio', 'AI', 'Productivity'];

const Projects: React.FC = () => {
  const { settings } = useTheme();
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(project => 
    (filterCategory === 'All' || project.category === filterCategory) &&
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpand = (id: number) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  return (
    <section id="projects" className="projects">
      <h2 className="section-title">Featured Projects</h2>
      <div className="projects-controls">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="filter-buttons">
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
      </div>
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`project-wrapper ${expandedProject === project.id ? 'expanded' : ''}`}
          >
            <div
              className="project-card interactive-box"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => toggleExpand(project.id)}
            >
              <div className="project-image-container">
                <img src={project.image} alt={project.title} className="project-image" />
                {hoveredProject === project.id && (
                  <div className="image-overlay">
                    <span className="overlay-text">Click for Details</span>
                  </div>
                )}
                <div className="project-category">{project.category}</div>
              </div>
              <div className="project-header">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className={`project-details ${expandedProject === project.id ? 'visible' : ''}`}>
                <div className="long-desc">
                  <p>{project.longDescription}</p>
                </div>
                <div className="features-list">
                  <h4>Key Features:</h4>
                  <ul>
                    {project.features.map((feature, idx) => (
                      <li key={idx}>✅ {feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="tech-tags">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
                <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                  View Project →
                </a>
              </div>
              <div className="expand-indicator">
                {expandedProject === project.id ? '−' : '+'}
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredProjects.length === 0 && (
        <p className="no-projects">No projects found matching your search.</p>
      )}
    </section>
  );
};

export default Projects;
