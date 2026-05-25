const projects = [
  {
    icon: 'fab fa-youtube',
    bannerClass: 'project-youtube',
    badge: 'Featured Creation',
    badgeClass: '',
    title: 'Tech Wealth Coach',
    description: 'Independently managed and grew an AI-focused educational YouTube channel. Handled scripting, editing, SEO-optimized titles, thumbnail design, and audience engagement strategies.',
    tags: ['YouTube', 'SEO', 'Video Editing', 'AI Content'],
    link: 'https://youtube.com/@TechWealthCoach',
    linkText: 'Visit Channel',
    hasLink: true
  },
  {
    icon: 'fab fa-instagram',
    bannerClass: 'project-instagram',
    badge: 'Social Media Growth',
    badgeClass: '',
    title: 'Solitaire Infosys SMM',
    description: 'Managed full-cycle social media marketing for a tech company — reel creation, branded stories, branding campaigns, and Instagram growth strategies using AI tools.',
    tags: ['Instagram', 'Social Media', 'AI', 'Canva', 'Reels'],
    link: 'https://www.instagram.com/solitaireinfosys/',
    linkText: 'View Page',
    hasLink: true
  },
  {
    icon: 'fas fa-search',
    bannerClass: 'project-seo',
    badge: 'Strategy Case Study',
    badgeClass: 'badge-neutral',
    title: 'Daydream Epoxy Campaign',
    description: 'Executed a comprehensive off-page SEO strategy including high-authority backlink building, directory submissions, and competitor analysis — improving domain authority and search rankings.',
    tags: ['SEO', 'Off-Page', 'Link Building', 'Google Search Console'],
    link: null,
    linkText: 'Case Study Only',
    hasLink: false
  }
];

const Projects = () => {
  return (
    <section className="projects-section" id="projects">
      <div className="section-container">
        <span className="section-badge" data-aos="fade-up">Portfolio Showcase</span>
        <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">Featured Projects</h2>
        
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div className="project-card" key={idx} data-aos="fade-up" data-aos-delay={100 + idx * 100}>
              <div className={`project-banner ${project.bannerClass}`}>
                <i className={`${project.icon} banner-project-icon`}></i>
              </div>
              <div className="project-details">
                <span className={`project-highlight-badge ${project.badgeClass}`}>{project.badge}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, tIdx) => (
                    <span className="project-tag" key={tIdx}>{tag}</span>
                  ))}
                </div>
                {project.hasLink ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    {project.linkText} <i className="fas fa-external-link-alt"></i>
                  </a>
                ) : (
                  <span className="project-link link-disabled">
                    {project.linkText} <i className="fas fa-lock"></i>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
