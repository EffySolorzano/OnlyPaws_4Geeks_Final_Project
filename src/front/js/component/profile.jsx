import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../pages/footer.jsx";
import Uploader from "../component/upoloader/uploader.jsx";
import Profiless from "../../styles/profiless.css";
import Profilebottom from "../../img/profilebottom.png";
import Swal from "sweetalert2";


const Profile = () => {
  const [role, setRole] = useState('');
  const [gender, setGender] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [workTime, setWorkTime] = useState('');
  const [service, setService] = useState('');
  const [numberOfPets, setPets] = useState(0);
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('https://via.placeholder.com/150');
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setWorkTime((prevWorkTime) => [...prevWorkTime, value]);
    } else {
      setWorkTime((prevWorkTime) => prevWorkTime.filter((time) => time !== value));
    }
  };

  const handleUpload = (newUrl) => {
    setProfilePictureUrl(newUrl);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic based on the selected role
    if (role === 'provider') {
      // Submit form for provider role
      // You can access the provider-specific form data here
      const providerData = {
        gender,
        day,
        month,
        year,
        workTime,
        service,
        numberOfPets,
        description,
        address,
        phone,
        paymentMethod,
        profilePictureUrl,
      };
      console.log(providerData);
    } else if (role === 'user') {
      // Submit form for user role
      // You can access the user-specific form data here
      const userData = {
        gender,
        day,
        month,
        year,
        description,
        address,
        phone,
        paymentMethod,
        profilePictureUrl,
      };
      console.log(userData);
    }
    Swal.fire({
      icon: "success",
      title: "Changes saved successfully",
    }).then(() => {
      navigate("/"); // redirect to login component
    });
  };

  return (
    <><form className="row g-3 align-items-center d-flex flex-column align-items-center justify-content-center" style={{ marginTop: '20px' }}>
      <div className="col-12 col-md-4 text-center" >
        <label htmlFor="role">Select Role:</label>
        <select id="role" value={role} onChange={handleRoleChange}>
          <option value="">Select Role</option>
          <option value="provider">Sitter</option>
          <option value="user">Pet parent</option>
        </select>
      </div>
      {role && (
        <>

          <div className="row" >
            <div className="col-lg-4" >
              <div className="card mb-6" >
                <div className="card-body text-center" >
                  <figure>
                    <img src={profilePictureUrl} className="rounded-circle img-fluid" alt="profile" style={{ width: "150px", height: "150px", }} />
                    <Uploader onUpload={handleUpload} />
                  </figure>
                </div>
              </div>
            </div>

            {/* Common fields for both roles */}
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <label className="mb-0" htmlFor="gender"><i className="fa-solid fa-person-half-dress" style={{ color: '#a659c8' }}></i> Gender:</label>
                      <select className="ml-2" id="gender" value={role} onChange={handleGenderChange}>
                        <option value="gender">Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-sm-9">
                      <label htmlFor="dob"><i className="fa-solid fa-calendar" style={{ color: '#a659c8' }}></i> Date of Birth: </label>
                      <select id="day" value={day} onChange={(e) => setDay(e.target.value)}>
                        {[...Array(31).keys()].map((d, i) => (
                          <option value={i + 1} key={i}>{i + 1}</option>
                        ))}
                      </select>

                      <select id="month" value={month} onChange={(e) => setMonth(e.target.value)}>
                        {[...Array(12).keys()].map((m, i) => (
                          <option value={i + 1} key={i}>{i + 1}</option>
                        ))}
                      </select>

                      <select id="year" value={year} onChange={(e) => setYear(e.target.value)}>
                        {[...Array(101).keys()].map((y, i) => (
                          <option value={2023 - i} key={i}>{2023 - i}</option>
                        ))}
                      </select>
                    </div>
                    <div className="row mt-3">
                      <div className="col-12 col-md-4" >
                        <label htmlFor="address"><i className="fa-solid fa-map-pin" style={{ color: '#a659c8' }}></i> Address:</label>
                        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                      </div>
                      <div className="col-12 col-md-4" >
                        <label htmlFor="phone"><i className="fa-solid fa-mobile-screen-button" style={{ color: '#a659c8' }}></i> Phone:</label>
                        <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </div>
                      <div className="col-12 col-md-4" >
                        <label htmlFor="paymentMethod">Payment Method:</label>
                        <div onChange={(e) => setPaymentMethod(e.target.value)}>
                          <input type="radio" value="Credit Card" name="payment" /> <i className="fa-brands fa-cc-visa" style={{ color: '#a659c8' }}></i>
                          <input type="radio" value="Debit Card" name="payment" /> <i className="fa-brands fa-cc-mastercard" style={{ color: '#a659c8' }}></i>
                          <input type="radio" value="Paypal" name="payment" /> <i className="fa-brands fa-paypal" style={{ color: '#a659c8' }}></i>
                        </div>

                      </div>
                    </div>
                    <div className="row">
                      <div className="mt-5">
                        <label className="form-label justify-center" htmlFor="description"><i className="fa-solid fa-pencil" style={{ color: '#a659c8' }}></i> Description:  </label>
                        <textarea placeholder=" tell us about yourself" id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} style={{ width: "70%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div>
             <label htmlFor="profilePicture">Profile Picture:</label>
            <input type="file" id="profilePicture" onChange={handleProfilePictureChange} />
</div> */}
          {/* Provider-specific fields */}
          {role === 'provider' && (
            <>
              <div className="row">
                <div className="col-md-4">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <label className="mb-4"><i className="fa-solid fa-clock" style={{ color: '#a659c8' }}></i> Availability:</label>
                      <div>
                        <label className="mt-2 mb-4" htmlFor="morning"><i className="fa-solid fa-sun" style={{ color: '#a659c8' }}></i> Morning  </label>
                        <input
                          type="checkbox"
                          id="morning"
                          value="morning"
                          checked={workTime.includes('morning')}
                          onChange={(e) => handleCheckboxChange(e, 'morning')}
                        />
                      </div>
                      <div>
                        <label className="mt-2 mb-4" htmlFor="afternoon"><i className="fa-solid fa-cloud" style={{ color: '#a659c8' }}></i> Afternoon</label>

                        <input
                          type="checkbox"
                          id="afternoon"
                          value="afternoon"
                          checked={workTime.includes('afternoon')}
                          onChange={(e) => handleCheckboxChange(e, 'afternoon')}
                        />
                      </div>
                      <div>
                        <label className="mt-2 mb-4" htmlFor="evening"><i className="fa-solid fa-moon" style={{ color: '#a659c8' }}></i> Evening</label>
                        <input
                          type="checkbox"
                          id="evening"
                          value="evening"
                          checked={workTime.includes('evening')}
                          onChange={(e) => handleCheckboxChange(e, 'evening')}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <label className="mb-1"><i className="fa-solid fa-star" style={{ color: '#a659c8' }}></i> Services:</label>
                      <div>
                        <label className="mt-2 mb-1" htmlFor="petsitter"><i className="fa-solid fa-cat" style={{ color: '#a659c8' }}></i> Pet Sitter</label>
                        <input
                          type="checkbox"
                          id="petsitter"
                          value="petsitter"
                          checked={workTime.includes('petsitter')}
                          onChange={(e) => handleCheckboxChange(e, 'petsitter')}
                        />
                      </div>
                      <div>
                        <label className="mt-4 mb-1" htmlFor="dogwalker"><i className="fa-solid fa-paw" style={{ color: '#a659c8' }}></i> Dog Walker</label>
                        <input
                          type="checkbox"
                          id="dogwalker"
                          value="dogwalker"
                          checked={workTime.includes('dogwalker')}
                          onChange={(e) => handleCheckboxChange(e, 'dogwalker')}
                        />
                      </div>
                      <div>
                        <label className="mt-4 mb-1" htmlFor="housesitter"><i className="fa-solid fa-house" style={{ color: '#a659c8' }}></i> House Sitter</label>
                        <input
                          type="checkbox"
                          id="housesitter"
                          value="housesitter"
                          checked={workTime.includes('housesitter')}
                          onChange={(e) => handleCheckboxChange(e, 'housesitter')}
                        />
                      </div>
                      <div>
                        <label className="mt-4 mb-1" htmlFor="petgrooming"><i className="fa-solid fa-scissors" style={{ color: '#a659c8' }}></i> Pet Groomer</label>
                        <input
                          type="checkbox"
                          id="petgrooming"
                          value="petgrooming"
                          checked={workTime.includes('petgrooming')}
                          onChange={(e) => handleCheckboxChange(e, 'petgrooming')}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <label htmlFor="pets"><i className="fa-solid fa-hippo" style={{ color: '#a659c8' }}></i>  Number of pets</label>
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

          >Save</button>
        </>
      )}
    </form>
      <div>
        <img src={Profilebottom} alt="profilebottom" className="profile-picture img-fluid" />
      </div>
      <div className="container-footer">
        <Footer />
      </div></>
  );
};

export default Profile;