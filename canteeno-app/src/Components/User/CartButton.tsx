import { useNavigate } from "react-router";
import cartImage from "../../Assets/Images/cart-icon.svg";
export const CartButton = () => {
  const navigate = useNavigate();
  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <div className="cart-button-container" onClick={handleCartClick}>
      <img src={cartImage} alt="cart-image" />
      <span>GO TO CART</span>
    </div>
  );
};
