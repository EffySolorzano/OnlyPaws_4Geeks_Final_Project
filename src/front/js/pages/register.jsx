import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Onlypaws from "../../img/Onlypaws.png";
import Swal from "sweetalert2";
import Registerr from "../../styles/registerr.css";
import { Link } from "react-router-dom";

const Register = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        console.log(email);
    }, [email]);
    useEffect(() => {
        console.log(password);
    }, [password]);
    const handleRegister = async (e) => {
        e.preventDefault(); // prevent form from submitting
        const response = await actions.register(
            name,
            surname,
            username,
            email,
            password,
            isActive
        ); // call register action
        console.log(response);
        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Registration successful!",
            }).then(() => {
                navigate("/login"); // redirect to login component
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Registration failed. Please try again later.",
            });
        }
    };
    console.log(actions);
    return (
        <>
            <div className="container bg-light border border-secondary-emphasis d-flex justify-content-center w-25 mt-3">
                <div className="container-fluid">
                    <div className="register-form">
                        <h1 className="fs-1 fw-bold mt-5">
                            <center><img src={Onlypaws} alt="onlypaws.png" className="second onlypaws" /></center>
                        </h1>
                    </div>
                    <div className="form">
                        <form>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Enter your name"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                            <label for="floatingInput">Surname:</label>
                            <label for="floatingInput">Username</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                id="floatingInput"
                                placeholder="Enter your surname"
                                onChange={(e) => {
                                    setSurname(e.target.value);
                                }}
                            />
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Enter your username"
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Enter your email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="Enter your password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <p className="">Already have account? <Link to="/sign-in">
                                Sign In
                            </Link></p>

                            <center><div className=" bot register-button-container">
                                <button
                                    type="button"
                                    className="btn btn-outline-warning"
                                    onClick={handleRegister}
                                >
                                    Register
                                </button>
                            </div></center>
                        </form>
                    </div>
                </div>

            </div >

        </>
    );
};
export default Register;