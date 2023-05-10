import React from "react";
import { Link } from "react-router-dom";

function findSitter() {
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
            <a>
              Find a pet sitter
            </a>
          </div>
        </div>
        <div className="card" style={{ width: "25rem" }}>
          <div className="card-body">
            <h5 className="card-title mt-3">House Sitting Made Fun</h5>
            <p className="card-text">
              Come explore our latest house sits with adorable pets all around
              the world!
            </p>
            <Link to="/users">Find a house sit</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default findSitter;
