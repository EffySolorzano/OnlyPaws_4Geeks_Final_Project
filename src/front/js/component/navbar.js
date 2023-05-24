import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import OnlyPaws from "../../img/onlypaws.png";
import { Modal } from "react-bootstrap";
import PetParent from "../../img/petParent.jpg";
import Sitter2 from "../../img/Sitter2.jpg";
import { Context } from "../store/appContext";
import { userActions } from "../store/usuario.js";

export const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const { store, actions } = useContext(Context); // Wrap Navbar component with Context component
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await actions.logout();
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    setIsLoggedIn(store.isLoggedIn);
    setLoading(false);
  }, [store.isLoggedIn]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleOptionClick = () => {
    setShowModal(false);
  };

  let navbarItems;
  if (store.isLoggedIn === true) {
    navbarItems = (
      <>
        <div className="dropdown user-icons">
          <div>
            <button className="btn btn-transparent">
              <i className="fa-solid fa-envelope env"></i>
            </button>
          </div>
          <div>
            <button className="btn btn-transparent">
              <i className="fa-solid fa-bell"></i>
            </button>
          </div>
          <div>
            <button
              className="btn btn-transparent dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-solid fa-user pers"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/settings">
                  Settings
                </Link>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  } else {
    navbarItems = (
      <>
        <div className="login">
          <Link to="/login">
            <button
              className="btn btn-transparent"
              id="login"
              style={{
                backgroundColor: "transparent",
                color: "#a659c8",
              }}
            >
              Login
            </button>
          </Link>
        </div>
        <div className="signup">
          <button
            className="btn btn-transparent"
            id="signup"
            style={{
              backgroundColor: "#a659c8",
              color: "#ffffff",
              borderRadius: "15px",
            }}
            onClick={handleModalOpen} // Update the onClick event to open the modal
          >
            Sign up
          </button>
        </div>
        <Modal show={showModal} onHide={handleModalClose}>
          {" "}
          {/* Render the Modal component with show and onHide props */}
          <Modal.Header closeButton>
            <Modal.Title>Choose your own adventure</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Modal content */}
            <Link to="/signup">
              <img
                src={PetParent}
                className="w-50"
                alt="modal-image"
                onClick={handleOptionClick}
              />
            </Link>
            <Link to="/add-petsitter">
              <img
                src={Sitter2}
                className="w-50"
                alt="modal-image"
                onClick={handleOptionClick}
              />
            </Link>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-white bg-white sticky-top">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link to="/">
            <img
              className="logo img-fluid"
              src={OnlyPaws}
              alt="onlyPaws_logo"
            />
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
        </div>
      </div>
      {navbarItems}
    </nav>
  );
};
