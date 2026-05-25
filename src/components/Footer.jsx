const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <a href="#home" className="footer-logo">
            Amritpal <span>Singh</span>
          </a>
          <p className="footer-desc">
            Digital Marketing Specialist, AI Content Strategist, and SEO Executive helping businesses scale online.
          </p>
          <div className="footer-social-row">
            <a href="https://linkedin.com/in/amritpal-singh" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            <a href="https://youtube.com/@TechWealthCoach" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fab fa-github"></i></a>
          </div>
        </div>
        
        <div className="footer-links-col">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Amritpal Singh. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
