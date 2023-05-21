import React from "react";
import Footer from "./footer.jsx";
import Pusheencoder from "../../styles/pusheencoder.css";
import Pusheennew from "../../img/pusheennew.gif"


const Pusheen = () => {
    return (
        <><div className="borde"></div>
            <div className="container-gif">
                <h1 className="build">Under construction</h1>
                <h6 className="h3">Psst! We need a bit more time</h6>
                <div>
                    <img src={Pusheennew}
                        alt="pusheen" className="img-fluid pusheen" />
                </div>
                <div className="container-footer">
                    <Footer />
                </div>
            </div></>
    )
};

export default Pusheen;