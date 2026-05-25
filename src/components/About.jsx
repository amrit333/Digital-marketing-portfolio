const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="section-container">
        <span className="section-badge" data-aos="fade-up">Who I Am</span>
        <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">About Me</h2>
        
        <div className="about-grid">
          <div className="about-graphic" data-aos="fade-right" data-aos-duration="1000">
            <div className="graphic-card">
              <img src="/assets/profile.png" alt="Amritpal Singh" className="about-avatar" />
            </div>
          </div>
          
          <div className="about-content" data-aos="fade-left" data-aos-duration="1000">
            <p className="about-bio-para">
              I'm a passionate Digital Marketing Specialist with 1.5+ years of hands-on experience at Solitaire Infosys Pvt. Ltd., Patiala. I specialize in growing brands online through smart SEO strategies, AI-powered content creation, social media management, and performance marketing.
            </p>
            <p className="about-bio-para">
              I hold a BCA degree from Punjab University (2021–2024) and have won multiple national-level hackathons and coding competitions. I combine technical knowledge with creative thinking to deliver real, measurable results.
            </p>
            <p className="about-bio-para">
              When I'm not building campaigns, I run the YouTube channel <strong>Tech Wealth Coach</strong>, creating AI-focused educational content for the next generation of digital professionals.
            </p>
            
            <div className="stats-grid">
              <div className="stat-card" data-aos="zoom-in" data-aos-delay="200">
                <div className="stat-icon"><i className="fas fa-calendar-alt"></i></div>
                <h3 className="stat-number">1.5+</h3>
                <p className="stat-label">Years Experience</p>
              </div>
              <div className="stat-card" data-aos="zoom-in" data-aos-delay="300">
                <div className="stat-icon"><i className="fas fa-project-diagram"></i></div>
                <h3 className="stat-number">3+</h3>
                <p className="stat-label">Real Projects</p>
              </div>
              <div className="stat-card" data-aos="zoom-in" data-aos-delay="400">
                <div className="stat-icon"><i className="fas fa-trophy"></i></div>
                <h3 className="stat-number">4+</h3>
                <p className="stat-label">Hackathon Awards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
