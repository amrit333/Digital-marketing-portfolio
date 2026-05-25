const tools = [
  { name: 'SEMrush', icon: 'fas fa-search-plus' },
  { name: 'Google Analytics', icon: 'fas fa-chart-bar' },
  { name: 'Meta Ads', icon: 'fab fa-facebook' },
  { name: 'Canva', icon: 'fas fa-palette' },
  { name: 'Premiere Pro', icon: 'fas fa-video' },
  { name: 'CapCut', icon: 'fas fa-film' },
  { name: 'ChatGPT', icon: 'fas fa-brain' },
  { name: 'WordPress', icon: 'fab fa-wordpress' },
  { name: 'Google Ads', icon: 'fab fa-google' },
  { name: 'Ahrefs', icon: 'fas fa-link' },
  { name: 'Leonardo AI', icon: 'fas fa-magic' },
  { name: 'Perplexity AI', icon: 'fas fa-compass' }
];

const Tools = () => {
  return (
    <section className="tools-section">
      <div className="section-container">
        <span className="section-badge" data-aos="fade-up">My Toolkit</span>
        <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">Tools I Use</h2>
        
        <div className="tools-grid" data-aos="fade-up" data-aos-delay="200">
          {tools.map((tool, idx) => (
            <div className="tool-tile" key={idx} title={tool.name}>
              <div className="tool-icon-wrapper"><i className={tool.icon}></i></div>
              <span className="tool-name">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
