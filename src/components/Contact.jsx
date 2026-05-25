import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    // EmailJS configuration — replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_PUBLIC_KEY
    emailjs.sendForm(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      formRef.current,
      'YOUR_PUBLIC_KEY'
    )
    .then(() => {
      setStatus('success');
      setIsSubmitting(false);
      formRef.current.reset();
    })
    .catch(() => {
      setStatus('error');
      setIsSubmitting(false);
    });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-container">
        <span className="section-badge" data-aos="fade-up">Get in Touch</span>
        <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">Let's Work Together</h2>
        <p className="section-subtitle" data-aos="fade-up" data-aos-delay="150">Have a project in mind or want to collaborate? I'd love to hear from you.</p>
        
        <div className="contact-grid">
          <div className="contact-info-col" data-aos="fade-right" data-aos-duration="1000">
            <div className="contact-card-item">
              <div className="contact-card-icon"><i className="fas fa-envelope"></i></div>
              <div className="contact-card-text">
                <h3>Email Me</h3>
                <a href="mailto:iamrit3333@gmail.com" className="contact-link-action">iamrit3333@gmail.com</a>
              </div>
            </div>
            
            <div className="contact-card-item">
              <div className="contact-card-icon"><i className="fas fa-phone-alt"></i></div>
              <div className="contact-card-text">
                <h3>Call / WhatsApp</h3>
                <a href="tel:+918544926441" className="contact-link-action">+91 85449-26441</a>
              </div>
            </div>
            
            <div className="contact-card-item">
              <div className="contact-card-icon"><i className="fas fa-map-marker-alt"></i></div>
              <div className="contact-card-text">
                <h3>Location</h3>
                <p>Patiala, Punjab, India</p>
              </div>
            </div>
            
            <div className="contact-card-item">
              <div className="contact-card-icon"><i className="fab fa-linkedin-in"></i></div>
              <div className="contact-card-text">
                <h3>LinkedIn</h3>
                <a href="https://linkedin.com/in/amritpal-singh" target="_blank" rel="noopener noreferrer" className="contact-link-action">linkedin.com/in/amritpal-singh</a>
              </div>
            </div>
          </div>
          
          <div className="contact-form-col" data-aos="fade-left" data-aos-duration="1000">
            <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" id="name" name="name" required placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input type="email" id="email" name="email" required placeholder="john@example.com" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" required placeholder="Project Proposal / Job Inquiry" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required placeholder="Tell me about your project..."></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary btn-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'} <i className="fas fa-paper-plane button-icon"></i>
              </button>
              
              {status === 'success' && (
                <div className="form-status-alert success">
                  ✅ Message sent! I'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="form-status-alert error">
                  ❌ Something went wrong. Please try again or email me directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
