const achievements = [
  { prize: '1st Prize', event: 'Hackathon at UIET', medalClass: 'gold' },
  { prize: '1st Prize', event: 'Hackathon at Chitkara University', medalClass: 'gold' },
  { prize: '1st Prize', event: 'C++ Programming at Chandigarh University', medalClass: 'gold' },
  { prize: '2nd Prize', event: 'Web Design at Punjabi University', medalClass: 'silver' }
];

const Education = () => {
  return (
    <section className="education-section" id="education">
      <div className="section-container">
        <span className="section-badge" data-aos="fade-up">Academic & Competitive Background</span>
        <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">Education & Achievements</h2>
        
        <div className="education-grid">
          <div className="education-col" data-aos="fade-right" data-aos-duration="1000">
            <h3 className="subsection-title"><i className="fas fa-graduation-cap icon-left"></i> Education</h3>
            <div className="education-card">
              <span className="edu-duration">Aug 2021 – Aug 2024</span>
              <h4 className="edu-degree">Bachelor of Computer Applications (BCA)</h4>
              <p className="edu-university">Punjab University, Patiala</p>
              <p className="edu-details">
                Built a strong foundation in computer applications, programming structures, databases, and web design. Successfully merged technical coding skills with digital marketing methodologies to build data-driven online campaigns.
              </p>
            </div>
          </div>
          
          <div className="achievements-col" data-aos="fade-left" data-aos-duration="1000">
            <h3 className="subsection-title"><i className="fas fa-trophy icon-left"></i> Competitions & Awards</h3>
            <div className="achievements-grid">
              {achievements.map((a, idx) => (
                <div className="achievement-card" key={idx}>
                  <div className="achievement-icon"><i className={`fas fa-medal ${a.medalClass}`}></i></div>
                  <div className="achievement-info">
                    <h4 className="achievement-name">{a.prize}</h4>
                    <p className="achievement-details">{a.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
