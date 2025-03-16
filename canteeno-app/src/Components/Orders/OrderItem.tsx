import { useState } from "react";
import { Button } from "../Common/Button";
import { OrderListedItems } from "./OrderListedItems";

export const OrderItem = () => {
  return (
    <div className="order-item-container">
      <div className="admin-content-display-section">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Order</th>
              <th>Order Date</th>
              <th>Order Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <OrderListedItems />
            <OrderListedItems />
            <OrderListedItems />
            <OrderListedItems />
          </tbody>
        </table>
      </div>
    </div>
  );
};
