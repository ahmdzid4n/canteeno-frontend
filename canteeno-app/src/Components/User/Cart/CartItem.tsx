import { CartContainer } from "../CartContainer";
import { FoodType } from "../FoodType";

export const CartItem = () => {
  return (
    <div className="cart-item-container">
      <div className="cart-item-name">
        <p>Aloo Paratha </p>
        <FoodType foodType="veg" />
      </div>
      <div className="cart-item-quantity">
        <CartContainer className="cart-container-cart" qty={1} />
        <p className="cart-item-price">₹ 50</p>
      </div>
    </div>
  );
};
