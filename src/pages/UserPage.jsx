import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export const UserPage = () => {
  const userData = useSelector((state) => state.auth.data);
  const [t, i18n] = useTranslation("global");

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
                  {t("profilePage.changeBtn")}
                </Link>
              </p>
              <p>
                <Link to="/orderHistory" className="change-button">
                  {t("profilePage.orderBtn")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
