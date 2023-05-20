import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

function findSitter() {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handleFindSitterClick = () => {
    if (store.isLoggedIn) {
      // User is logged in
      // Navigate to the pet sitter page
      navigate("/providers");
    } else {
      // User is not logged in
      // Navigate to the login page
      navigate("/login");
    }
  };

  const handleFindHouseSitClick = () => {
    if (store.isLoggedIn) {
      // User is logged in
      // Navigate to the pet sitter page
      navigate("/users");
    } else {
      // User is not logged in
      // Navigate to the login page
      navigate("/login");
    }
  };

  return (
    <>
      <div className="title-next">
        <h1>What's next?</h1>
      </div>
      <div className="container-cards">
        <div className="card" style={{ width: "25rem" }}>
          <div className="card-body">
            <h5 className="card-title mt-3">Looking for a Pet Sitter?</h5>
            <p className="card-text">
              Planning a trip? Get in touch with our friendly and reliable pet
              sitters who will make sure your beloved are safe and happy in the
              comfort of their own home, no matter the season!
            </p>
            <button className="btn btn-transparent"
              onClick={handleFindSitterClick}
              style={{
                backgroundColor: "#a659c8",
                color: "#ffffff",
                borderRadius: "15px",
                fontFamily: "Noto Serif Hebrew serif",
              }}>
              Find a pet sitter
            </button>
          </div>
        </div>
        <div className="card" style={{ width: "25rem" }}>
          <div className="card-body">
            <h5 className="card-title mt-3">House Sitting Made Fun</h5>
            <p className="card-text">
              Come explore our latest house sits with adorable pets all around
              the world!
            </p>
            <button className="btn btn-transparent"
              onClick={handleFindHouseSitClick}
              style={{
                backgroundColor: "#a659c8",
                color: "#ffffff",
                borderRadius: "15px",
              }}>Find a house sit</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default findSitter;
