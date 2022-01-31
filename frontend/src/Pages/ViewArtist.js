import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

export const ViewArtist = () => {
  const [artist, setArtist] = useState([]);
  const [show, setShow] = useState(false);
  const [singleArtist, setSingleArtist] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getArtist();
  }, []);

  const getArtist = async () => {
    const userInfo = localStorage.getItem("userInfo");
    await axios({
      method: "get",
      url: `http://localhost:5000/api/v1/artist`,
      withCredentials: false,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    })
      .then((res) => {
        setArtist(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleDelete = async (id) => {
    const userInfo = localStorage.getItem("userInfo");
    await axios({
      method: "delete",
      url: `http://localhost:5000/api/v1/artist/${id}`,
      withCredentials: false,
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
    }).then((res) => {
      toast.success(res.data.message, {
        theme: "colored",
      });
    });
    getArtist();
  };

  const handleView = async (id) => {
    const userInfo = localStorage.getItem("userInfo");
    let artistData = "";
    await axios({
      method: "get",
      url: `http://localhost:5000/api/v1/artist/${id}`,
      withCredentials: false,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    })
      .then((res) => {
        // console.log(res);
        artistData = res.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
    handleShow();
    setSingleArtist(artistData);
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
            {artist.map((data) => (
              <tr key={data._id}>
                <td>
                  <img
                    src="../../../uploads/image_1643538171297_artist4.jpeg"
                    alt="artist"
                  />
                  {data.id}
                </td>
                <td>{data.artistname}</td>
                <td>
                  <div className="d-flex">
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil-square me-3"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                    </p>

                    <p onClick={() => handleView(data._id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-info-square me-3"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                      </svg>
                    </p>

                    <p onClick={() => handleDelete(data._id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash me-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fillRule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="row">
          <div className="col-lg-8">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <p className="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </p>
                </li>
                <li className="page-item active">
                  <p className="page-link">1</p>
                </li>
                <li className="page-item">
                  <p className="page-link">2</p>
                </li>
                <li className="page-item">
                  <p className="page-link">3</p>
                </li>
                <li className="page-item">
                  <p className="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </p>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-lg-4">
            <p className="float-end">10 of 2000 Results</p>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Artist Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Artist Name: {singleArtist.artistname}</p>
          <p>Artist Biography: {singleArtist.biography}</p>
          <p>Artist Role: {singleArtist.artistrole}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
