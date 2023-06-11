import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderHistory } from "../../redux/slices/order";
import { Link } from "react-router-dom";
import "../../scss/pages/orderHistory.scss";

export const OrderHistory = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const order = useSelector((state) => state.order.data);

  React.useEffect(() => {
    if (userData) {
      dispatch(fetchOrderHistory(userData._id));
    }
  }, [dispatch, userData]);

  return (
    <>
      <div className="recommended__header">
        <div className="section_header">
          <h3>Order History</h3>
        </div>
      </div>
      {order && Array.isArray(order) && order.length > 0 ? (
        <div className="history-page">
          <h4>You have {order?.length} ordered</h4>

          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date of Purchased</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {order.map((items) => (
                <tr key={items._id}>
                  <td>{items._id}</td>
                  <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/order/${items._id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <p>No order history available.</p>
        </div>
      )}
    </>
  );
};
