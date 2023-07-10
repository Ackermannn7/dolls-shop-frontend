import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderHistory } from "../../redux/slices/order";
import { Link } from "react-router-dom";
import "../../scss/pages/orderHistory.scss";
import { useTranslation } from "react-i18next";

export const OrderHistory = () => {
  const [t, i18n] = useTranslation("global");

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const order = useSelector((state) => state.order.data);

  React.useEffect(() => {
    if (userData) {
      dispatch(fetchOrderHistory(userData._id));
    }
  }, [dispatch, userData]);

  return (
    <div className="content">
      <div className="section_header">
        <h3>{t("orderHistoryPage.title")}</h3>
      </div>
      {order && Array.isArray(order) && order.length > 0 ? (
        <div className="history-page">
          <h4>
            {t("orderHistoryPage.orders")} {`(${order?.length})`}
          </h4>

          <table>
            <thead>
              <tr>
                <th>{t("orderHistoryPage.orderID")}</th>
                <th>{t("orderHistoryPage.purchaseDate")}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {order.map((items) => (
                <tr key={items._id}>
                  <td>{items._id}</td>
                  <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/order/${items._id}`}>
                      {t("orderHistoryPage.viewBtn")}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-orders-msg">
          <p>{t("orderHistoryPage.noOrderAvaiable")}</p>
        </div>
      )}
    </div>
  );
};
