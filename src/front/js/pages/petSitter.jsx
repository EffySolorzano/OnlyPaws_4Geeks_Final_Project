import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import BodyPetSitter from "../component/bodyPetSitter.jsx";
import "../../styles/sitter.css";
import OnlyPaws from "../../img/onlypaws.png"

const PetSitter = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="container w-75">
        <div className="d-flex justify-content-start mt-3 mb-3">
          {/* <Link to="/add-petsitter">
            <button type="button" className="btn btn-success mt-3">
              Add Pet Sitter
            </button>
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default PetSitter;
