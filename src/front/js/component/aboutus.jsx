import React, { useEffect, useState } from "react";
import About from "../../img/about.jpg";
import { Link } from "react-router-dom";
import Footer from "../pages/footer.jsx";
import Aboutus from "../../styles/aboutus.css";

function about() {
  const [animationHeight, setAnimationHeight] = useState(0);

  useEffect(() => {
    function handleResize() {
      setAnimationHeight(window.innerHeight - 3);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="aboutus"></div>
      <div className="container-about">
        <div className="card-about mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img src={About} className="about-new" alt="dogo" />
            </div>
            <div className="col-md-8">
              <div className="card-body-about">
                <h5 className="card-title-about">Who we are</h5>
                <p className="card-text-about bg-white">
                  We're OnlyPaws, a small school project turned pet-care
                  business dedicated to providing the best possible care for
                  your furry friends. Our goal is to create a community of pet
                  lovers help each other by offering unlimited pet and home care
                  in exchange for a free place to stay. Pet parents can travel
                  with confidence knowing they've secured the very best care for
                  their best friend. While sitters get to stay in unique homes
                  around the world and enjoy the company of pets. It's a win-win
                  for everyone… especially for the pets!
                </p>
                <p className="card-text-about bg-white">
                  At OnlyPaws, we believe that pets are more than just animals -
                  they're family. That's why we treat each pet under our care
                  with the same love, care, and attention that we would give to
                  our own pets. We understand that leaving your furry friend
                  with someone else can be stressful, which is why we go above
                  and beyond to ensure your peace of mind. Our team of
                  experienced sitters are passionate about providing top-notch
                  care for your pets and creating long-lasting relationships
                  with our clients. We are committed to building a community of
                  trust and safety, where pets and their owners can feel secure
                  and happy.
                </p>
                <p className="card-text-about bg-white">
                  So, whether you're going on vacation or just need a little
                  help taking care of your pets, OnlyPaws has got you covered!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about-start">
        <h2>Ready to start?</h2>
      </div>
      <div className="about-signup">
        <Link to="/signup">
          <button
            className="btn btn-transparent"
            style={{
              backgroundColor: "#a659c8",
              color: "#ffffff",
              borderRadius: "15px",
              fontFamily: "Noto Serif Hebrew, serif",
              marginLeft: "45.5rem",
              fontSize: "20px",
            }}
          >
            Sign up
          </button>
        </Link>
      </div>
      <div className="container-footer">
        <Footer />
      </div>
    </>
  );
}
export default about;
