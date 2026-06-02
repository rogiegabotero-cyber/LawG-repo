import React, { useEffect, useState, useRef } from "react";
import emailjs from "emailjs-com";
import "./contact_page.css";
import { Link } from "react-router-dom";
import { House, ChevronsRight, Loader2 } from "lucide-react"; // <-- Added Loader2 icon
import GameBoi from "../assets/gameboi.webp"

const ContactPage = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isSending, setIsSending] = useState(false); // <-- Track sending state
  const form = useRef();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    document.title = "Contact Us – David Grossman & Associates";

    return () => {
      document.title = "David Grossman & Associates";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true); // Start loading

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_USER_ID
      )
      .then(
        (result) => {
          alert("Message sent successfully!");
          console.log(result.text);
          form.current.reset();
          setIsSending(false); // Stop loading
        },
        (error) => {
          alert("Failed to send message. Please try again later.");
          console.error(error.text);
          setIsSending(false); // Stop loading on error
        }
      );
  };

  return (
    <div className="contact_page">
      <div className="orange">
        <h2>Contact Us</h2>
        <div className="back_link">
          <Link to="/" className="back-home">
            <House strokeWidth={1} size={20} /> Home
          </Link>
          <ChevronsRight className="back-home" size={20} />
          Contact Us
        </div>
      </div>

      <div className="info">
        <div className="contact_main2">
          <div className="details2">
            
            <form ref={form} onSubmit={handleSubmit} className="l_div2">
              <h2>Contact Us</h2>
              <input type="text" name="name" placeholder="Name" required />
              <input type="email" name="email" placeholder="Email" required />
              <input type="tel" name="phone" placeholder="Phone No." />
              <input type="text" name="subject" placeholder="Subject" />
              <textarea name="message" placeholder="Message"></textarea>

              <div className="input_R2">
                <h2>Where have you heard about us?</h2>
                <div className="heard_options">
                  <label>
                    <input type="radio" name="heardFrom" value="Social Media" />
                    Social Media
                  </label>
                  <label>
                    <input type="radio" name="heardFrom" value="Radio" />
                    Radio
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="heardFrom"
                      value="Google Search/Engine"
                    />
                    Google Search/Engine
                  </label>
                  <label>
                    <input type="radio" name="heardFrom" value="Other" />
                    Other
                  </label>
                </div>

                <button type="submit" disabled={isSending}>
                  {isSending ? (
                    <>
                      <Loader2
                        className="animate-spin"
                        size={18}
                        style={{ marginRight: "8px" }}
                      />
                      Sending...
                    </>
                  ) : (
                    "Send"
                  )}
                </button>
              </div>
            </form>

            <div className="R_div2">
              <h2>David Grossman & Associates</h2>

              <div className="icons12">
                <i className="bi bi-geo-alt-fill"></i>
                <p>881 OCEAN DRIVE, UNIT 14H, KEY BISCAYNE, FLORIDA 33149</p>
              </div>

              <div className="icons12">
                <i className="bi bi-telephone-fill"></i>
                <p>(631) 815-2575</p>
              </div>

              <div className="icons12">
                <i className="bi bi-printer-fill"></i>
                <p>Fax: 516.686.6771</p>
              </div>

              <div
                className="map_container"
                style={{ position: "relative", width: "100%", height: "300px" }}
              >
                {!mapLoaded && (
                  <div className="map_loader">
                    <div className="spinner" style={{ marginBottom: "8px" }}></div>
                    <p>Loading map...</p>
                  </div>
                )}

                <iframe
                  title="David Grossman & Associates Location"
                  src="https://www.google.com/maps?q=881+OCEAN+DRIVE,+UNIT+14H,+KEY+BISCAYNE,+FLORIDA+33149&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: "5px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => setMapLoaded(true)}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="creds"></div>
    </div>
  );
};

export default ContactPage;
