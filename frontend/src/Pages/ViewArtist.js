import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const ViewArtist = () => {
  const [artist, setArtist] = useState([]);

  const userInfo = localStorage.getItem("userInfo");
  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  useEffect(() => {
    getArtist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getArtist = async () => {
    axios
      .get("http://localhost:5000/api/v1/artist", config)
      .then((res) => {
        console.log(res.data);
        setArtist(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <React.Fragment>
      <div className="m-5">
        <div className="float-end mb-3">
          <Link to="addartist" className="btn btn-warning">
            Add Artist
          </Link>
        </div>
        <table className="table table-reponsive">
          <thead className="bg-dark text-white">
            <tr>
              <th scope="col">Cover Image</th>
              <th scope="col">Artist Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              artist.map((data) => (
                <tr key={data._id}>
                  <td>
                    <img src="../../../uploads/{{data.image}}" alt="artist" />{" "}
                    {data.id}
                  </td>
                  <td>{data.artistname}</td>
                  <td>Action</td>
                </tr>
              ))

              // onClick={() => deleteData(data.id)}
            }
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};
