import { OrderItem } from "./OrderItem";

export const OrderHome = () => {
  return (
    <div className="order-home-container">
      <div className="order-home-title">
        <h2>Orders</h2>
      </div>
      <div className="order-home-list">
        <OrderItem />
      </div>
    </div>
  );
};
