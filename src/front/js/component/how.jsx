import React, { useState } from "react";
import { Link } from "react-router-dom";
import Howcardimg from "../../img/howcardimg.jpg";
import Footer from "../pages/footer.jsx";
import Stepbystep from "../../img/stepbystep.jpg";
import Stephbysteph from "../../img/stephbysteph.jpg";
import Howitworks from "../../styles/howitworks.css";


function howWorks() {
  const [displaySitterInfo, setDisplaySitterInfo] = useState(true);
  const [displayParentInfo, setDisplayParentInfo] = useState(false);

  const handleSitterClick = () => {
    setDisplaySitterInfo(true);
    setDisplayParentInfo(false);
  };

  const handleParentClick = () => {
    setDisplaySitterInfo(false);
    setDisplayParentInfo(true);
  };

  return (
    <div className="container-how">
      <div>
        <div className="card-how"></div>
        <div className="card-body-how">
          <div className="how-buttons">
            <button
              onClick={handleParentClick}
              className="btn btn-transparent how-buttons"
            >
              <h6>for pet sitters</h6>
            </button>
            <button
              onClick={handleSitterClick}
              className="btn btn-transparent how-buttons"
            >
              <h6>for pet parents</h6>
            </button>
          </div>
          <h5 className="card-title-how">
            Connecting Pet Parents with reviewed and verified Pet Sitters
          </h5>
          <p className="card-text-how bg-white">
            OnlyPaws offers a reliable solution for pet owners seeking
            trustworthy sitters to care for their pets when they're away. With
            our annual pet parent plan, you can access a network of reviewed and
            verified sitters who have demonstrated kindness and attentiveness to
            pets. We understand the importance of finding a reliable caretaker
            for your pets, which is why we take great care in vetting our
            sitters. With our service, you can be assured that your pets are in
            safe hands and will be happy in the comfort of their own home. We
            invite you to watch our video to learn more about how we can assist
            you.
          </p>
        </div>
        <img src={Howcardimg} alt="how-it-works" className="howimg" />
      </div>
      <div className="bottom-how"></div>
      <br />

      {displaySitterInfo && (
        <div>
          <img src={Stepbystep} alt="stepbystep_img" className="step" />
        </div>
      )}

      {displayParentInfo && (
        <div>
          <img src={Stephbysteph} alt="stepbystep_img" className="step" />
        </div>
      )}
      <div className="container-footer">
        <Footer />
      </div>
    </div>
  );
}
export default howWorks;
