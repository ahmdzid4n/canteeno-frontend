import { useState } from "react";
import { Button } from "../Common/Button";

export const OrderListedItems = () => {
  const [showModal, setShowModal] = useState(false);

  const handleMouseEnter = () => setShowModal(true);
  const handleMouseLeave = () => setShowModal(false);
  return (
    <tr>
      <td>1</td>
      <td
        className="hover-order"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Order 1
        {showModal && (
          <div className="order-modal">
            <h4>Ordered Items</h4>
            <ul>
              <li>🍕 Pizza - 2 Qty</li>
              <li>🍔 Burger - 1 Qty</li>
              <li>🥤 Coke - 2 Qty</li>
            </ul>
          </div>
        )}
      </td>
      <td>12/12/2021</td>
      <td>Delivered</td>
      <td>
        <Button value="Edit" />
        <Button value="Delete" />
      </td>
    </tr>
  );
};
