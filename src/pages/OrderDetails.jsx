import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

// import MapContainer from "../components/MapContainer";

export const OrderDetails = () => {
  const [t, i18n] = useTranslation("global");

  const [deviceType, setDeviceType] = React.useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const totalQuantity = data?.items.length;
  const totalPrice = data?.total;
  useEffect(() => {
    axios
      .get(`/order/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error getting order details!");
        toast.error(t("toastify.orderDetailsError"), {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      });
    const getDeviceType = () => {
      const { userAgent } = navigator;

      if (/mobile/i.test(userAgent)) {
        return "mobile";
      } else if (/tablet/i.test(userAgent)) {
        return "tablet";
      } else {
        return "desktop";
      }
    };
    // Set the device type in the state
    setDeviceType(getDeviceType());
  }, [id]);
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          backgroundColor: "#eee",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="content history-page">
      <div className="section_header">
        <h3>{t("orderHistoryPage.orderDetails.title")}</h3>
      </div>
      <table className="order-details">
        <thead>
          <tr>
            <th></th>
            <th>{t("orderHistoryPage.orderDetails.dollName")}</th>
            <th>{t("orderHistoryPage.orderDetails.quantity")}</th>
            <th>{t("orderHistoryPage.orderDetails.price")}</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item._id}>
              <td>
                <img
                  // src={`${process.env.REACT_APP_API_URL}${item.doll.imageUrl}`}
                  src={`http://localhost:4444/${item.doll.imageUrl}`}
                  alt={item.doll.dollName}
                />
              </td>
              <td>{item.doll.dollName}</td>
              <td>{item.quantity}</td>
              <td>{item.doll.price}$</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="section_header">
        <h3>{t("orderHistoryPage.deliveryDetails.title")}</h3>
      </div>
      {deviceType === "mobile" ? (
        <table className="delivery-details">
          <tbody>
            <tr>
              <td>
                <strong>
                  {t("orderHistoryPage.deliveryDetails.customer")}
                </strong>
              </td>
              <td>{data?.formData.orderFullName}</td>
            </tr>
            <tr>
              <td>
                <strong>
                  {t("orderHistoryPage.deliveryDetails.phoneNumber")}
                </strong>
              </td>
              <td>{data?.formData.orderPhoneNumber}</td>
            </tr>
            <tr>
              <td>
                <strong>{t("orderHistoryPage.deliveryDetails.region")}</strong>
              </td>
              <td>{data?.formData.selectedRegion}</td>
            </tr>
            <tr>
              <td>
                <strong>{t("orderHistoryPage.deliveryDetails.city")}</strong>
              </td>
              <td>{data?.formData.selectedCity}</td>
            </tr>
            <tr>
              <td>
                <strong>{t("orderHistoryPage.deliveryDetails.branch")}</strong>
              </td>
              <td>{data?.formData.selectedBranch}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table className="delivery-details">
          <thead>
            <tr>
              {/* <th>Map Location</th> */}
              <th>{t("orderHistoryPage.deliveryDetails.customer")}</th>
              <th>{t("orderHistoryPage.deliveryDetails.phoneNumber")}</th>
              <th>{t("orderHistoryPage.deliveryDetails.region")}</th>
              <th>{t("orderHistoryPage.deliveryDetails.city")}</th>
              <th>{t("orderHistoryPage.deliveryDetails.branch")}</th>
            </tr>
          </thead>
          <tbody>
            <tr key={data?.formData.orderFullName}>
              {/* <td>
              {
                <MapContainer
                  address={`${data?.formData.selectedCity}, ${data?.formData.selectedBranch}`}
                />
              }
            </td> */}
              <td>{data?.formData.orderFullName}</td>
              <td>{data?.formData.orderPhoneNumber}</td>
              <td>{data?.formData.selectedRegion}</td>
              <td>{data?.formData.selectedCity}</td>
              <td>{data?.formData.selectedBranch}</td>
            </tr>
          </tbody>
        </table>
      )}

      <div className="bottom-details">
        <span>
          {" "}
          {t("orderHistoryPage.totalQuantity")} <b>{totalQuantity}</b>{" "}
        </span>
        <span>
          {" "}
          {t("orderHistoryPage.totalPrice")} <b>{totalPrice.toFixed(2)}$</b>{" "}
        </span>
      </div>
    </div>
  );
};
