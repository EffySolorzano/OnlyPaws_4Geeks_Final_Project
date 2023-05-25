import React, { useState, useContext } from "react";
import { Context } from "react";

const Uploader = ({ setProfilePictureUrl }) => {
    const [latestProfilePicture, setLatestProfilePicture] = useState("");
    const [files, setFiles] = useState(null);

    const uploadImage = evt => {
        evt.preventDefault();
        if (!files || files.length === 0) {
            console.error("No image selected");
            return;
        }

        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("image", files[0]);

        fetch(`${process.env.BACKEND_URL}/api/upload`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to upload image");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Success!!!!", data);
                // Update the profile picture URL
                setProfilePictureUrl(data.ruta);
            })
            .catch((error) => {
                console.error("ERRORRRRRR!!!", error);
            });
    };


    return (
        <div className="jumbotron">
            <form onSubmit={uploadImage}>
                <input type="file" onChange={e => setFiles(e.target.files)} />
                <button>Upload</button>
            </form>
        </div>
    );

}

export default Uploader;
