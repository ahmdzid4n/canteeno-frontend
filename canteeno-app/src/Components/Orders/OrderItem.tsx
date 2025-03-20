import { useEffect, useState } from "react";
import { Button } from "../Common/Button";
import axiosInstance from "../../Utils/axiosConfig";
import { useDispatch } from "react-redux";
import { setErrorMessage } from "../../Common/Slices/ErrorMessage";
import DropdownList from "../Common/DropdownList";

export type OrderItemType = {
  orderItemId: number;
  itemId: number;
  itemName: string;
  quantity: number;
  price: number;
};

export type OrderType = {
  orderId: number;
  orderNo: string;
  userId: number;
  amount: number;
  qrCodeUrl: string;
  orderStatus: "PENDING" | "COMPLETED" | "CANCELLED"; // Add more statuses if required
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItemType[];
};

export const OrderItem = () => {
  const dispatch = useDispatch();
  const [expandedOrder, setExpandedOrder] = useState(0);
  const [orderList, setOrderList] = useState<OrderType[]>([]);
  const [orderStatus, setOrderStatus] = useState<{ id: number; label: string }>(
    { id: 0, label: "All Orders" }
  );

  const toggleOrderItems = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? 0 : orderId);
  };

  const orderStatusList = [
    { id: 0, label: "All Orders" },
    { id: 1, label: "Pending" },
    { id: 2, label: "Completed" },
    { id: 3, label: "Cancelled" },
  ];

  const getOrderItems = () => {
    axiosInstance.get("http://localhost:8080/api/order/list").then((res) => {
      if (res.status === 200 && !res.data.errorCode) {
        setOrderList(res.data || []);
      } else {
        dispatch(setErrorMessage(res.data.message));
      }
    });
  };

  const handleUpdateOrderStatus = (status: { id: number; label: string }) => {
    if (status.id === 0) {
      getOrderItems();
      return;
    }
    setOrderStatus(status);
    axiosInstance
      .get(
        `http://localhost:8080/api/order/status/${status.label.toUpperCase()}`
      )
      .then((res) => {
        if (res.status === 200 && !res.data.errorCode) {
          setOrderList(res.data || []);
        } else {
          dispatch(setErrorMessage(res.data.message));
        }
      });
  };

  useEffect(() => {
    getOrderItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateStatus = (orderId: number) => {
    if (orderStatus.id !== 0) {
      return;
    }
    axiosInstance
      .put(`http://localhost:8080/api/order/${orderId}/update-payment-status`, {
        paymentStatus: "COMPLETED",
      })
      .then((res) => {
        if (res.status === 200 && !res.data.errorCode) {
          getOrderItems();
        } else {
          dispatch(setErrorMessage(res.data.message));
        }
      });
  };

  const handleCancelOrder = (orderId: number) => {
    axiosInstance
      .delete(`http://localhost:8080/api/order/${orderId}/cancel`)
      .then((res) => {
        if (res.status === 204 && !res.data.errorCode) {
          getOrderItems();
        } else {
          dispatch(setErrorMessage(res.data.message));
        }
      });
  };

  return (
    <div className="order-item-container">
      <div className="order-home-title">
        <h2>Orders</h2>
      </div>
      <DropdownList
        onSelect={(orderStatus: { id: number; label: string }) =>
          handleUpdateOrderStatus(orderStatus)
        }
        options={orderStatusList}
        hideSearch
        value={orderStatus.id}
      />
      <div className="admin-content-display-section">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>ORDER NO.</th>
              <th>DATE</th>
              <th>PRICE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {orderList?.map((order, index) => (
              <>
                <tr key={order.orderId}>
                  <td>{index + 1}</td>
                  <td
                    className="hover-order"
                    onClick={() => toggleOrderItems(order.orderId)}
                    style={{ cursor: "pointer" }}
                  >
                    {order.orderNo}
                  </td>
                  <td>{order.createdAt}</td>
                  <td>₹{order.amount}</td>
                  <td>
                    <Button
                      value={order.orderStatus}
                      onClick={() => handleUpdateStatus(order.orderId)}
                      className={`order-status-button-${order.orderStatus.toLowerCase()}`}
                    />
                    {order.orderStatus === "PENDING" && (
                      <Button
                        value="Cancel"
                        onClick={() => handleCancelOrder(order.orderId)}
                        className="order-status-button-cancel"
                      />
                    )}
                  </td>
                </tr>
                {expandedOrder === order.orderId && (
                  <tr className="order-details-row">
                    <td colSpan={2}></td>
                    <td colSpan={2}>
                      <tr key={index}>
                        {order.orderItems.map((orderItem, index) => (
                          <td key={index}>
                            {orderItem.itemName} - {orderItem.quantity} Qty
                          </td>
                        ))}
                      </tr>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
