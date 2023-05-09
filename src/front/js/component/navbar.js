import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import OnlyPaws from "../../img/onlypaws.png";
import { Modal } from "react-bootstrap";
import PetParent from "../../img/petParent.jpg";
import Sitter2 from "../../img/Sitter2.jpg";
import { Context } from "../store/appContext";
import { userActions } from "../store/usuario.js";

export const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const { store, actions } = useContext(Context); // Wrap Navbar component with Context component

  const handleLogout = async () => {
    await actions.logout();
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOpen = () => {
    setShowModal(true);
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
              <img src={PetParent} className="w-50" alt="modal-image" />
            </Link>
            <Link to="/add-petsitter">
              <img src={Sitter2} className="w-50" alt="modal-image" />
            </Link>
          </Modal.Body>
          <Modal.Footer>
            {/* Modal footer */}
            <button
              className="btn btn-transparent"
              style={{
                backgroundColor: "#a659c8",
                color: "#ffffff",
                borderRadius: "15px",
              }}
              onClick={handleModalClose}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return (
    <nav className="navbar navbar-white bg-white sticky-top">
      <div className="container-fluid">
        <Link to="/">
          <img className="logo img-fluid" src={OnlyPaws} alt="onlyPaws_logo" />
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
      {navbarItems}
    </nav>
  );
};
