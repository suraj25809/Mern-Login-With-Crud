/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    useremail: "",
    phone: "",
    password: "",
  });

  const registerFormHandler = (event) => {
    // console.log(event);
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const registerNow = () => {
    const { username, useremail, phone, password } = user;
    if (
      username === "" ||
      useremail === "" ||
      phone === "" ||
      password === ""
    ) {
      return toast.error("Fill All Details", { theme: "colored" });
    } else if (phone.length < 10) {
      return toast.error("Enter 10 Digit Valid Phone Number", {
        theme: "colored",
      });
    }

    axios
      .post("http://localhost:5000/api/v1/user/register", user)
      .then((res) => {
        // console.log(res.data.message);
        toast.success(res.data.message, {
          theme: "colored",
        });
      })
      .catch((err) => {
        // console.error(err.response.data.message);
        toast.error(err.response.data.message, { theme: "colored" });
      });
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="offset-4 col-lg-4 p-5 custom-shadow">
            <h4 className="text-center">Regsiter</h4>
            <p className="text-center">Register to Access Dashboard</p>
            <div className="my-5">
              <form>
                {/* { console.log("User", user)} */}
                <div className="mb-4">
                  <input
                    name="username"
                    value={user.username}
                    type="text"
                    className="form-control"
                    placeholder="Enter Full Name"
                    onChange={registerFormHandler}
                  />
                </div>
                <div className="mb-4">
                  <input
                    name="useremail"
                    value={user.useremail}
                    type="email"
                    className="form-control"
                    placeholder="Enter Email Address"
                    onChange={registerFormHandler}
                  />
                </div>
                <div className="mb-4">
                  <input
                    name="phone"
                    value={user.phone}
                    type="number"
                    className="form-control"
                    placeholder="Enter Phone Number"
                    onChange={registerFormHandler}
                  />
                </div>
                <div className="mb-4">
                  <input
                    name="password"
                    value={user.password}
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    onChange={registerFormHandler}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  onClick={registerNow}
                >
                  Register Now
                </button>
                <div className="text-center">
                  <p className="mt-3 mb-3">
                    Already Have Account&nbsp; &nbsp;
                    <Link to="/"> Sign In?</Link>
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

export default Register;
