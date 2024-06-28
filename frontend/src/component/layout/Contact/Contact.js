import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div class="contactcontainer">
      <div className="centralised">
        <h1 className="h1forcontact">Contact Us</h1>
      </div>
      <div class="contact-section">
        <h2 className="h2forcontact">General Inquiries:</h2>
        <p className="pforcontact">
          Email:{" "}
          <a href="mailto:info@example.com" className="aforcontact">
            info@example.com
          </a>
        </p>
        <p className="pforcontact">
          Phone:{" "}
          <a href="tel:+1-XXX-XXX-XXXX" className="aforcontact">
            +1-XXX-XXX-XXXX
          </a>
        </p>
      </div>

      <div class="contact-section">
        <h2 className="h2forcontact">Customer Support:</h2>
        <p className="pforcontact">
          Email:{" "}
          <a href="mailto:support@example.com" className="aforcontact">
            support@example.com
          </a>
        </p>
        <p className="pforcontact">
          Phone:{" "}
          <a href="tel:+1-XXX-XXX-XXXX" className="aforcontact">
            +1-XXX-XXX-XXXX
          </a>
        </p>
      </div>

      <div class="contact-section">
        <h2 className="h2forcontact">Business Inquiries:</h2>
        <p className="pforcontact">
          Email:{" "}
          <a href="mailto:sales@example.com" className="aforcontact">
            sales@example.com
          </a>
        </p>
        <p className="pforcontact">
          Phone:{" "}
          <a href="tel:+1-XXX-XXX-XXXX" className="aforcontact">
            +1-XXX-XXX-XXXX
          </a>
        </p>
      </div>

      <div class="contact-section">
        <h2 className="h2forcontact">Address:</h2>
        <p className="pforcontact">123 Main Street,</p>
        <p className="pforcontact">Cityville, State, Zip Code</p>
        <p className="pforcontact">Country</p>
      </div>

      <div class="contact-section social-media">
        <h2 className="h2forcontact">Social Media:</h2>
        <p className="pforcontact">
          Connect with us on
          <a href="https://www.facebook.com">Facebook</a>,
          <a href="https://www.twitter.com">Twitter</a>, and
          <a href="https://www.linkedin.com">LinkedIn</a> for updates and news.
        </p>
      </div>

      <div class="contact-section">
        <h2 className="h2forcontact">Feedback:</h2>
        <p className="pforcontact">
          Your feedback helps us improve. Please email us at{" "}
          <a href="mailto:feedback@example.com" className="aforcontact">
            feedback@example.com
          </a>{" "}
          with any comments or suggestions.
        </p>
      </div>

      <div class="footer">
        <p className="pforcontact">
          We strive to respond to all inquiries within 24-48 hours. Thank you
          for choosing [Your Company Name]!
        </p>
      </div>
    </div>
  );
};

export default Contact;
