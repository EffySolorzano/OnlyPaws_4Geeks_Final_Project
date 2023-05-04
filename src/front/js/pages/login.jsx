import React, { useContext, useState } from "react"
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Loginn from "../../styles/Loginn.css";
import Onlypaws from "../../img/Onlypaws.png";
import Swal from "sweetalert2";


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

  return (
    <div className="log container mt-5 col-md-12 bg-light border border-secondary-emphasis w-25">
      <div className="login-form">
        <h1 className="fs-1 fw-bold mt-5">
          <center><img src={Onlypaws} alt="onlypaws_logo" className="principal img-fluid onlypaws-logo" /></center>
        </h1>
        <form className="d-flex flex-column" onSubmit={handleLogin}>
        </form>
        <form>
          <div className="form-floating col-md-12 ">
            <input type="email" className="form-control w-100 col-md-12" id="floatingInput" placeholder="name@example.com"></input>
            <label for="floatingInput">Username</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"></input>
            <label for="floatingPassword">Password</label><br></br>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
            <label className="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
          <center><button type="submit" className="boton btn btn-outline-warning">Submit</button></center>
        </form>
        <br></br>
      </div>
    </div>

  );
}

export default Login;

