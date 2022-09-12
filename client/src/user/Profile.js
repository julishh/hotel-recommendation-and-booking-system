import React from "react";
import ProfileNav from "../components/ProfileNav";
import UserInfo from "./UserInfo";
import { Link } from "react-router-dom";
import "../auth/Login.css";
const Profile = () => {
 

  return (
    <>
      <div className="container-fluid navimage p-5 text-center ">
        <h1>my profile</h1>
      </div>

      <div className="row">
        <div className="col-md-7 mt-1">my boookings</div>

        <div className="col-md-5 mt-1">
          <UserInfo />
        </div>
      </div>
    </>
  );
};

export default Profile;
