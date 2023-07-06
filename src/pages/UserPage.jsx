import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";

export const UserPage = () => {
  const userData = useSelector((state) => state.auth.data);

  return (
    <div className="content">
      <div className="user-page">
        <div className="user">
          {userData?.avatarUrl ? (
            <Avatar
              sx={{
                width: 200,
                height: 200,
                marginBottom: 0.5,
                "@media (max-width:768px)": {
                  width: "100px",
                  height: "100px",
                },
              }}
              src={userData.avatarUrl}
            />
          ) : (
            <Avatar
              sx={{
                width: 200,
                height: 200,
                marginBottom: 0.5,
                "@media (max-width:768px)": {
                  width: "100px",
                  height: "100px",
                },
              }}
            />
          )}
          <div className="user-info">
            <h2 className="user-fullName">{userData?.fullName}</h2>
            <p className="user-email">Email: {userData?.email}</p>
            <div className="profile-buttons">
              <p>
                <Link to="/edit" className="change-button">
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
    </div>
  );
};
