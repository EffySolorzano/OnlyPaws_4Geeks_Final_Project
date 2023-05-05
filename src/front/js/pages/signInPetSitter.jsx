import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import OnlyPaws from "../../img/onlypaws.png"

const SignInPetSitter = () => {
    const { store, actions } = useContext(Context);

    return (<>
        <div className="container p-4 mt-5 col-3 bg-light rounded-3 border border-secondary-emphasis">
            <center><img src={OnlyPaws} className="img d-flex justify-content-center" /></center>
            <div className="title-add d-flex justify-content-center">
                <h1>Log in</h1>
            </div>
            <form className="row g-3">
                <div className="col-md-12">
                    <label for="username" className="form-label">
                        Username:
                    </label>
                    <input
                        type="text"
                        className="form-control p-2"
                        id="username"
                        name="username"
                        placeholder="Insert your username"
                    />
                </div>
                <div className="col-md-12">
                    <label for="password" className="form-label">
                        Password:
                    </label>
                    <input
                        type="password"
                        pattern=".{6,}"
                        className="form-control p-2"
                        id="password"
                        name="password"
                        placeholder="Insert your password"
                    />
                </div>
                <div className="col-md-12 d-flex justify-content-center mt-4">
                    <button className="btn add-sitter text-white">
                        Log in
                    </button>
                    <Link to="/">
                        <button type="button" className="btn btn-secondary ms-3">
                            Go back
                        </button>
                    </Link>
                </div>
            </form >
        </div >
    </>);
};

export default SignInPetSitter;