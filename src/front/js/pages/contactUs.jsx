import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import OnlyPaws from "../../img/onlypaws.png";
import Footer from "./footer.jsx";
import Contact from "../../styles/contact.css";

const ContactUs = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
            <div className="contact-container p-3 mt-5 d-flex flex-column justify-content-center bg-light rounded-3 border border-secondary-emphasis w-25">
                <center>
                    <img src={OnlyPaws} className="img mt-2 d-flex justify-content-center" />
                </center>
                <form className="form-horizontal" method="post" id="contact_form">
                    <fieldset>
                        <h1 className="title-add d-flex justify-content-center">Contact Us Today!</h1>

                        <div className="form-group">
                            <label className="col-md-12 control-label pt-2 pb-2">
                                Full Name:
                            </label>
                            <div className="col-md-12 inputGroupContainer">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="glyphicon glyphicon-user"></i>
                                    </span>
                                    <input
                                        name="full_name"
                                        placeholder="Full name"
                                        className="form-control p-2"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-12 control-label pt-2 pb-2">
                                Email:
                            </label>
                            <div className="col-md-12 inputGroupContainer">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="glyphicon glyphicon-envelope"></i>
                                    </span>
                                    <input
                                        name="email"
                                        placeholder="Email"
                                        className="form-control p-2"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-12 control-label pt-2 pb-2">
                                Phone:
                            </label>
                            <div className="col-md-12 inputGroupContainer">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="glyphicon glyphicon-earphone"></i>
                                    </span>
                                    <input
                                        name="phone"
                                        placeholder="Phone number"
                                        className="form-control p-2"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-12 control-label pt-2 pb-2">
                                Subject:
                            </label>
                            <div className="col-md-12 inputGroupContainer">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="glyphicon glyphicon-home"></i>
                                    </span>
                                    <input
                                        name="subject"
                                        placeholder="Subject"
                                        className="form-control p-2"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-12 control-label pt-2 pb-2">
                                Message:
                            </label>
                            <div className="col-md-12 inputGroupContainer">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="glyphicon glyphicon-pencil"></i>
                                    </span>
                                    <textarea
                                        className="form-control p-2"
                                        name="message"
                                        placeholder="Message"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* <div
              className="alert alert-success"
              role="alert"
              id="success_message"
            >
              Success <i className="glyphicon glyphicon-thumbs-up"></i> Thanks
              for contacting us, we will get back to you shortly.
            </div> */}

                        <div className="form-group">
                            <label className="col-md-12 control-label"></label>
                            <div className="col-md-12 d-flex justify-content-center mb-2">
                                <button type="submit" className="btn add-sitter text-white">
                                    Send <span className="glyphicon glyphicon-send"></span>
                                </button>
                                <Link to="/">
                                    <button type="button" className="btn btn-secondary ms-3">
                                        Go back
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div className="container-footer">
                <Footer />
            </div>
        </>
    );
};

export default ContactUs;
