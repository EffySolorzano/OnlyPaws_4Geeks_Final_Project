import React, { useContext, useState } from "react"
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Loginn from "../../styles/Loginn.css";
import Onlypaws from "../../img/onlypaws.png";
import Swal from "sweetalert2";
import Footer from "./footer.jsx";


const Login = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();






  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in both fields",
      });
      return;
    }
    let response = await actions.login(email, password);
    if (response.ok) {
      //actions.initialFetchUsersData();
      //actions.getUserFavorites();
      Swal.fire({
        icon: "success",
        title: "Login successful!",
      }).then(() => {
        navigate("/");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login failed. Please check your credentials.",
      });
    }
  };

  const showPasswordResetModel = async (e) => {
    e.preventDefault();

    const { value: email } = await Swal.fire({
      title: 'Submit your email',
      input: 'email',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Reset Password',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        const emailRegex = /^\S+@\S+\.\S+$/; // Regular expression for basic email validation
        if (!emailRegex.test(email)) {
          Swal.showValidationMessage('Please enter a valid email address');
        } else {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 2000);
          });
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    });

    if (email) {
      Swal.fire({
        title: 'Password Reset Request',
        text: `An email has been sent to ${email} with instructions on how to reset your password.`,
        icon: 'success'
      });
    }
  };


  return (
    <>
      <div className="log container mt-5 col-md-12 bg-light border border-secondary-emphasis w-25">
        <div className="login-form">
          <h1 className="fs-1 fw-bold mt-5">
            <center>
              <img
                src={Onlypaws}
                alt="onlypaws_logo"
                className="principal img-fluid onlypaws-logo"
              />
            </center>
          </h1>
          <form className="d-flex flex-column" onSubmit={handleLogin}>
            <div className="form-floating col-md-12 mb-3">
              <input
                type="email"
                className="form-control w-100 col-md-12"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
              <br />
            </div>
            <div className="forgotPassword">
              <a href="#" onClick={showPasswordResetModel}>
                Forgot Password?
              </a>
            </div>
            <center>
              <button
                type="submit"
                className="boton btn btn-transparent"
                style={{
                  backgroundColor: "#a659c8",
                  color: "#ffffff",
                  borderRadius: "15px",
                  marginTop: "25px",
                }}
              >
                Submit
              </button>
            </center>
          </form>
          <br />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );

}

export default Login;

