import React from "react";
import Footer from "../pages/footer.jsx";
import Workforce from "../../img/workforce.jpg";
import Workforcee from "../../styles/workforcee.css";
import Placeholder from "../../img/placeholder.jpeg";

function Team() {
  return (
    <>
      <div className="border-team"></div>
      <h1 className="team-title">OnlyPaws Workforce</h1>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col">
          <div class="card">
            <img src={Placeholder} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Anthony Calvo</h5>
              <p class="card-text">Backend & frontend</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img src={Placeholder} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Stephanie Solórzano</h5>
              <p class="card-text">Project leader & front-end</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img src={Placeholder} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Marcelo Sica</h5>
              <p class="card-text">Backend</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img src={Workforce} alt="pet-sitters-landscape" className="team-img" />
      </div>
      <div className="container-footer">
        <Footer />
      </div>
    </>
  );
}

export default Team;
