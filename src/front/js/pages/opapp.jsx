import React from "react";
import App from "../../img/app.png";
import Google from "../../img/google.png";
import Apple from "../../img/apple.png";
import Windows from "../../img/windows.png";
import { Link } from "react-router-dom";

function opApp() {
  return (
    <div>
      <div className="appImg">
        <img src={App} alt="appImg" className="appImg" />
      </div>
      <div>
        <a href="https://play.google.com/store/games" target="_blank">
          <img src={Google} alt="google" className="google" />
        </a>
      </div>
      <div>
        <a href="https://www.apple.com/app-store/" target="_blank">
          <img src={Apple} alt="apple" className="apple" />
        </a>
      </div>
      <div>
        <a href="https://play.google.com/store/games" target="_blank">
          <img src={Windows} alt="windows" className="windows" />
        </a>
      </div>
    </div>
  );
}

export default opApp;
