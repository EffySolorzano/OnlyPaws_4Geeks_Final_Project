import React from "react";
import Footer from "../pages/footer.jsx";
import Workforce from "../../img/workforce.jpg";
import Workforcee from "../../styles/workforcee.css";
import Placeholder from "../../img/placeholder.jpeg";
import Anthonycalvo_OP from "../../img/Anthonycalvo_OP.jpg";
import Marcelosica_OP from "../../img/Marcelosica_OP.jpg";
import Stephanie_OP from "../../img/Stephanie_OP.jpg";
import Githublogito from "../../img/githublogito.png"

function Team() {
  return (
    <>
      <div className="border-team"></div>
      <h1 className="team-title">OnlyPaws Workforce</h1>
      <div className="workforce-container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card bg-transparent border-0">
              <img src={Anthonycalvo_OP} className="card-img-top workforce" alt="Anthony" />
              <div class="card-body">
                <h5 class="card-title text-center mt-4">Anthony Calvo</h5>
                <p className="card-text text-center"><i>Main focus: Frontend</i></p>
                <p className="card-text text-center"><i>Backup: Backend</i></p>
              </div>
              <a href="https://github.com/Anthonycalvo1984" target="_blank">
                <img src={Githublogito} alt="" className="btn btn-transparent" style={{
                  height: "70px",
                  width: "80px",
                  marginTop: "-20px",
                  marginLeft: "120px"
                }} />
              </a>
            </div>
          </div>
          <div className="col">
            <div className="card bg-transparent border-0">
              <img src={Stephanie_OP} className="card-img-top workforce" alt="Steph" />
              <div className="card-body ">
                <h5 className="card-title text-center mt-4">Stephanie Solórzano</h5>
                <p className="card-text text-center "><i>Project leader & Full Stack</i></p>
              </div>
            </div>
            <a href="https://github.com/EffySolorzano" target="_blank">
              <img src={Githublogito} alt="" className="btn btn-transparent" style={{
                height: "70px",
                width: "80px",
                marginTop: "130px",
                marginLeft: "200px"
              }} />
            </a>
          </div>
          <div className="col">
            <div className="card bg-transparent border-0">
              <img src={Marcelosica_OP} class="card-img-top workforce" alt="Marcelo" />
              <div className="card-body">
                <h5 className="card-title text-center mt-4">Marcelo Sica</h5>
                <p className="card-text text-center"><i>Main focus: Backend</i></p>
                <p className="card-text text-center"><i>Backup: Frontend</i></p>
              </div>
            </div>
            <a href="https://github.com/Marce-Sica" target="_blank">
              <img src={Githublogito} alt="" className="btn btn-transparent" style={{
                height: "70px",
                width: "80px",
                marginTop: "170px",
                marginLeft: "200px"
              }} />
            </a>
          </div>
        </div>
        <div>
          <img src={Workforce} alt="pet-sitters-landscape" className="team-img" />
        </div>
      </div>
      <div className="container-footer">
        <Footer />
      </div>
    </>
  );
}

export default Team;
