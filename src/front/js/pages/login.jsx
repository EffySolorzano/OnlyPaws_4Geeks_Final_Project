import React, { useState, useContext, useEffect } from "react";
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
    console.log('email')
    console.log('password')
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

  const handleForgotPassword = () => {
    Swal.fire({
      title: 'Forgot password',
      input: 'email',
      inputAttributes: {
        autocapitalize: 'off',
        required: 'true'
      },
      showCancelButton: true,
      confirmButtonText: 'Send email',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const email = result.value;
        Swal.fire({
          title: 'Password Reset',
          text: `An email with a link to reset your password has been sent to ${email}`,
          icon: 'success'
        });
      }
    });
  };

  return (
    <><div className="log container mt-5 col-md-12 bg-light border border-secondary-emphasis w-25">
      <div className="login-form">
        <h1 className="fs-1 fw-bold mt-5">
          <center><img src={Onlypaws} alt="onlypaws_logo" className="principal img-fluid onlypaws-logo" /></center>
        </h1>
        <form className="d-flex flex-column">
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
          <div>
            <center>
              <label className="forgot mb-3" htmlFor="forgotPassword">
                <a href="#" onClick={handleForgotPassword}>
                  Forgot password?
                </a>
              </label>
            </center>
          </div>
          <center>
            <button
              type="submit"
              className="boton btn btn-transparent mb-5"
              onClick={handleLogin}
              style={{
                backgroundColor: "#a659c8",
                color: "#ffffff",
                borderRadius: "15px",
              }}
            >
              Submit
            </button>
          </center>
        </form>
      </div>
    </div>
      <div>
        <Footer />
      </div></>



  );
}

export default Login;

