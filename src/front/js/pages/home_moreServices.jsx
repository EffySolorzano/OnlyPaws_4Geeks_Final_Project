import React from "react";
import Beautysalon from "../../img/beautysalon.png";
import Housesit from "../../img/housesit.png";
import Veterinaria from "../../img/veterinarian.png";
import Petshop from "../../img/petshop.png";
import Dogwalk from "../../img/dogwalk.png";
import Pettaxi from "../../img/pettaxi.png";
import { Link } from "react-router-dom";

function moreServices() {
  return (
    <div className="services-container">
      <button className="btn btn-bg-transparent">
        <img
          src={Beautysalon}
          alt="beauty-salon"
          className="icon beauty-salon"
        />
      </button>
      <button className="btn btn-bg-transparent">
        <img src={Housesit} alt="beauty-salon" className="icon housesit" />
      </button>
      <button className="btn btn-bg-transparent">
        <img src={Veterinaria} alt="beauty-salon" className=" icon vet" />
      </button>
      <button className="btn btn-bg-transparent">
        <img src={Petshop} alt="beauty-salon" className="icon petshop" />
      </button>
      <button className="btn btn-bg-transparent">
        <img src={Dogwalk} alt="beauty-salon" className="icon dogwalk" />
      </button>
      <button className="btn btn-bg-transparent">
        <img src={Pettaxi} alt="beauty-salon" className=" icon pettaxi" />
      </button>
    </div>
  );
}

export default moreServices;
