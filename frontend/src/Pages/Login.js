/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const loginFormHandler = (event) => {
    // console.log(event);
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const loginNow = () => {
    const { email, password } = user;
    if (email === "" || password === "") {
      return toast.error("Fill All Details", { theme: "colored" });
    }
    axios
      .post("http://localhost:5000/api/v1/user/login", user)
      .then((res) => {
        localStorage.setItem("userInfo", res.data.token);
        history.push("/viewartist");
        toast.success("Login Successfully!!", {
          theme: "colored",
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, { theme: "colored" });
      });
  };

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
                    name="email"
                    value={user.email}
                    type="email"
                    className="form-control"
                    placeholder="Enter Email Address"
                    onChange={loginFormHandler}
                  />
                </div>
                <div className="mb-4">
                  <input
                    name="password"
                    value={user.password}
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    onChange={loginFormHandler}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  onClick={loginNow}
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
