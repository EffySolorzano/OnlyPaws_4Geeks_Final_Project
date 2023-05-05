import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import OnlyPaws from "../../img/onlypaws.png"

const AddPetSitter = () => {
  const { store, actions } = useContext(Context);
  // const [fullname, setFullName] = useState("");
  // const [lastname, setLastName] = useState("");
  // const [username, setUserName] = useState("");
  // const [country, setCountry] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [repeatpassword, setRepeatPassword] = useState("");
  // const [isActive, setIsActive] = useState(true);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   console.log(username);
  // }, [email]);
  // useEffect(() => {
  //   console.log(password);
  // }, [password]);
  // const handleRegister = async (e) => {
  //   e.preventDefault(); // prevent form from submitting
  //   const response = await actions.register(
  //     fullname,
  //     lastname,
  //     username,
  //     country,
  //     email,
  //     password,
  //     repeatpassword,
  //     isActive
  //   ); // call register action
  //   console.log(response);
  //   if (response.ok) {
  //     Swal.fire({
  //       icon: "success",
  //       title: "Registration successful!",
  //     }).then(() => {
  //       navigate("/login"); // redirect to login component
  //     });
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Registration failed. Please try again later.",
  //     });
  //   }
  // };
  // console.log(actions);

  return (<>
    <div className="container p-4 mt-4 col-3 bg-light rounded-3 border border-secondary-emphasis">
      <center><img src={OnlyPaws} className="imagen-paws img d-flex justify-content-center" /></center>
      <div className="title-add d-flex justify-content-center">
        <h1>Create your account</h1>
      </div>
      <form className="row g-3">
        <div className="col-md-12">
          <label for="full-name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control p-2"
            id="full-name"
            name="full-name"
            placeholder="Insert your name"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
        </div>
        <div className="col-md-12">
          <label for="last-name" className="form-label">
            Last name:
          </label>
          <input
            type="text"
            className="form-control p-2"
            id="last-name"
            name="last-name"
            placeholder="Insert your last name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
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
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className="col-md-12">
          <label for="country" className="form-label">
            Country:
          </label>
          <select id="country" name="country" className="form-select p-2" onChange={(e) => {
            setCountry(e.target.value);
          }}>
            <option>Select your country</option>
            <option>Costa Rica</option>
            <option>Venezuela</option>
            <option>Argentina</option>
            <option>United States</option>
            <option>Germany</option>
          </select>
        </div>
        <div className="col-md-12">
          <label for="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control p-2"
            id="email"
            name="email"
            placeholder="Insert your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="col-md-12">
          <label for="password-repeat" className="form-label">
            Repeat Password:
          </label>
          <input
            type="password"
            pattern=".{6,}"
            className="form-control p-2"
            id="password-repeat"
            name="password-repeat"
            placeholder="Repeat your password"
            onChange={(e) => {
              setRepeatPassword(e.target.value);
            }}
          />
        </div>
        <p>Already have account? <Link to="/sign-in-pet-sitter">
          Sign in
        </Link></p>
        <div className="col-md-12 d-flex align-items-end justify-content-center mt-1">
          <button
            type="button"
            className="add-sitter btn text-light"
            onClick={async () => {
              const full_name = document.getElementById("full-name").value;
              const last_name = document.getElementById("last-name").value;
              const username = document.getElementById("username").value;
              const country = document.getElementById("country").value;
              const email = document.getElementById("email").value;
              const password = document.getElementById("password").value;
              const password_repeat = document.getElementById("password-repeat").value;

              const newContact = {
                full_name,
                last_name,
                username,
                country,
                email,
                password,
                password_repeat,
                agenda_slug: "agenda_de_marce",
              };
              let { respuestaJson, response } = await actions.useFetch(
                "/apis/fake/contact/",
                newContact,
                "POST"
              );
              if (response.ok) {
                console.log(response);
                alert("Contacto cargado con éxito!");
              } else {
                alert("Error! datos ingresados incorrectamente");
                return;
              }

              document.getElementById("full-name").value = "";
              document.getElementById("last-name").value = "";
              document.getElementById("username").value = "";
              document.getElementById("country").value = "";
              document.getElementById("email").value = "";
              document.getElementById("password").value = "";
              document.getElementById("password-repeat").value = "";
            }}
          >
            Register
          </button>
          <Link to="/">
            <button type="button" className="btn btn-secondary ms-3">
              Go back
            </button>
          </Link>
        </div>
      </form>
    </div>
  </>);
};

export default AddPetSitter;
