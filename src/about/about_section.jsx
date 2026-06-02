import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./about_section.css";
import { House, ChevronsRight, Eye, Target } from "lucide-react";

const AboutSection = () => {
  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Set the browser tab title
    document.title = "About – David Grossman & Associates";

    // Optional: Reset to default when leaving the page
    return () => {
      document.title = "David Grossman & Associates";
    };
  }, []);

  return (
    <div className="about_section">
      <div className="orange">
        <h2>About Us</h2>
        <div className="back_link">
          <Link to="/" className="back-home">
            <House strokeWidth={1} size={20} /> Home
          </Link>
          <ChevronsRight className="back-home" size={20} />
          About us
        </div>
      </div>

      <div className="aboout_content">
        <h1>Why Choose David Grossman & Associates?</h1>
        <p>
          Mr. Grossman has been an attorney for three decades and is a successful
          businessperson and advocate for all sorts of victims. Much of his
          career focused on risk mitigation and compliance. His firm, which was
          established in New York nearly 30 years ago, originally specialized in
          victims rights, advocating for individuals neglected in institutions.
          <br />
          <br />
          About a decade ago, they expanded into mass torts and formed
          partnerships with some of the largest firms in the nation and advocates
          for victims of corporate greed who caused all sorts of harms to the
          environment, unions and...
        </p>

        <div className="vm_div">
          <div>
            <h1>
              <Eye className="back-home1" size={35} /> Vision
            </h1>
            <p>
              We will help you clearly understand your legal rights to faithfully
              defend you and your loved ones. When you need experienced legal
              representation, we will work to recover the damages you are entitled
              to.
            </p>
          </div>

          <div>
            <h1>
              <Target className="back-home1" size={35} /> Mission
            </h1>
            <p>
              David Grossman & Associates, LLP is dedicated to successfully
              representing, defending and protecting our clients' legal rights.
            </p>
          </div>
        </div>
      </div>

      <p>
        Welcome to David Grossman & Associates. We are dedicated to providing
        exceptional legal services to our clients.
      </p>
    </div>
  );
};

export default AboutSection;
