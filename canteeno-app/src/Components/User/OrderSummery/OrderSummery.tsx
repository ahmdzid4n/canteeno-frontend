import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QRCodeCanvas } from "qrcode.react";
import { NavLink, useParams } from "react-router";
import { Button } from "../../Common/Button";
import { useEffect, useState } from "react";
import { OrderType } from "../../Orders/OrderItem";
import axiosInstance from "../../../Utils/axiosConfig";
import { useDispatch } from "react-redux";
import { setErrorMessage } from "../../../Common/Slices/ErrorMessage";

export const OrderSummery = () => {
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState<OrderType>();
  const { orderId } = useParams<{ orderId: string }>();

  const getOrderById = () => {
    // API call to fetch order by ID
    axiosInstance
      .get(`http://localhost:8080/api/order/${orderId}`)
      .then((response) => {
        if (response.status === 200 && !response.data.errorCode) {
          setOrderData(response.data);
        } else {
          dispatch(setErrorMessage(response.data.message));
        }
      });
  };

  useEffect(() => {
    getOrderById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancelOrder = () => {
    // API call to cancel order
    axiosInstance
      .delete(`http://localhost:8080/api/order/${orderData?.orderId}/cancel`)
      .then((response) => {
        if (response.status === 200 && !response.data.errorCode) {
          setOrderData(response.data);
        } else {
          dispatch(setErrorMessage(response.data.message));
        }
      });
  };

  return (
    <>
      <div className="header-container">
        <NavLink to="/user">
          <FontAwesomeIcon icon={faLeftLong} className="back-button" />
        </NavLink>
      </div>
      <div className="order-summery">
        <h1 className="order-summery__title">Order Summery</h1>
        <div className="order-summery__id">
          <p>#{orderData?.orderNo}</p>
        </div>
        <div className="order-summery__details">
          <div>
            <div className="order-summery__qr-code">
              <QRCodeCanvas
                value={orderData?.orderId?.toString() || ""}
                size={150}
              />
            </div>
            <div className="order-summery__items">
              <ul className="order-summery__items-list">
                {orderData?.orderItems?.map((orderItem, orderIndex) => (
                  <li className="order-summery__item" key={orderIndex}>
                    <span className="order-summery__item-name">
                      <span className="order-summery__item-quantity">
                        {orderItem.quantity}x
                      </span>
                      {orderItem.itemName}
                    </span>
                    <span className="order-summery__item-price">
                      ₹{orderItem.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="order-summery__total">
              <div className="order-summery__total-label">Total</div>
              <div className="order-summery__total-amount">
                ₹{orderData?.amount}
              </div>
            </div>
            {orderData?.orderStatus === "PENDING" && (
              <Button
                className="order-cancel-button"
                value="Cancel Order"
                onClick={handleCancelOrder}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
