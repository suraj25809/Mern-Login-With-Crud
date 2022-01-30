import React from "react";
import error from "../error.jpg";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center">
      <div className="container m-5">
        <img src={error} className="img-fluid" alt="404" />
        <br />
        <Link to="/viewartist" className="btn btn-warning">
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
