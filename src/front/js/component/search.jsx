import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import Footer from "../pages/footer.jsx";
import Providerss from "../../styles/providerss.css";
import Swal from "sweetalert2";

const Provider = () => {
  const [people, setPeople] = useState([]);

  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };

  const handleBookNowClick = () => {
    Swal.fire({
      title: "Thank you for booking with us!",
      width: 600,
      padding: "3em",
      color: "#716add",
      background: "#fff url(/images/trees.png)",
      backdrop: `
        rgba(0,0,123,0.4)
        url("https://media.tenor.com/-AyTtMgs2mMAAAAj/nyan-cat-nyan.gif")
        no-repeat
      `,
    });
  };

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        console.log("Fetching providers...");
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://127.0.0.1:3001/api/providers", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          const providers = data.providers.map((provider) => ({
            name: provider.name,
            service: provider.service,
            imgUrl: provider.imgUrl,
            description: provider.description,
          }));
          setPeople(providers);
          console.log(providers)
        } else {
          console.error("Error fetching providers:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchProviders();
  }, []);

  return (
    <>
      <div className="stack">
        <h2 className="title-stack">search results...</h2>
        <div className="cartica-stack">
          {people.map((person, index) => (
            <TinderCard
              key={person.name}
              onSwipe={(dir) => onSwipe(dir)}
              onCardLeftScreen={() => onCardLeftScreen(person.name)}
              className="swipe"
            >
              <div className="carticas provider-cartas">
                <img
                  src={person.imgUrl}
                  alt={person.name}
                  className="img-fluid pic-card"
                />
                <h2 className="texto">
                  {person.name}
                  {person.service}
                </h2>
                <p>{person.description}</p>
                <button
                  className="btn btn-transparent booknow"
                  style={{
                    backgroundColor: "#a659c8",
                    color: "#ffffff",
                    borderRadius: "15px",
                    fontFamily: "Noto Serif Hebrew, serif",
                    fontSize: "20px",
                    width: "30%",
                    marginTop: "80px",
                    marginLeft: "160px",
                  }}
                  onClick={handleBookNowClick}
                >
                  Book now!
                </button>
              </div>
            </TinderCard>
          ))}
        </div>
      </div>
      <div className="container-footer">
        <Footer />
      </div>
    </>
  );
};

export default Provider;
