import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import Footer from "../pages/footer.jsx";
import Providerss from "../../styles/providerss.css";
import Swal from "sweetalert2";

const Provider = () => {
  const [providers, setProviders] = useState([
    {/* {
      name: "John Doe",
      service: "Pet Sitter",
      imgUrl: "https://example.com/images/john.jpg",
    },
    {
      name: "Jane Smith",
      service: "Pet Sitter",
      imgUrl: "https://example.com/images/jane.jpg",
    },
    {
      name: "Bob Johnson",
      service: "Dog Walker",
      imgUrl: "https://example.com/images/bob.jpg",
    }, */}
  ]);


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
      background: "#fff",
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

        const response = await fetch("http://127.0.0.1:3001/api/providers", {
          method: "GET",
        });

        console.log("Response status:", response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("Received data:", data);
          if (Array.isArray(data)) {
            const providers = data.map((provider) => ({
              name: provider.name,
              service: provider.service,
              imgUrl: provider.imgUrl,
              description: provider.description,
            }));
            console.log("Providers:", providers);
            setProviders(providers);
          } else {
            console.error("Invalid response data format. Expected an array.");
          }
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
        <h2 className="title-stack">sitter results...</h2>
        <div className="cartica-stack">
          {providers.length > 0 ? (
            providers.map((provider, index) => (
              <TinderCard
                key={index} // Use the index as the key
                onSwipe={(dir) => onSwipe(dir)}
                onCardLeftScreen={() => onCardLeftScreen(provider.name)}
                className="swipe"
              >
                <div className="carticas provider-cartas">
                  <img
                    src={provider.imgUrl}
                    alt={provider.name}
                    className="img-fluid pic-card"
                  />
                  <h2 className="texto">
                    {provider.name} {/*{provider.service}*/}
                  </h2>
                  {/*<p>{provider.description}</p>*/}
                  <div>
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
                </div>
              </TinderCard>
            ))
          ) : (
            <p>No providers found.</p>
          )}
        </div>
      </div>
      <div className="container-footer">
        <Footer />
      </div>
    </>
  );
};

export default Provider;
