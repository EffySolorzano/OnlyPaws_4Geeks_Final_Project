import React from "react";
import Instagram from "../../img/instagram.png";
import Fb from "../../img/fb.webp";
import Twitter from "../../img/Twitter.png";
import { Link } from "react-router-dom";
import Footer_style from "../../styles/footer_style.css";

function footer() {
  return (
    <div className="container-footer">
      <div className="footer-about" id="border">
        <Link to="/about">
          <button
            className="btn btn-transparent"
            id="about-footer"
            style={{ backgroundColor: "transparent", color: "#a659c8" }}
          >
            About us
          </button>
        </Link>
        <Link to="/how-it-works">
          <button
            className="btn btn-transparent"
            id="how-footer"
            style={{ backgroundColor: "transparent", color: "#a659c8" }}
          >
            How it works
          </button>
        </Link>
        <Link to="/services">
          <button
            className="btn btn-transparent"
            id="services-footer"
            style={{ backgroundColor: "transparent", color: "#a659c8" }}
          >
            Services
          </button>
        </Link>
        <Link to="/terms-of-use">
          <button
            className="btn btn-transparent"
            id="terms-footer"
            style={{ backgroundColor: "transparent", color: "#a659c8" }}
          >
            Terms of Use
          </button>
        </Link>
        <Link to="/privacy-policy">
          <button
            className="btn btn-transparent"
            id="privacy-footer"
            style={{ backgroundColor: "transparent", color: "#a659c8" }}
          >
            Privacy Policy
          </button>
        </Link>
        <Link to="/team">
          <button
            className="btn btn-transparent"
            id="team-footer"
            style={{ backgroundColor: "transparent", color: "#a659c8" }}
          >
            Our Team
          </button>
        </Link>
        <Link to="/contact">
          <button
            className="btn btn-transparent"
            id="contact-footer"
            style={{ backgroundColor: "transparent", color: "#a659c8" }}
          >
            Contact Us
          </button>
        </Link>
      </div>
      <div className="social">
        <a href="https://www.instagram.com/" target="_blank">
          <img src={Instagram} alt="instagram" className="instagram" />
        </a>
        <a href="https://www.facebook.com/" target="_blank">
          <img src={Fb} alt="facebook" className="facebook" />
        </a>
        <a href="https://twitter.com/" target="_blank">
          <img src={Twitter} alt="twitter" className="twitter" />
        </a>
      </div>
    </div>
  );
}
export default footer;
