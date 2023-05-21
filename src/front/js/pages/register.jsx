import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Onlypaws from "../../img/onlypaws.png";
import Swal from "sweetalert2";
import Registerr from "../../styles/registerr.css";
import { Link } from "react-router-dom";
import Footer from "./footer.jsx";
import jwt_decode from "jwt-decode";


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

    const [user, setUser] = useState({});

    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;
        navigate("/login")
    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: "331353560025-vremdlrldn6kgqj9d6csujq1j3abqoq5.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        );

        google.accounts.id.prompt();
    }, []);

    // const clientId = "331353560025-vremdlrldn6kgqj9d6csujq1j3abqoq5.apps.googleusercontent.com";
    // const [user, setUser] = useState({});

    // useEffect(() => {
    //     const start = () => {
    //         gapi.auth2.init({
    //             clientId: clientId,
    //         })
    //     }
    //     gapi.load("client: auth2", start)
    // }, [])

    // const onSuccess = (response) => {
    //     setUser(response.profileObj);
    // }

    // const onFailure = () => {
    //     console.log("Something went wrong")
    // }

    // const handleGoogleLoginSuccess = async (response) => {
    //     const idToken = response.tokenId;


    //     try {
    //         // Envía el idToken al backend para su verificación y creación de usuario
    //         const response = await actions.registerWithGoogle(idToken);

    //         if (response.ok) {
    //             Swal.fire({
    //                 icon: "success",
    //                 title: "Google authentication successful!",
    //             }).then(() => {
    //                 const userId = response.id;
    //                 localStorage.setItem("userId", userId);
    //                 navigate("/login");
    //             });
    //         } else {
    //             Swal.fire({
    //                 icon: "error",
    //                 title: "Oops...",
    //                 text: "Google authentication failed. Please try again later.",
    //             });
    //         }
    //     } catch (error) {
    //         console.error(error);

    //         Swal.fire({
    //             icon: "error",
    //             title: "Oops...",
    //             text: "Google authentication failed. Please try again later.",
    //         });
    //     }
    // };

    // const handleGoogleLoginFailure = (error) => {
    //     console.error(error);

    //     Swal.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: "Google authentication failed. Please try again later.",
    //     });
    // };



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
                            </div>
                            </center>
                        </form>
                        <div id="signInDiv"></div>
                        {user &&
                            <div>
                                <img src={user.picture} />
                                <h3>{user.name}</h3>
                            </div>
                        }
                    </div>
                </div>
            </div >
            <div>
                <Footer />
            </div>

        </>
    );
};
export default Register;
