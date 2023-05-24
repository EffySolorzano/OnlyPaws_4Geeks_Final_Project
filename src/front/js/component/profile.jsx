import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../pages/footer.jsx";
import Uploader from "../component/upoloader/uploader.jsx";
import Profiless from "../../styles/profiless.css";
import Profilebottom from "../../img/profilebottom.png";
import Swal from "sweetalert2";
import { userActions } from "../store/usuario.js";
import { Context } from "../store/appContext";

const Profile = () => {
  const { actions } = useContext(Context);
  const [userInfo, setUserInfo] = useState(null);
  const [infoProvider, setInfoProvider] = useState(null);
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [providerGender, setProviderGender] = useState("");
  const [providerDay, setProviderDay] = useState("");
  const [providerMonth, setProviderMonth] = useState("");
  const [providerYear, setProviderYear] = useState("");
  const [morning, setMorning] = useState(false);
  const [afternoon, setAfternoon] = useState(false);
  const [evening, setEvening] = useState(false);
  const [petSitter, setPetSitter] = useState(false);
  const [dogWalker, setDogWalker] = useState(false);
  const [houseSitter, setHouseSitter] = useState(false);
  const [petGroomer, setPetGroomer] = useState(false);
  const [numberOfPets, setPets] = useState(0);
  const [providerDescription, setProviderDescription] = useState("");
  const [providerAddress, setProviderAddress] = useState("");
  const [providerPhone, setProviderPhone] = useState("");
  const [providerPaymentMethod, setProviderPaymentMethod] = useState("");
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
    const selectedGender = event.target.value;

    if (role === 'provider') {
      setProviderGender(selectedGender);
    } else {
      setGender(selectedGender);
    }
  }

  const handleDescriptionChange = (event) => {
    const description = event.target.value;

    if (role === 'provider') {
      setProviderDescription(description);
    } else {
      setDescription(description);
    }
  }

  const handleProviderDay = (event) => {
    const providerDay = event.target.value;

    if (role === 'provider') {
      setProviderDay(parseInt(providerDay));
    } else {
      setDay(parseInt(providerDay));
    }
  }

  const handleProviderMonth = (event) => {
    const providerMonth = event.target.value;

    if (role === 'provider') {
      setProviderMonth(parseInt(providerMonth));
    } else {
      setMonth(parseInt(providerMonth));
    }
  }

  const handleProviderYear = (event) => {
    const providerYear = event.target.value;

    if (role === 'provider') {
      setProviderYear(parseInt(providerYear));
    } else {
      setYear(parseInt(providerYear));
    }
  }

  const handleProviderAddress = (event) => {
    const providerAddress = event.target.value;

    if (role === 'provider') {
      setProviderAddress(providerAddress);
    } else {
      setAddress(providerAddress);
    }
  }

  const handleProviderPhone = (event) => {
    const providerPhone = event.target.value;

    if (role === 'provider') {
      setProviderPhone(providerPhone);
    } else {
      setPhone(providerPhone);
    }
  }

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await userActions().getUserProfilePicture();
        setProfilePictureUrl(response.ruta);
      } catch (error) {
        console.error("Failed to fetch profile picture:", error);
      }
    };

    fetchProfilePicture();
  }, []);

  const fetchProfilePicture = async () => {
    try {
      const response = await userActions().getUserProfilePicture();
      setProfilePictureUrl(response);
    } catch (error) {
      console.error("Failed to fetch profile picture:", error);
    }
  };

  useEffect(() => {
    fetchProfilePicture();
  }, []);

  // Add this code to fetch the profile picture URL from localStorage if available
  useEffect(() => {
    const storedProfilePictureUrl = localStorage.getItem("profilePictureUrl");
    if (storedProfilePictureUrl) {
      setProfilePictureUrl(storedProfilePictureUrl);
    }
  }, []);



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
        //const profileData = JSON.parse(localStorage.getItem("profileData"));
        //const providerId = profileData.provider_id;
        const providerData = {
          gender: providerGender,
          day: parseInt(providerDay),
          month: parseInt(providerMonth),
          year: parseInt(providerYear),
          morning,
          afternoon,
          evening,
          pet_sitter: petSitter,
          dog_walker: dogWalker,
          house_sitter: houseSitter,
          pet_groomer: petGroomer,
          number_of_pets: numberOfPets,
          description: providerDescription,
          address: providerAddress,
          phone: providerPhone,
          paymentMethod: providerPaymentMethod,
        };
        const response = await userActions().updateProvider(providerData);
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


  const fetchUserInfo = async () => {
    try {
      const info = await actions.getUserInfo();
      setUserInfo(info);
      setGender(info.gender)
      setDay(info.day)
      setMonth(info.month)
      setYear(info.year)
      setPhone(info.phone)
      setAddress(info.address)
      setDescription(info.description)
      setPaymentMethod(info.payment_method)
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  const fetchInfoProvider = async () => {
    try {
      const info = await actions.getInfoProvider();
      setInfoProvider(info);
      setProviderGender(info.gender);
      setProviderDay(info.day);
      setProviderMonth(info.month);
      setProviderYear(info.year);
      setProviderPhone(info.phone);
      setProviderAddress(info.address);
      setProviderDescription(info.description);
      setProviderPaymentMethod(info.payment_method);
      setMorning(info.morning);
      setAfternoon(info.afternoon);
      setEvening(info.evening);
      setPetGroomer(info.pet_groomer);
      setDogWalker(info.dog_walker);
      setHouseSitter(info.house_sitter);
      setPetGroomer(info.pet_groomer);
      setPets(info.number_of_pets);
    } catch (error) {
      console.error("Failed to fetch provider info:", error);
    }
  };

  useEffect(() => {

    fetchUserInfo();
    fetchInfoProvider();
  }, [actions]);



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

  const handleDelete = async (event) => {
    event.preventDefault();
    if (role === "provider") {
      try {
        await userActions().deleteProvider();
        Swal.fire({
          icon: "success",
          title: "Provider deleted successfully",
        }).then(() => {
          navigate("/"); // Redirect to the profile component
        });
      } catch (error) {
        console.error("Failed to delete provider:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to delete provider",
          text: error.message || "Something went wrong",
        });
      }
    } else if (role === "user") {
      try {
        await userActions().deleteUser();
        Swal.fire({
          icon: "success",
          title: "User deleted successfully",
        }).then(() => {
          navigate("/"); // Redirect to the profile component
        });
      } catch (error) {
        console.error("Failed to delete user:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to delete user",
          text: error.message || "Something went wrong",
        });
      }
    }
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
                      <img
                        src={profilePictureUrl}
                        className="rounded-circle img-fluid"
                        alt="profile"
                        style={{ width: "150px", height: "150px" }}
                      />
                    </figure>
                    <Uploader setProfilePictureUrl={setProfilePictureUrl} />

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
                        <select
                          className="ml-2"
                          id="gender"
                          value={role === 'provider' ? providerGender : gender}
                          onChange={handleGenderChange}
                        >
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
                        <select id="day" value={role === 'provider' ? providerDay : day} onChange={handleProviderDay}>
                          {[...Array(31).keys()].map((d, i) => (
                            <option value={i + 1} key={i}>{i + 1}</option>
                          ))}
                        </select>

                        <select id="month" value={role === 'provider' ? providerMonth : month} onChange={handleProviderMonth}>
                          {[...Array(12).keys()].map((m, i) => (
                            <option value={i + 1} key={i}>{i + 1}</option>
                          ))}
                        </select>

                        <select id="year" value={role === 'provider' ? providerYear : year} onChange={handleProviderYear}>
                          {[...Array(101).keys()].map((y, i) => (
                            <option value={2023 - i} key={i}>{2023 - i}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-12 col-md-4">
                        <label htmlFor="address"><i className="fa-solid fa-map-pin" style={{ color: '#a659c8' }}></i> Address:</label>
                        <input type="text" id="address" value={role === 'provider' ? providerAddress : address} onChange={handleProviderAddress} />
                      </div>
                      <div className="col-12 col-md-4">
                        <label htmlFor="phone"><i className="fa-solid fa-mobile-screen-button" style={{ color: '#a659c8' }}></i> Phone:</label>
                        <input type="text" id="phone" value={role === 'provider' ? providerPhone : phone} onChange={handleProviderPhone} />
                      </div>
                      <div className="col-12 col-md-4">
                        <label htmlFor="paymentMethod">Payment Method:</label>
                        <div>
                          <input type="radio" value="Visa" checked={userInfo?.paymentMethod === 'Visa' || infoProvider?.paymentMethod === 'Visa'} name="payment" onChange={(e) => setPaymentMethod(e.target.value)} /> <i className="fa-brands fa-cc-visa" style={{ color: '#a659c8' }}></i>
                          <input type="radio" value="Mastercard" checked={userInfo?.paymentMethod === 'Mastercard' || infoProvider?.paymentMethod === 'Mastercard'} name="payment" onChange={(e) => setPaymentMethod(e.target.value)} /> <i className="fa-brands fa-cc-mastercard" style={{ color: '#a659c8' }}></i>
                          <input type="radio" value="Paypal" checked={userInfo?.paymentMethod === 'Paypal' || infoProvider?.paymentMethod === 'Paypal'} name="payment" onChange={(e) => setPaymentMethod(e.target.value)} /> <i className="fa-brands fa-paypal" style={{ color: '#a659c8' }}></i>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="mt-5">
                        <label className="form-label justify-center" htmlFor="description">
                          <i className="fa-solid fa-pencil" style={{ color: '#a659c8' }}></i> Description:
                        </label>
                        <textarea placeholder="Tell us about yourself" id="description" value={role === 'provider' ? providerDescription : description} onChange={handleDescriptionChange} rows={3} style={{ width: "70%" }} />
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
            <div>
              <button type="submit"
                onClick={handleUpdateProfile}
                className="btn btn-transparent"
                style={{
                  backgroundColor: "#a659c8",
                  color: "#ffffff",
                  borderRadius: "15px",
                  fontFamily: "Noto Serif Hebrew, serif",
                  fontSize: "20px",
                  width: "3%",
                  marginLeft: "570px",
                }}>
                <i className="fa solid fa-pencil"></i>
              </button>
            </div>
            <div>
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
                  marginTop: "-104px",
                  textAlign: "center",
                  marginLeft: "640px",
                }}
              >
                Save
              </button>
            </div>
            <div>
              <button className="btn btn-transparent" onClick={handleDelete} style={{
                backgroundColor: "#ff7900",
                color: "#ffffff",
                borderRadius: "15px",
                fontFamily: "Noto Serif Hebrew, serif",
                fontSize: "20px",
                width: "3%",
                marginTop: "-187px",
                textAlign: "center",
                marginLeft: "820px",
              }}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
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