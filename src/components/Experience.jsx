const Experience = () => {
  return (
    <section className="experience-section" id="experience">
      <div className="section-container">
        <span className="section-badge" data-aos="fade-up">Professional Journey</span>
        <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">Work Experience</h2>
        
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          <div className="timeline-item" data-aos="fade-up" data-aos-delay="200">
            <div className="timeline-marker"></div>
            <div className="timeline-date">Jan 2024 – Present</div>
            <div className="timeline-content">
              <h3 className="timeline-title">Digital Marketing Executive & Trainer</h3>
              <h4 className="timeline-company">Solitaire Infosys Pvt. Ltd., Patiala</h4>
              <ul className="timeline-points">
                <li>Grew company Instagram pages using trend-based content, reels, and engagement campaigns.</li>
                <li>Created high-quality promotional videos and creatives using Premiere Pro, CapCut, and Canva.</li>
                <li>Applied Generative AI and prompt engineering for content ideation, video generation, and copywriting.</li>
                <li>Planned and executed multi-platform digital marketing campaigns improving brand visibility.</li>
                <li>Conducted training sessions in SEO, social media strategy, and prompt engineering.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
