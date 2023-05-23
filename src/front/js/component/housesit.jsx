import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import Footer from "../pages/footer.jsx";
import Providerss from "../../styles/providerss.css";
import Swal from "sweetalert2";
import { userActions } from "../store/usuario.js";

const User = () => {
    const [users, setUsers] = useState([
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
    const [storedProfilePictureUrl, setStoredProfilePictureUrl] = useState("");
    const [userInfo, setUserInfo] = useState("");

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
        const fetchProfilePicture = async () => {
            try {
                const response = await userActions().getUserProfilePicture();
                if (Array.isArray(response)) { // Check if response is an array
                    setStoredProfilePictureUrl(response.map((item) => item.ruta));
                } else {
                    console.error("Invalid response data format. Expected an array.");
                }
            } catch (error) {
                console.error("Failed to fetch profile picture:", error);
            }
        };

        fetchProfilePicture();
    }, []);

    const fetchProfilePicture = async () => {
        try {
            const response = await userActions().getUserProfilePicture();
            setStoredProfilePictureUrl(response);
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
            setStoredProfilePictureUrl(storedProfilePictureUrl);
        }
    }, []);

    const fetchUsers = async () => {
        try {
            console.log("Fetching users...");

            const response = await fetch("http://127.0.0.1:3001/api/users", {
                method: "GET",
            });

            console.log("Response status:", response.status);

            if (response.ok) {
                const data = await response.json();
                console.log("Received data:", data);
                if (Array.isArray(data)) {
                    const users = data.map((user) => ({
                        name: user.name,
                        service: user.service,
                        imgUrl: storedProfilePictureUrl,
                        description: user.description,
                    }));
                    console.log("Users:", users);
                    setUsers(users);
                } else {
                    console.error("Invalid response data format. Expected an array.");
                }
            } else {
                console.error("Error fetching users:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    return (
        <>
            <div className="stack">
                <h2 className="title-stack">house sit results...</h2>
                <div className="cartica-stack">
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <TinderCard
                                key={index} // Use the index as the key
                                onSwipe={(dir) => onSwipe(dir)}
                                onCardLeftScreen={() => onCardLeftScreen(user.name)}
                                className="swipe"
                            >
                                <div className="carticas provider-cartas">
                                    <img
                                        src={storedProfilePictureUrl}
                                        alt={user.name}
                                        className="img-fluid pic-card"

                                    />
                                    <h2 className="texto">
                                        {user.name} {/*{provider.service}*/}
                                    </h2>
                                    <p>{user.description}</p>
                                    <button
                                        className="btn btn-transparent booknow"
                                        style={{
                                            backgroundColor: "#a659c8",
                                            color: "#ffffff",
                                            borderRadius: "15px",
                                            fontFamily: "Noto Serif Hebrew, serif",
                                            fontSize: "20px",
                                            width: "30%",
                                            marginTop: "-10px",
                                            marginLeft: "160px",
                                        }}
                                        onClick={handleBookNowClick}
                                    >
                                        Book now!
                                    </button>
                                </div>
                            </TinderCard>
                        ))
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
            </div>
            <div className="container-footer">
                <Footer />
            </div>
        </>
    );
};

export default User;
