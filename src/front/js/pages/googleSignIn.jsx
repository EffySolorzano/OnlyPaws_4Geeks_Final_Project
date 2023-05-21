import React, { useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Google = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate(); // Add the useNavigate hook

    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;
        navigate("/login");
    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: "331353560025-vremdlrldn6kgqj9d6csujq1j3abqoq5.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        );

        google.accounts.id.prompt();
    }, []);

    return (
        <div>
            <div id="signInDiv"></div>
            {user && (
                <div>
                    <img src={user.picture} />
                    <h3>{user.name}</h3>
                </div>
            )}
        </div>
    );
};

export default Google;
