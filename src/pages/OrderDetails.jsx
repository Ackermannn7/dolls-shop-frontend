import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";

export const OrderDetails = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const totalQuantity = data?.items.length;
  const totalPrice = data?.total;
  console.log(totalQuantity);
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
  console.log(data?.total);
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
    <div className="container history-page">
      <div className="recommended__header">
        <div className="section_header">
          <h3>Order Details</h3>
        </div>
      </div>
      <table>
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
