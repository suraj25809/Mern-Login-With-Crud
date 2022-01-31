import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// const artistList = [
//   { name: "Artist" },
//   { name: "Singer" },
//   { name: "Composer" },
//   { name: "Lyricist" },
//   { name: "Song Engineer" },
// ];

export const AddArtist = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [artistName, setArtistName] = useState("");
  const [biography, setBiography] = useState("");
  const [artist, setArtist] = useState("");

  const clearFormData = () => {
    document.getElementById("artistForm").reset();
  };
  const handleSubmission = async () => {
    if (
      artistName === "" ||
      selectedFile === "" ||
      biography === "" ||
      artist === ""
    ) {
      return toast.error("Fill All the Fields!!", { theme: "colored" });
    }
    const userInfo = localStorage.getItem("userInfo");
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("artistname", artistName);
    formData.append("biography", biography);
    formData.append("artistroles", artist);
    await axios
      .post(`http://localhost:5000/api/v1/artist`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo}`,
        },
      })
      .then((res) => {
        // console.log(res);
        toast.success(res.data.message, {
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
    clearFormData();
    //console.log(artist);
  };

  return (
    <React.Fragment>
      <div className="m-5">
        <div className="row">
          <div className="offset-2 col-lg-8 border custom-shadow p-5">
            <h4 className="text-center">Create An Artist</h4>
            <p className="text-center">Fill Artist Details</p>
            <div>
              <form encType="multipart/form-data" id="artistForm">
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label">Artist Name</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="artistName"
                      className="form-control"
                      onChange={(e) => setArtistName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label">Cover Image</label>
                  <div className="col-sm-8">
                    <input
                      type="file"
                      name="file"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label">Biography</label>
                  <div className="col-sm-8">
                    <textarea
                      name="biography"
                      className="form-control"
                      onChange={(e) => setBiography(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <label className="col-sm-4 col-form-label">
                  Roles (Select Any One)
                </label>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="artist"
                        name="artist"
                        onChange={(e) => setArtist(e.target.value)}
                      />
                      <label className="form-check-label">Artist</label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-check">
                      <input
                        name="artist"
                        className="form-check-input"
                        type="checkbox"
                        value="singer"
                        onChange={(e) => setArtist(e.target.value)}
                      />
                      <label className="form-check-label">Singer</label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="composer"
                        name="artist"
                        onChange={(e) => setArtist(e.target.value)}
                      />
                      <label className="form-check-label">Composer</label>
                    </div>
                  </div>
                  {/* <div className="col-lg-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="artist"
                      />
                      <label className="form-check-label">Lyricist</label>
                    </div>
                  </div> */}
                  {/* <div className="col-lg-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="artist"
                      />
                      <label className="form-check-label">
                        Voice Over Artist
                      </label>
                    </div>
                  </div> */}
                  {/* <div className="col-lg-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="artist"
                      />
                      <label className="form-check-label">Song Engineer</label>
                    </div>
                  </div> */}
                </div>
                <div className="text-center mt-3">
                  <button
                    type="button"
                    onClick={handleSubmission}
                    className="btn btn-primary mx-3"
                  >
                    Add Artist
                  </button>
                  <Link to={"/viewartist"} className="btn btn-danger px-3">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
