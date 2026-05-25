import { useState, useEffect } from 'react';

const Hero = () => {
  const roles = ["Digital Marketer", "SEO Specialist", "AI Content Creator", "Video Editor"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
      }, 100);
    }

    if (!isDeleting && displayText === currentRole) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero-container">
        <div className="hero-content" data-aos="fade-right" data-aos-duration="1000">
          <h1 className="hero-title">Hi, I'm Amritpal Singh 👋</h1>
          <h2 className="hero-subtitle">
            I am a <span className="typing-text">{displayText}</span><span className="cursor">&nbsp;</span>
          </h2>
          <h3 className="hero-descriptor">Digital Marketing Specialist | AI Content Strategist | SEO Expert</h3>
          <p className="hero-tagline">
            I help brands grow online through data-driven marketing, AI-powered content, and strategic SEO.
          </p>
          
          <div className="hero-ctas">
            <a href="#projects" className="btn btn-primary" onClick={(e) => handleScrollTo(e, 'projects')}>
              View My Work <i className="fas fa-arrow-right button-icon"></i>
            </a>
            <a href="/assets/Amritpal_Singh_CV.pdf" className="btn btn-outline" download="Amritpal_Singh_CV.pdf">
              Download CV <i className="fas fa-download button-icon"></i>
            </a>
          </div>
          
          <div className="social-links-row">
            <a href="https://linkedin.com/in/amritpal-singh" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://youtube.com/@TechWealthCoach" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        
        <div className="hero-image-wrapper" data-aos="fade-left" data-aos-duration="1000">
          <div className="profile-frame">
            <img src="/assets/profile.png" alt="Amritpal Singh Profile Headshot" className="profile-image" />
            <div className="badge-float badge-seo">
              <i className="fas fa-search-dollar"></i>
              <span>SEO Expert</span>
            </div>
            <div className="badge-float badge-ai">
              <i className="fas fa-robot"></i>
              <span>AI Content</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
