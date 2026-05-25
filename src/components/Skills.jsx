const skillCategories = [
  {
    icon: 'fas fa-chart-line',
    title: 'SEO & Analytics',
    skills: ['SEMrush', 'Ahrefs', 'Google Analytics', 'Google Search Console', 'Ubersuggest', 'SEOquake', 'Yoast SEO']
  },
  {
    icon: 'fas fa-ad',
    title: 'Paid Marketing',
    skills: ['Meta Ads Manager', 'Google Ads', 'PPC Campaigns', 'Performance Marketing']
  },
  {
    icon: 'fas fa-share-alt',
    title: 'Social Media',
    skills: ['Instagram Growth', 'YouTube Marketing', 'SMO', 'Trend Analysis', 'Content Calendars']
  },
  {
    icon: 'fas fa-paint-brush',
    title: 'Content & Design',
    skills: ['Canva', 'Premiere Pro', 'CapCut', 'AI Video Gen', 'WordPress', 'Visual Storytelling']
  },
  {
    icon: 'fas fa-robot',
    title: 'AI & Automation',
    skills: ['ChatGPT', 'Leonardo AI', 'Perplexity AI', 'Prompt Engineering', 'Generative AI Strategy']
  },
  {
    icon: 'fas fa-code',
    title: 'Development',
    skills: ['HTML / CSS', 'Mobile Development', 'CMS Platforms', 'Android Apps']
  }
];

const Skills = () => {
  return (
    <section className="skills-section" id="skills">
      <div className="section-container">
        <span className="section-badge" data-aos="fade-up">My Expertise</span>
        <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">Technical Skills</h2>
        
        <div className="skills-grid">
          {skillCategories.map((cat, idx) => (
            <div className="skill-category-card" key={idx} data-aos="fade-up" data-aos-delay={100 + idx * 100}>
              <div className="category-header">
                <div className="category-icon"><i className={cat.icon}></i></div>
                <h3 className="category-title">{cat.title}</h3>
              </div>
              <div className="skill-badges">
                {cat.skills.map((skill, sIdx) => (
                  <span className="skill-badge-item" key={sIdx}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
