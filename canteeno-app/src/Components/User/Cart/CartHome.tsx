import { CartItem } from "./CartItem";

export const CartHome = () => {
  return (
    <>
      <div className="cart-home-container">
        <h2 className="cart-title-name">Food Cart</h2>
        <div className="cart-item-list">
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
      </div>
      <div className="cart-total-container">
        <div className="cart-total-divider">
          <p className="cart-total-text">Total</p>
          <p className="cart-total-price">₹ 300</p>
        </div>
        <button className="cart-total-button">Place Order</button>
      </div>
    </>
  );
};
