import React, { useContext, useState, useEffect } from "react";
import header from "../../img/header.jpg";
import { Context } from "../store/appContext";
import DatePicker from "react-datepicker";
import Select from "./Select.jsx";
import Home_moreServices from "./home_moreServices.jsx";
import Findsitter from "./findsitter.jsx";
import Opapp from "./opapp.jsx";
import Footer from "./footer.jsx";
import { Link } from "react-router-dom";
import Location from "../../img/location.png";
import Calendar from "../../img/calendar.png";
import Paw from "../../img/paw.png";
import "react-datepicker/dist/react-datepicker.css";

const countryOptions = [
  { value: "AF", label: "Argentina" },
  { value: "AL", label: "Costa Rica" },
  { value: "DZ", label: "Venezuela" },
  { value: "UY", label: "Uruguay" },
  { value: "US", label: "United States" },
];

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numberOfPets, setPets] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({ value: "" });

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchQuery = search;
    const location = selectedCountry ? selectedCountry.value : null;
    const checkin = startDate.toISOString();
    const checkout = endDate.toISOString();
    const numberOfPets = parseInt(numberOfPets);
    const urlSearchParams = new URLSearchParams({
      searchQuery,
      location,
      checkin,
      checkout,
      numberOfPets,
    });
    const searchResultsUrl = `/search-btn?${urlSearchParams.toString()}`;
    window.location.href = searchResultsUrl;
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(date); // set the checkout date to the same date as check-in date
  };

  return (
    <div className="container">
      <div className="header">
        <img src={header} alt="header" className="header" />
      </div>
      <div className="container">
        <div className="search-container">
          <div className="location-container">
            <img src={Location} alt="location-dot" className="location-dot" />
            <label htmlFor="location"></label>

            <Select
              options={countryOptions}
              value={selectedCountry}
              onChange={(e) => {
                handleCountryChange(e);
              }}
              placeholder="Select a country "
            />
          </div>
          <div className="checkin">
            <label htmlFor="checkin"></label>
            <DatePicker
              id="checkin"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <img src={Calendar} alt="calendar" className="calendar" />
          <div className="checkout">
            <label htmlFor="checkout"></label>
            <DatePicker
              id="checkout"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={startDate} // Add minDate prop to ensure checkout date is never before checkin
            />
          </div>
          <div className="pets-container">
            <img src={Paw} alt="paw" className="paw" />
            <label htmlFor="pets"></label>

            <select
              id="pets"
              value={numberOfPets}
              onChange={(e) => setPets(e.target.value)}
            >
              {[...Array(11).keys()].map((num) => (
                <option value={num} key={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <Link to="/search-btn">
            <button
              className="btn btn-transparent"
              id="search-btn"
              style={{
                backgroundColor: "#a659c8",
                color: "#ffffff",
                borderRadius: "15px",
                height: "50px",
              }}
              onClick={handleSearchSubmit}
            >
              Search <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </Link>
        </div>
      </div>
      <div>
        <Home_moreServices />
        <Findsitter />
        <Opapp />
        <Footer />
      </div>
    </div>
  );
};
