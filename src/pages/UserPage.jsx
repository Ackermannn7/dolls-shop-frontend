import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../scss/pages/userPage.scss";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

export const UserPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/auth/me");
        setUserData(response.data);
        setLoading(false);
        setError("");
      } catch (err) {
        setError(err.response.data.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log(userData);
  return (
    <div className="user-page">
      <div className="user">
        {userData.avatarUrl ? (
          <Avatar
            sx={{ width: 200, height: 200, marginBottom: 0.5 }}
            src={userData.avatarUrl}
          />
        ) : (
          <Avatar sx={{ width: 200, height: 200, marginBottom: 0.5 }} />
        )}
        <div className="user-info">
          <h2 className="user-fullName">{userData.fullName}</h2>
          <p className="user-email">Email: {userData.email}</p>
          <p>
            <Link to="/changeProfile" className="change-button">
              Change Profile
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
