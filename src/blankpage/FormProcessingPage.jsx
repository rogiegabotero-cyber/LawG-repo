// FormProcessingPage.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import "./form_processing.css"; // optional, for styling

const FormProcessingPage = () => {
  // Use location state to get the email from the previous page
  const location = useLocation();
  const contactEmail = location.state?.contactEmail || "your email";

  return (
    <div className="form-processing-page">
      <div className="processing-container">
        <h2>The form has been processed.</h2>
        <p>
          The retainer will be emailed to <strong>{contactEmail}</strong> with the instructions on how to sign and submit the signed retainer.
        </p>
      </div>
    </div>
  );
};

export default FormProcessingPage;
