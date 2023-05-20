import React from "react";
import APP from "../../img/App.jpg";
import Google from "../../img/google.png";
import Apple from "../../img/apple.png";
import Windows from "../../img/windows.png";
import { Link } from "react-router-dom";

function opApp() {
  return (
    <div className="oapp container-fluid">
      <div className="row">
        <div className="col-md-6 col-lg-4">
          <div className="appImg">
            <img src={APP} alt="appImg" className="appImg img-fluid" />
          </div>
        </div>
        <div className="col-md-6 col-lg-2">
          <a href="https://play.google.com/store/games" target="_blank">
            <img src={Google} alt="google" className="google img-fluid" />
          </a>
        </div>
        <div className="col-md-6 col-lg-2">
          <a href="https://www.apple.com/app-store/" target="_blank">
            <img src={Apple} alt="apple" className="apple img-fluid" />
          </a>
        </div>
        <div className="col-md-6 col-lg-2">
          <a href="https://apps.microsoft.com/store/apps" target="_blank">
            <img src={Windows} alt="windows" className="windows img-fluid" />
          </a>
        </div>
      </div>
    </div>

  );
}

export default opApp;
