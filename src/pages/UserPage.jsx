import React from "react";
import axios from "../axios";
import "../scss/pages/userPage.scss";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";

export const UserPage = () => {
  const userData = useSelector((state) => state.auth.data);

  console.log(userData);
  return (
    <div className="user-page">
      <div className="user">
        {userData?.avatarUrl ? (
          <Avatar
            sx={{ width: 200, height: 200, marginBottom: 0.5 }}
            src={userData.avatarUrl}
          />
        ) : (
          <Avatar sx={{ width: 200, height: 200, marginBottom: 0.5 }} />
        )}
        <div className="user-info">
          <h2 className="user-fullName">{userData?.fullName}</h2>
          <p className="user-email">Email: {userData?.email}</p>
          <div className="profile-buttons">
            <p>
              <Link to="/changeProfile" className="change-button">
                Change Profile
              </Link>
            </p>
            <p>
              <Link to="/orderHistory" className="change-button">
                Order History
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
