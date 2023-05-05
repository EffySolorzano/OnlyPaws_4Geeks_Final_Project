import React from "react";
import { Link } from "react-router-dom";
import OnlyPaws from "../../img/onlypaws.png";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-white bg-white sticky-top">
      <div className="container-fluid">
        <Link to="/">
          <img className="logo img-fluid" src={OnlyPaws} alt="OnlyPaws_logo" />
        </Link>
        <div className="ml-auto">
          <Link to="/about">
            <button
              className="btn btn-transparent"
              id="about"
              style={{
                backgroundColor: "transparent",
                color: "#a659c8",
              }}
            >
              About us
            </button>
          </Link>
          <Link to="/how-it-works">
            <button
              className="btn btn-transparent"
              id="how"
              style={{ backgroundColor: "transparent", color: "#a659c8" }}
            >
              How it works
            </button>
          </Link>
          <Link to="/services">
            <button
              className="btn btn-transparent"
              id="services"
              style={{ backgroundColor: "transparent", color: "#a659c8" }}
            >
              Services
            </button>
          </Link>
        </div>
        <div className="login">
          <Link to="/login">
            <button
              className="btn btn-transparent"
              id="login"
              style={{ backgroundColor: "transparent", color: "#a659c8" }}
            >
              Login
            </button>
          </Link>
        </div>
        <div className="signup">
          <Link to="/signup">
            <button
              className="btn btn-transparent"
              id="signup"
              style={{
                backgroundColor: "#a659c8",
                color: "#ffffff",
                borderRadius: "15px",
              }}
            >
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
