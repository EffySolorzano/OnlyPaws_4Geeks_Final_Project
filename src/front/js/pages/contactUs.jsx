import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import OnlyPaws from "../../img/onlypaws.png";
import Footer from "./footer.jsx";
import Contact from "../../styles/contact.css";
import Contactform from "../../img/contactform.jpg";
import { userActions } from "../store/usuario.js"

const ContactUs = () => {
    const actions = userActions((actions) => actions.userActions);
    const navigate = useNavigate();
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSendEmail = async (e) => {
        e.preventDefault();

        if (!fullname || !email || !phone || !subject || !message) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all fields.',
            });
            return;
        }

        try {
            const response = await actions.sendEmail(
                fullname,
                email,
                phone,
                subject,
                message
            );

            console.log(response);

            Swal.fire({
                icon: 'success',
                title: 'Email sent successfully',
            }).then(() => {
                navigate('/'); // Redirect to the landing page after success msg
            });
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    };

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
                                        onChange={(e) => {
                                            setFullname(e.target.value);
                                        }}
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
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
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
                                        onChange={(e) => {
                                            setPhone(e.target.value);
                                        }}
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
                                        onChange={(e) => {
                                            setSubject(e.target.value);
                                        }}
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
                                        onChange={(e) => {
                                            setMessage(e.target.value);
                                        }}
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
                                <button type="submit" className="btn add-sitter text-white"
                                    onClick={handleSendEmail}>
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
            <div>
                <img src={Contactform} alt="contactbottom" className="contactbottom img-fluid" />
            </div>
            <div className="container-footer">
                <Footer />
            </div>
        </>
    );
};

export default ContactUs;
