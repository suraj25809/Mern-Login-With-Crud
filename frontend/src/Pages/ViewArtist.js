import React from "react";
import { Link } from "react-router-dom";

export const ViewArtist = () => {
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
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};
