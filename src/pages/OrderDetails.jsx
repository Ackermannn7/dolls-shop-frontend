import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";

// import MapContainer from "../components/MapContainer";

export const OrderDetails = () => {
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
      });
  }, [id]);
  console.log(data);
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
      <div className="recommended__header">
        <div className="section_header">
          <h3>Order Details</h3>
        </div>
      </div>
      <table className="order-details">
        <thead>
          <tr>
            <th></th>
            <th>Doll</th>
            <th>Quantity</th>
            <th>Price $</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item._id}>
              <td>
                <img
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
      <div className="recommended__header">
        <div className="section_header">
          <h3>Delivery Details</h3>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            {/* <th>Map Location</th> */}
            <th>Customer</th>
            <th>Phone Number</th>
            <th>Region</th>
            <th>City</th>
            <th>Postal Branch</th>
          </tr>
        </thead>
        <tbody className="delivery-details">
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
      <div className="bottom-details">
        <span>
          {" "}
          Total quantity: <b>{totalQuantity}</b>{" "}
        </span>
        <span>
          {" "}
          Total Price: <b>{totalPrice.toFixed(2)}$</b>{" "}
        </span>
      </div>
    </div>
  );
};
