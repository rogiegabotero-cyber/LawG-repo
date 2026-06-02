import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import "./contact.css";
import { Loader2 } from "lucide-react"; // <-- Spinner icon

const Contacts = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false); // <-- Track loading state

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
    <div className="contacts_main">
      <h1>We’re here for you</h1>

      <div className="details">
        <form ref={form} onSubmit={handleSubmit} className="l_div">
          <div className="input_l">
            <input type="text" name="name" placeholder="Name" required />
            <input type="tel" name="phone" placeholder="Phone No." />
          </div>

          <div className="input_l">
            <input type="text" name="subject" placeholder="Subject" />
            <input type="email" name="email" placeholder="Email" required />
          </div>

          <div className="input_R">
            <input
              type="text"
              name="heardFrom"
              placeholder="Where have you heard about us?"
            />
            <textarea name="message" placeholder="Message"></textarea>

            {/* Submit button with spinner */}
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
                "Submit"
              )}
            </button>
          </div>
        </form>

        <div className="R_div">
          <div className="icons1">
            <i className="bi bi-telephone-fill"></i>
            <p>(631) 815-2575</p>
          </div>

          <div className="icons1">
            <i className="bi bi-envelope-fill"></i>
            <p>david@davidgrossmanandassociates.com</p>
          </div>

          <div className="icons1">
            <i className="bi bi-geo-alt-fill"></i>
            <p>881 OCEAN DRIVE, UNIT 14H, KEY BISCAYNE, FLORIDA 33149</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
