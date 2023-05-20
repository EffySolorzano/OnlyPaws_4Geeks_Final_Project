import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Onlypaws from "../../img/onlypaws.png";
import Swal from "sweetalert2";
import Registerr from "../../styles/registerr.css";
import { Link } from "react-router-dom";
import Footer from "./footer.jsx";
import { GoogleLogin } from "react-google-login";

const clientId = "331353560025-vremdlrldn6kgqj9d6csujq1j3abqoq5.apps.googleusercontent.com";

const Register = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(true);
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
            country,
            username,
            email,
            password,
            isAuthenticated
        ); // call register action
        console.log(response);
        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Registration successful!",
            }).then(() => {
                // Retrieve the user ID from the response
                const userId = response.id;

                // Store the user ID in local storage or state
                localStorage.setItem("userId", userId);

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

    const onSuccess = (res) => {
        console.log("Register success! Current user: ", res.profileObj);
    }

    const onFailure = (res) => {
        console.log("Register failed! res: ", res)
    }

    const handleGoogleRegister = () => {
        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: clientId
            }).then((auth2) => {
                // Use the initialized auth2 instance for further operations
                auth2.signIn().then((googleUser) => {
                    navigate("/login");
                }).catch((error) => {
                    // Handle any errors during Google login
                });
            });
        });
    };

    return (
        <>
            <div className="container bg-light border border-secondary-emphasis d-flex justify-content-center w-25 mt-3">
                <div className="container-fluid">
                    <div className="register-form">
                        <h1 className="fs-1 fw-bold mt-5">
                            <center><img src={Onlypaws} alt="onlypaws.png" className="second onlypaws" /></center>
                        </h1>
                    </div>
                    <div className="form mb-5">
                        <form>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Enter your name"
                                autoComplete="current-name"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                            <label for="floatingInput">Surname:</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                id="floatingInput"
                                placeholder="Enter your surname"
                                autoComplete="current-surname"
                                onChange={(e) => {
                                    setSurname(e.target.value);
                                }}
                            />
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Enter your username"
                                autoComplete="current-username"
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Enter your email"
                                autoComplete="current-email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <label htmlFor="country">Country:</label>
                            <select id="country" name="country" className="form-select p-2" autoComplete="current-country" onChange={(e) => {
                                setCountry(e.target.value);
                            }}>
                                <option>Select your country</option>
                                <option>Argentina</option>
                                <option>Costa Rica</option>
                                <option>Panama</option>
                                <option>United States</option>
                                <option>Uruguay</option>
                                <option>Venezuela</option>
                            </select>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <p className="">Already have account? <Link to="/login">
                                Sign In
                            </Link></p>

                            <center><div className=" bot- rounded">
                                <button
                                    className="btn btn-transparent"
                                    onClick={handleRegister}
                                    style={{
                                        backgroundColor: "#a659c8",
                                        color: "#ffffff",
                                        borderRadius: "15px",
                                    }}
                                >
                                    Register
                                </button>
                            </div></center>
                        </form>
                        <div id="signInButton">
                            <GoogleLogin
                                onClick={handleGoogleRegister}
                                clientId={clientId}
                                buttonText="Login"
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true}
                            />
                        </div>
                    </div>
                </div>
            </div >
            <div className="container-footer">
                <Footer />
            </div>

        </>
    );
};
export default Register;
