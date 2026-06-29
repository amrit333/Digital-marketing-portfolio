export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#fff' }}>
              <div className="logo-icon">A</div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, letterSpacing: '0.05em' }}>AMRIT</span>
            </a>
            <p>Digital Marketing Executive specialising in automation, organic growth, and AI content strategy.</p>
          </div>
          
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Connect</h4>
            <ul className="footer-links">
              <li><a href="https://wa.me/918544926441" target="_blank" rel="noreferrer">WhatsApp</a></li>
              <li><a href="mailto:jot60103@gmail.com">Email Me</a></li>
              <li><a href="https://drive.google.com/file/d/10BDaCvF14NrWOMfHKzajatG_sb1K9WyR/view?usp=sharing" target="_blank" rel="noreferrer">Resume</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">&copy; {new Date().getFullYear()} Amrit. All rights reserved.</div>
          <div className="footer-socials">
            <a href="mailto:jot60103@gmail.com" className="social-link"><i className="fa-solid fa-envelope" /></a>
            <a href="https://wa.me/918544926441" target="_blank" rel="noreferrer" className="social-link" style={{ color: '#25D366' }}><i className="fa-brands fa-whatsapp" /></a>
            <a href="https://www.instagram.com/stitcherybypreet/" target="_blank" rel="noreferrer" className="social-link"><i className="fa-brands fa-instagram" /></a>
            <a href="https://www.youtube.com/@techwealthcoach" target="_blank" rel="noreferrer" className="social-link"><i className="fa-brands fa-youtube" /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
