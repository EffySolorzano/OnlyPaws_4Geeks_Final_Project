import React, { useState, useContext } from "react";
import { Context } from "react";

const Uploader = () => {

    const [files, setFiles] = useState(null);

    const uploadImage = evt => {
        evt.preventDefault();
        // we are about to send this to the backend.
        console.log("This are the files", files);
        let body = new FormData();
        body.append("image", files[0]);
        const options = {
            body,
            method: "POST"
        };
        // you need to have the user_id in the localStorage
        //const currentUserId = localStorage.getItem("user_id"); //Aquí tienen que colocar el token
        fetch(`${process.env.BACKEND_URL}/api/upload`, options)
            .then(resp => resp.json())
            .then(data => console.log("Success!!!!", data))
            .catch(error => console.error("ERRORRRRRR!!!", error));
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