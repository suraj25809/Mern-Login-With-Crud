/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../index.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="offset-4 col-lg-4 p-5 custom-shadow">
            <h4 className="text-center">Login</h4>
            <p className="text-center">Login to Access Dashboard</p>
            <div className="my-5">
              <form>
                <div className="mb-4">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email Address"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                >
                  Login Now
                </button>
                <div className="text-center">
                  <p className="mt-3 mb-2 text-primary">Forgot Password?</p>
                  <p className="mb-3">
                    Create a Account&nbsp; &nbsp;
                    <Link to="/register"> Sign Up Now? </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
