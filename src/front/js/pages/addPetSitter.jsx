import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import OnlyPaws from "../../img/onlypaws.png"
import Footer from "./footer.jsx";

const AddPetSitter = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUserName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(username);
  }, [email]);
  useEffect(() => {
    console.log(password);
  }, [password]);
  const handleAddPetSitter = async (e) => {
    e.preventDefault(); // prevent form from submitting
    const response = await actions.register(
      name,
      surname,
      username,
      country,
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

  return (<>
    <div className="container p-4 mt-4 col-3 bg-light rounded-3 border border-secondary-emphasis">
      <center><img src={OnlyPaws} className="imagen-paws img d-flex justify-content-center" /></center>
      <div className="title-add d-flex justify-content-center">
        <h4>Create your account</h4>
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
            Surname:
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

        <p>Already have account? <Link to="/sign-in-pet-sitter">
          Sign in
        </Link></p>
        <div className="col-md-12 d-flex align-items-end justify-content-center mt-1">
          <button
            type="button"
            className="add-sitter btn text-light"
            onClick={handleAddPetSitter}
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
    <div>
      <Footer />
    </div>
  </>);
};

export default AddPetSitter;
