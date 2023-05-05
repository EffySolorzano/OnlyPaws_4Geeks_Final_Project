import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../pages/footer.jsx";
import Petsit from "../../img/petsit.jpg";
import Housesit from "../../img/Housesit.jpg";
import Petgrooming from "../../img/petgrooming.jpg";
import Dogwalkerservs from "../../img/dogwalkerservs.jpg";
import Vetcard from "../../img/vetcard.jpg";
import Playdate from "../../img/playdate.jpg";
import Transport from "../../img/transport.jpg";
import Petshop from "../../img/petshop.jpg";
import Servicess from "../../styles/servicess.css";

function Srvcs() {
  const [displayCurrentServices, setDisplayCurrentServices] = useState(true);
  const [displayFutureServices, setDisplayFutureServices] = useState(false);

  const handleCurrentClick = () => {
    setDisplayCurrentServices(true);
    setDisplayFutureServices(false);
  };

  const handleFutureClick = () => {
    setDisplayCurrentServices(false);
    setDisplayFutureServices(true);
  };

  return (
    <>
      <div className="srvcs"></div>
      <h1 className="srvcs-title">What we offer</h1>
      <div className="srvc-buttons">
        <button
          onClick={handleCurrentClick}
          className="btn btn-transparent srvc-buttons"
        >
          <h6>Services</h6>
        </button>
        <button
          onClick={handleFutureClick}
          className="btn btn-transparent srvc-buttons"
        >
          <h6>Coming soon</h6>
        </button>
      </div>

      {displayCurrentServices && (
        <div className="row row-cols-1 row-cols-md-2 g-3">
          <div className="col">
            <div className="card h-100">
              <img src={Petsit} className="card-img-top" alt="petsitting" />
              <div className="card-body">
                <h5 className="card-title-srvcs">Pet Sitter</h5>
                <p className="card-text">
                  We offer professional and reliable pet sitting services for
                  busy pet owners who need a trustworthy caretaker for their
                  furry family members. Our experienced pet sitters provide
                  personalized care and attention to your pets in the comfort of
                  your own home or in our pet-friendly facilities. We understand
                  that pets have unique needs and personalities, which is why we
                  offer customized care plans to meet their individual
                  requirements. You can rest easy knowing that your pets are in
                  good hands while you're away.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <img src={Housesit} className="card-img-top" alt="housesit" />
              <div className="card-body">
                <h5 className="card-title-srvcs">House Sit</h5>
                <p className="card-text">
                  Our house sitting service for pets provides your furry family
                  members with the care and attention they need while you're
                  away. We'll make sure your pets are fed, watered, and given
                  plenty of love and affection, all in the comfort of their own
                  home. You can relax and enjoy your time away, knowing that
                  your pets are in good hands.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <img
                src={Petgrooming}
                className="card-img-top"
                alt="pet-grooming"
              />
              <div className="card-body">
                <h5 className="card-title-srvcs">Grooming Services</h5>
                <p className="card-text">
                  In addition to our pet sitting and house sitting services, we
                  also offer a pet grooming referral service. We know how
                  important it is to keep your pet looking and feeling their
                  best, so we've done the research for you and will provide
                  recommendations for the nearest and highest-rated pet groomers
                  in your area. Just let us know your location and we'll take
                  care of the rest!
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <img
                src={Dogwalkerservs}
                className="card-img-top"
                alt="dog-walker"
              />
              <div className="card-body">
                <h5 className="card-title-srvcs">Dog Walkers</h5>
                <p className="card-text">
                  Need someone to walk your dogs? Our reliable dog walking
                  services will keep your pup happy and healthy with regular
                  exercise and fresh air. Contact us to schedule a walk today!"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {displayFutureServices && (
        <div className="row row-cols-1 row-cols-md-2 g-3">
          <div className="col">
            <div className="card h-100">
              <img src={Vetcard} className="card-img-top" alt="Vet-card" />
              <div className="card-body">
                <h5 className="card-title-srvcs">Find vets in your area</h5>
                <p className="card-text">
                  Coming Soon! Our future services will include finding the best
                  vets in your area. With our extensive network and resources,
                  we can help you find the right care for your furry friends.
                  Stay tuned for more details!"
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <img src={Playdate} className="card-img-top" alt="Play-date" />
              <div className="card-body">
                <h5 className="card-title-srvcs">Playdates</h5>
                <p className="card-text">
                  As a future feature, we will organize pet playdates to help
                  dogs socialize and develop essential skills, such as
                  obedience, agility, and behavior training. These playdates
                  will be an accessible option for pet owners to learn from
                  seasoned owners and build a supportive community. Join us for
                  a fun and rewarding experience that will benefit both you and
                  your best friend!
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <img src={Transport} className="card-img-top" alt="transport" />
              <div className="card-body">
                <h5 className="card-title-srvcs">Pet Taxi</h5>
                <p className="card-text">
                  Need help getting your pets to the vet or groomer? Our pet
                  taxi service is here to assist! We'll safely transport your
                  pet to and from their appointments, so you can rest easy
                  knowing they're in good hands."
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <img src={Petshop} className="card-img-top" alt="petshop" />
              <div className="card-body">
                <h5 className="card-title-srvcs">Petshops near you</h5>
                <p className="card-text">
                  Looking for the best pet shops in your area? Our service will
                  help you find the closest and highest-rated stores that offer
                  a wide range of products for your pets. From premium pet food
                  and toys to grooming supplies and accessories, we've got you
                  covered. Stay tuned for this future feature!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="how-start-2nd">
        <h2>Let's get started</h2>
      </div>
      <div className="how-2st-join">
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
      <div className="container-footer">
        <Footer />
      </div>
    </>
  );
}
export default Srvcs;
