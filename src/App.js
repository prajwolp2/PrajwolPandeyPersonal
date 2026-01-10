import React, { useState, useEffect } from 'react';
import './App.css';
import financeProject from './images/financeProject.png';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [expandedProject, setExpandedProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="App">
      <div 
        className="cursor-glow" 
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">Prajwol Pandey</div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#projects">Work</a>
            <a href="#contact" className="nav-cta">Get In Touch</a>
          </div>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Full Stack Developer <span className="gradient">&</span> Data Engineer</h1>
            <p>I craft beautiful, scalable digital solutions that solve real-world problems. Specialized in modern web technologies and data systems.</p>
            <div className="hero-cta">
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">View Resume</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card card-1">React</div>
            <div className="floating-card card-2">Python</div>
            <div className="floating-card card-3">SQL</div>
            <div className="floating-card card-4">JavaScript</div>
            <div className="floating-card card-5">Data Eng</div>
            <div className="floating-card card-6">Git</div>
            <div className="floating-card card-7">CSS</div>
            <div className="floating-card card-8">System Design</div>
            <div className="floating-card card-9">VS Code</div>
          </div>
        </div>
      </section>

      <section id="about-me" className="about-me">
        <div className="about-container">
          <div className="about-content">
            <div className="about-image">
              <img src="/images/profile.jpg" alt="Prajwol Pandey" />
            </div>
            <div className="about-text">
              <h2>About Me</h2>
              <p>I build software using JavaScript, React, and Node.js. I enjoy the process of taking a project from a blank text editor to a fully deployed application. Whether it's crafting an interface or writing server-side logic, I focus on performance and usability. Currently, I'm working on expanding my skills in backend architecture and building more efficient tools for the web.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="experience">
        <div className="section-header">
          <h2>Experience & Education</h2>
          <p>Building expertise across different domains</p>
        </div>
        
        <div className="experience-grid">
          <div className="exp-card">
            <div className="exp-number">01</div>
            <h3>Stony Brook University</h3>
            <p className="exp-role">Honors College | Computer Science</p>
            <p>Pursuing comprehensive knowledge in algorithms, systems design, and software engineering principles.</p>
          </div>

          <div className="exp-card featured">
            <div className="exp-number">02</div>
            <h3>JP Morgan</h3>
            <p className="exp-role">Data Engineering Internship</p>
            <p>Developed scalable data pipelines and solutions using Python & SQL. Optimized complex data workflows.</p>
          </div>

          <div className="exp-card">
            <div className="exp-number">03</div>
            <h3>SBU DoIT</h3>
            <p className="exp-role">Department of Information Technology</p>
            <p>Supporting Stony Brook University's IT operations and contributing to technical infrastructure projects.</p>
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="section-header">
          <h2>What I Offer</h2>
          <p>Comprehensive solutions tailored to your needs</p>
        </div>
        
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">💻</div>
            <h3>Web Development</h3>
            <p>Modern, responsive web applications built with React, JavaScript, and cutting-edge frameworks.</p>
            <ul className="service-tech">
              <li>React</li>
              <li>JavaScript</li>
              <li>Responsive Design</li>
            </ul>
          </div>

          <div className="service-card">
            <div className="service-icon">📊</div>
            <h3>Data Engineering</h3>
            <p>Scalable data pipelines and solutions for handling complex data challenges and analytics.</p>
            <ul className="service-tech">
              <li>Python</li>
              <li>SQL</li>
              <li>Data Processing</li>
            </ul>
          </div>

          <div className="service-card">
            <div className="service-icon">⚙️</div>
            <h3>System Optimization</h3>
            <p>Optimizing performance, scalability, and efficiency in technical systems and applications.</p>
            <ul className="service-tech">
              <li>Performance Tuning</li>
              <li>Architecture Design</li>
              <li>Best Practices</li>
            </ul>
          </div>

          <div className="service-card">
            <div className="service-icon">🔧</div>
            <h3>Technical Consulting</h3>
            <p>Strategic guidance on technology selection, system design, and development methodologies.</p>
            <ul className="service-tech">
              <li>Architecture</li>
              <li>Tech Stack Selection</li>
              <li>Code Review</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="skills">
        <div className="section-header">
          <h2>Technical Skills</h2>
        </div>
        
        <div className="skills-grid">
          <div className="skill-category">
            <h4>Languages</h4>
            <div className="skill-tags">
              <span className="skill-tag">Python</span>
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">SQL</span>
            </div>
          </div>

          <div className="skill-category">
            <h4>Frontend</h4>
            <div className="skill-tags">
              <span className="skill-tag">React</span>
              <span className="skill-tag">CSS/HTML</span>
              <span className="skill-tag">Responsive Design</span>
            </div>
          </div>

          <div className="skill-category">
            <h4>Data & Backend</h4>
            <div className="skill-tags">
              <span className="skill-tag">Data Pipelines</span>
              <span className="skill-tag">SQL Databases</span>
              <span className="skill-tag">System Design</span>
            </div>
          </div>

          <div className="skill-category">
            <h4>Tools & Platforms</h4>
            <div className="skill-tags">
              <span className="skill-tag">Git</span>
              <span className="skill-tag">VS Code</span>
              <span className="skill-tag">Linux</span>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="projects">
        <div className="section-header">
          <h2>Recent Projects</h2>
          <p>Showcasing my best work</p>
        </div>
        
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-number">01</div>
            <h3>Finance Analytics Dashboard</h3>
            <p>A comprehensive financial analysis tool with real-time data visualization and insights.</p>
            <div className="project-tags">
              <span>React</span>
              <span>Data Visualization</span>
              <span>Finance</span>
            </div>
            <a href="#" onClick={(e) => { e.preventDefault(); setExpandedProject(expandedProject === 'finance' ? null : 'finance'); }} className="project-link">Explore →</a>
            {expandedProject === 'finance' && (
              <div className="project-image-popup">
                <img src={financeProject} alt="Finance Analytics Dashboard" />
              </div>
            )}
          </div>

          <div className="project-card">
            <div className="project-number">02</div>
            <h3>Coming Soon</h3>
            <p>Working on something exciting. Stay tuned for more innovative projects.</p>
            <div className="project-tags">
              <span>Innovation</span>
              <span>Tech Stack</span>
              <span>2026</span>
            </div>
            <a href="#" className="project-link disabled">Coming Soon</a>
          </div>
        </div>
      </section>

      <section id="contact" className="cta-section">
        <div className="cta-content">
          <h2>Ready to work together?</h2>
          <p>Let's create something amazing. Reach out and let's discuss your next project.</p>
          <button className="btn btn-primary btn-lg">Get In Touch</button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Prajwol Pandey</h4>
            <p>Full Stack Developer & Data Engineer</p>
          </div>
          
          <div className="footer-section">
            <h4>Links</h4>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <a href="https://github.com/prajwolp2" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/prajwol-pandey-841175289/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:prajwolpandey0730@gmail.com">Email</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Prajwol Pandey. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
