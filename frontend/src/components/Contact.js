import React from 'react';
import portfolio from '../data/portfolio.generated';
import './Contact.css';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = e.target.subject.value;
    const body = e.target.message.value;

    window.location.href = `mailto:${portfolio.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="contact-section">
      <h2>Contact</h2>
      <p>Feel free to reach out via email or connect with me on other platforms.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="contact-subject">Subject</label>
        <input id="contact-subject" type="text" name="subject" placeholder="Subject" autoComplete="off" required />
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" placeholder="Message" rows="5" required></textarea>
        <button type="submit">Send</button>
      </form>

      <nav className="social-links" aria-label="Social links">
        <a href={portfolio.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={portfolio.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={portfolio.contact.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
      </nav>
    </section>
  );
};

export default Contact;
