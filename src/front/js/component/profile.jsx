import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../pages/footer.jsx";
import Uploader from "../component/upoloader/uploader.jsx";
import Profiless from "../../styles/profiless.css";
import Profilebottom from "../../img/profilebottom.png";
import Swal from "sweetalert2";
import { userActions } from "../store/usuario.js";

const Profile = () => {
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [morning, setMorning] = useState(false);
  const [afternoon, setAfternoon] = useState(false);
  const [evening, setEvening] = useState(false);
  const [petSitter, setPetSitter] = useState(false);
  const [dogWalker, setDogWalker] = useState(false);
  const [houseSitter, setHouseSitter] = useState(false);
  const [petGroomer, setPetGroomer] = useState(false);
  const [numberOfPets, setPets] = useState(0);
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    "https://via.placeholder.com/150"
  );
  const navigate = useNavigate();


  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleAvailabilityChange = (event) => {
    setAvailability(event.target.value);
  };

  const handleUpload = (newUrl) => {
    setProfilePictureUrl(newUrl);
  };

  const handleUpdateProfile = async () => {
    try {
      if (role === "user") {
        const userData = {
          gender,
          day: parseInt(day),
          month: parseInt(month),
          year: parseInt(year),
          description,
          address,
          phone,
          paymentMethod,
        };
        const response = await userActions().updateUser(userData);
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Profile updated successfully",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to update profile",
            text: response.data.error || "Something went wrong",
          });
        }
      } else if (role === "provider") {
        const profileData = JSON.parse(localStorage.getItem("profileData"));
        const providerId = profileData.providerId;
        const providerData = {
          gender,
          day: parseInt(day),
          month: parseInt(month),
          year: parseInt(year),
          morning,
          afternoon,
          evening,
          pet_sitter: petSitter,
          dog_walker: dogWalker,
          house_sitter: houseSitter,
          pet_groomer: petGroomer,
          number_of_pets: numberOfPets,
          description,
          address,
          phone,
          paymentMethod,
        };
        const response = await userActions().updateProvider(providerData, providerId);
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Profile updated successfully",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to update profile",
            text: response.data.error || "Something went wrong",
          });
        }
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update profile",
        text: error.message || "Something went wrong",
      });
    }
  };


  useEffect(() => {
    const storedProfileData = localStorage.getItem("profileData");
    if (storedProfileData) {
      const profileData = JSON.parse(storedProfileData);
      setGender(profileData.gender);
      setDay(profileData.day);
      setMonth(profileData.month);
      setYear(profileData.year);
      setMorning(profileData.morning);
      setAfternoon(profileData.afternoon);
      setEvening(profileData.evening);
      setPetSitter(profileData.petSitter);
      setDogWalker(profileData.dogWalker);
      setHouseSitter(profileData.houseSitter);
      setPetGroomer(profileData.petGroomer);
      setPets(profileData.numberOfPets);
      setDescription(profileData.description);
      setAddress(profileData.address);
      setPhone(profileData.phone);
      setPaymentMethod(profileData.paymentMethod);
    } else {
      fetchProfileData();
    }
  }, []);

  const fetchProfileData = async () => {
    try {
      if (role === "user") {
        const infoUser = await userActions().getInfoUser();
        setGender(infoUser.gender);
        setDay(infoUser.day);
        setMonth(infoUser.month);
        setYear(infoUser.year);
        setDescription(infoUser.description);
        setAddress(infoUser.address);
        setPhone(infoUser.phone);
        setPaymentMethod(infoUser.paymentMethod);
        localStorage.setItem("profileData", JSON.stringify(infoUser));
      } else if (role === "provider") {
        const infoProvider = await userActions().getInfoProvider();
        setGender(infoProvider.gender);
        setDay(infoProvider.day);
        setMonth(infoProvider.month);
        setYear(infoProvider.year);
        setMorning(infoProvider.morning);
        setAfternoon(infoProvider.afternoon);
        setEvening(infoProvider.evening);
        setPetSitter(infoProvider.petSitter);
        setDogWalker(infoProvider.dogWalker);
        setHouseSitter(infoProvider.houseSitter);
        setPetGroomer(infoProvider.petGroomer);
        setPets(infoProvider.numberOfPets);
        setDescription(infoProvider.description);
        setAddress(infoProvider.address);
        setPhone(infoProvider.phone);
        setPaymentMethod(infoProvider.paymentMethod);
        localStorage.setItem("profileData", JSON.stringify(infoProvider));
      }
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (role === "provider") {
      const providerData = {
        gender,
        day: parseInt(day),
        month: parseInt(month),
        year: parseInt(year),
        morning,
        afternoon,
        evening,
        pet_sitter: petSitter,
        dog_walker: dogWalker,
        house_sitter: houseSitter,
        pet_groomer: petGroomer,
        number_of_pets: numberOfPets,
        description,
        address,
        phone,
        paymentMethod,
      };
      console.log(providerData);
      try {
        const token = localStorage.getItem("token");
        const response = await userActions().infoProvider(providerData);
        console.log(response);
        localStorage.setItem("profileData", JSON.stringify(providerData));
      } catch (error) {
        console.error("Failed to save provider profile information:", error);
      }
    } else if (role === "user") {
      const userData = {
        gender,
        day: parseInt(day),
        month: parseInt(month),
        year: parseInt(year),
        description,
        address,
        phone,
        paymentMethod,
      };
      console.log(userData);
      console.log("Month value:", month);
      try {
        const token = localStorage.getItem("token");
        const response = await userActions().infoUser(userData);
        console.log(response);
        localStorage.setItem("profileData", JSON.stringify(userData));
      } catch (error) {
        console.error("Failed to save profile information:", error);
      }
    }
    Swal.fire({
      icon: "success",
      title: "Changes saved successfully",
    }).then(() => {
      navigate("/profile"); // redirect to updated profile component
    });
  };


  return (
    <>
      <div className="row g-3 align-items-center d-flex flex-column align-items-center justify-content-center" style={{ marginTop: '20px' }}>
        <div className="col-12 col-md-4 text-center">
          <label htmlFor="role">Select Role:</label>
          <select id="role" value={role} onChange={handleRoleChange}>
            <option value="">Select Role</option>
            <option value="provider">Sitter</option>
            <option value="user">Pet parent</option>
          </select>
        </div>
        {role && (
          <>
            <div className="row">
              <div className="col-lg-4">
                <div className="card mb-6">
                  <div className="card-body text-center">
                    <figure>
                      <img src={profilePictureUrl} className="rounded-circle img-fluid" alt="profile" style={{ width: "150px", height: "150px" }} />
                    </figure>
                    <Uploader />
                  </div>
                </div>
              </div>

              {/* Common fields for both roles */}
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <label className="mb-0" htmlFor="gender">
                          <i className="fa-solid fa-person-half-dress" style={{ color: '#a659c8' }}></i> Gender:
                        </label>
                        <select className="ml-2" id="gender" value={gender} onChange={handleGenderChange}>
                          <option value="">Gender</option>
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="col-sm-9">
                        <label htmlFor="dob">
                          <i className="fa-solid fa-calendar" style={{ color: '#a659c8' }}></i> Date of Birth:
                        </label>
                        <select id="day" value={day} onChange={(e) => setDay(parseInt(e.target.value))}>
                          {[...Array(31).keys()].map((d, i) => (
                            <option value={i + 1} key={i}>{i + 1}</option>
                          ))}
                        </select>

                        <select id="month" value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
                          {[...Array(12).keys()].map((m, i) => (
                            <option value={i + 1} key={i}>{i + 1}</option>
                          ))}
                        </select>

                        <select id="year" value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
                          {[...Array(101).keys()].map((y, i) => (
                            <option value={2023 - i} key={i}>{2023 - i}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-12 col-md-4">
                        <label htmlFor="address"><i className="fa-solid fa-map-pin" style={{ color: '#a659c8' }}></i> Address:</label>
                        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                      </div>
                      <div className="col-12 col-md-4">
                        <label htmlFor="phone"><i className="fa-solid fa-mobile-screen-button" style={{ color: '#a659c8' }}></i> Phone:</label>
                        <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </div>
                      <div className="col-12 col-md-4">
                        <label htmlFor="paymentMethod">Payment Method:</label>
                        <div>
                          <input type="radio" value="Visa" name="payment" onChange={(e) => setPaymentMethod(e.target.value)} /> <i className="fa-brands fa-cc-visa" style={{ color: '#a659c8' }}></i>
                          <input type="radio" value="Mastercard" name="payment" onChange={(e) => setPaymentMethod(e.target.value)} /> <i className="fa-brands fa-cc-mastercard" style={{ color: '#a659c8' }}></i>
                          <input type="radio" value="Paypal" name="payment" onChange={(e) => setPaymentMethod(e.target.value)} /> <i className="fa-brands fa-paypal" style={{ color: '#a659c8' }}></i>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="mt-5">
                        <label className="form-label justify-center" htmlFor="description">
                          <i className="fa-solid fa-pencil" style={{ color: '#a659c8' }}></i> Description:
                        </label>
                        <textarea placeholder="Tell us about yourself" id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} style={{ width: "70%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Provider-specific fields */}
            {role === "provider" && (
              <>
                <div className="row">
                  <div className="col-md-4">
                    <div className="card mb-4 mb-md-0">
                      <div className="card-body">
                        <label className="mb-4">
                          <i className="fa-solid fa-clock" style={{ color: '#a659c8' }}></i> Availability:
                        </label>
                        <div>
                          <label className="mt-2 mb-4" htmlFor="morning">
                            <i className="fa-solid fa-sun" style={{ color: '#a659c8' }}></i> Morning
                          </label>
                          <input
                            type="checkbox"
                            id="morning"
                            value="morning"
                            checked={morning}
                            onChange={(e) => setMorning(e.target.checked)}
                          />
                        </div>
                        <div>
                          <label className="mt-2 mb-4" htmlFor="afternoon">
                            <i className="fa-solid fa-cloud" style={{ color: '#a659c8' }}></i> Afternoon
                          </label>
                          <input
                            type="checkbox"
                            id="afternoon"
                            value="afternoon"
                            checked={afternoon}
                            onChange={(e) => setAfternoon(e.target.checked)}
                          />
                        </div>
                        <div>
                          <label className="mt-2 mb-4" htmlFor="evening">
                            <i className="fa-solid fa-moon" style={{ color: '#a659c8' }}></i> Evening
                          </label>
                          <input
                            type="checkbox"
                            id="evening"
                            value="evening"
                            checked={evening}
                            onChange={(e) => setEvening(e.target.checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="card mb-4 mb-md-0">
                      <div className="card-body">
                        <label className="mb-1">
                          <i className="fa-solid fa-star" style={{ color: '#a659c8' }}></i> Services:
                        </label>
                        <div>
                          <label className="mt-2 mb-1" htmlFor="petsitter">
                            <i className="fa-solid fa-cat" style={{ color: '#a659c8' }}></i> Pet Sitter
                          </label>
                          <input
                            type="checkbox"
                            id="petsitter"
                            value="petsitter"
                            checked={petSitter}
                            onChange={(e) => setPetSitter(e.target.checked)}
                          />
                        </div>
                        <div>
                          <label className="mt-4 mb-1" htmlFor="dogwalker">
                            <i className="fa-solid fa-paw" style={{ color: '#a659c8' }}></i> Dog Walker
                          </label>
                          <input
                            type="checkbox"
                            id="dogwalker"
                            value="dogwalker"
                            checked={dogWalker}
                            onChange={(e) => setDogWalker(e.target.checked)}
                          />
                        </div>
                        <div>
                          <label className="mt-4 mb-1" htmlFor="housesitter">
                            <i className="fa-solid fa-house" style={{ color: '#a659c8' }}></i> House Sitter
                          </label>
                          <input
                            type="checkbox"
                            id="housesitter"
                            value="housesitter"
                            checked={houseSitter}
                            onChange={(e) => setHouseSitter(e.target.checked)}
                          />
                        </div>
                        <div>
                          <label className="mt-4 mb-1" htmlFor="petgrooming">
                            <i className="fa-solid fa-scissors" style={{ color: '#a659c8' }}></i> Pet Groomer
                          </label>
                          <input
                            type="checkbox"
                            id="petgrooming"
                            value="petgrooming"
                            checked={petGroomer}
                            onChange={(e) => setPetGroomer(e.target.checked)}
                          />
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card mb-4 mb-md-0">
                      <div className="card-body">
                        <label htmlFor="pets">
                          <i className="fa-solid fa-hippo" style={{ color: '#a659c8' }}></i> Number of pets
                        </label>
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
                    </div>
                  </div>
                </div>
              </>
            )}
            <i className="fa fa-pencil" onClick={handleUpdateProfile}></i>

            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-transparent"
              style={{
                backgroundColor: "#a659c8",
                color: "#ffffff",
                borderRadius: "15px",
                fontFamily: "Noto Serif Hebrew, serif",
                fontSize: "20px",
                width: "10%",
                marginTop: "80px",
                textAlign: "center",
              }}
            >
              Save
            </button>
          </>
        )}
      </div>
      <div>
        <img src={Profilebottom} alt="profilebottom" className="profile-picture img-fluid" />
      </div>
      <div className="container-footer">
        <Footer />
      </div>
    </>
  );
};

export default Profile;
