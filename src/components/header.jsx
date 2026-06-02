import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './header.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const location = useLocation();
  const form = useRef();

  const handleEmailClick = (e) => {
    e.preventDefault();
    setShowForm(true);
  };

  const handleClose = () => setShowForm(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const currentTime = new Date().toLocaleString();
    const formData = new FormData(form.current);
    formData.append("time", currentTime);
    const templateParams = Object.fromEntries(formData);

    emailjs
      .send(
        import.meta.env.VITE_SERVICE_ID2,
        import.meta.env.VITE_TEMPLATE_ID2,
        templateParams,
        import.meta.env.VITE_USER_ID2
      )
      .then(
        (result) => {
          console.log('✅ Email sent successfully:', result.text);
          alert('✅ Your message has been sent successfully!');
          form.current.reset();
          setShowForm(false);
        },
        (error) => {
          console.error('❌ Error sending email:', error.text);
          alert('❌ Failed to send message. Please try again later.');
        }
      )
      .finally(() => setIsSending(false));
  };

  return (
    <header className='whole_header'>
      {/* Top Contact Bar */}
      <div className='top_header'>
        <div className='contact-info'>
          <p>
            <i className="bi bi-telephone-fill"></i>
            <a href="tel:6318152575" className="contact-link">631.815.2575</a> | 
            <a href="tel:6314599241" className="contact-link">631.459.9241</a>
          </p>
          <p>
            <i className="bi bi-envelope-fill"></i>
            <a href="#" onClick={handleEmailClick} className="contact-link">
              david@davidgrossmanandassociates.com
            </a>
          </p>
        </div>

        <div className='social-icons'>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook"></i></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter"></i></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
        </div>
      </div>

      {/* Main Header */}
      <div className='main_header'>
        <div className='Logo'>
          <Link className='logo_link' to="/"><p>David Grossman & Associates</p></Link>
        </div>

        <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
          <i className="bi bi-list"></i>
        </div>

        <div className={`links ${menuOpen ? 'active' : ''}`}>
          <Link className={`link_btn ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
          <Link className={`link_btn ${location.pathname === '/about_section' ? 'active' : ''}`} to="/about_section">About Us</Link>
          <Link className={`link_btn ${location.pathname === '/practice_area' ? 'active' : ''}`} to="/practice_area">Practice Areas</Link>
          <Link className={`link_btn ${location.pathname === '/news_page' ? 'active' : ''}`} to="/news_page">News</Link>
          <Link className={`link_btn ${location.pathname === '/attorneys' ? 'active' : ''}`} to="/attorneys">Attorneys</Link>
          <Link className={`link_btn ${location.pathname === '/file_claim_page' ? 'active' : ''}`} to="/file_claim_page"> File a Claim</Link>
          <Link className={`link_btn ${location.pathname === '/contact_page' ? 'active' : ''}`} to="/contact_page">Contact Us</Link>
                     
          <Link to="/contact_page">
            <button id='free_consultationBtn'>Free consultation</button>
          </Link>
        </div>
      </div>

      {/* Popup Email Form */}
      {showForm && (
        <div className="popup-overlay" onClick={handleClose}>
          <div className="popup-form" onClick={(e) => e.stopPropagation()}>
            <h2>Send Us a Message</h2>
            <form ref={form} onSubmit={handleSubmit}>
              <label>Name:
                <input type="text" name="name" required placeholder="Your full name" />
              </label>
              <label>Email:
                <input type="email" name="email" required placeholder="Your email address" />
              </label>
              <label>Message:
                <textarea name="message" rows="4" required placeholder="Write your message here..."></textarea>
              </label>

              <input type="hidden" name="time" value="" />

              <div className="form-buttons">
                <button type="button" onClick={handleClose} className="cancel-btn">Cancel</button>
                <button type="submit" className="send-btn" disabled={isSending}>
                  {isSending ? (
                    <>
                      <div className="spinner"></div>
                      <span className="sending-text">Sending...</span>
                    </>
                  ) : (
                    "Send"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
