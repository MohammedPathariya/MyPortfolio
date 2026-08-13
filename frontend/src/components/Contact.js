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
      <div className="contact-heading">
        <h2>Contact</h2>
        <p>Send a note and your email app will open with the subject and message ready to review.</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="contact-subject">Subject</label>
        <input id="contact-subject" type="text" name="subject" placeholder="Subject" autoComplete="off" required />
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" placeholder="Message" rows="5" required></textarea>
        <button type="submit">Open email draft <span aria-hidden="true">&rarr;</span></button>
      </form>
    </section>
  );
};

export default Contact;
