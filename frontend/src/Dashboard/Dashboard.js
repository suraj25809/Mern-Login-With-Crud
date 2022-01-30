/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AddArtist } from "../Pages/AddArtist";
import { ViewArtist } from "../Pages/ViewArtist";

const Dashboard = () => {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2 px-0">
              <Sidebar />
            </div>
            <div className="col-lg-10">
              <Route path="/addartist" component={AddArtist} />
              <Route path="/viewartist" component={ViewArtist} />
            </div>
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
};

export default Dashboard;
