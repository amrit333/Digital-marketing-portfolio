import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky shadow class
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check current section for active tab highlighting
      const scrollPosition = window.scrollY + 120; // Offset for navbar
      
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
    setActiveSection(targetId);
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offset = 80; // Navbar height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = targetElement.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="nav-logo" onClick={(e) => handleLinkClick(e, 'home')}>
          Amritpal <span>Singh</span>
        </a>
        
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li className="nav-item" key={item.id}>
              <a
                href={item.href}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="nav-item cta-mobile">
            <a
              href="#contact"
              className="btn btn-primary btn-sm"
              onClick={(e) => handleLinkClick(e, 'contact')}
            >
              Hire Me
            </a>
          </li>
        </ul>
        
        <div className="nav-right">
          <a
            href="#contact"
            className="btn btn-primary btn-sm nav-cta"
            onClick={(e) => handleLinkClick(e, 'contact')}
          >
            Hire Me
          </a>
          <button
            className={`hamburger ${isOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
