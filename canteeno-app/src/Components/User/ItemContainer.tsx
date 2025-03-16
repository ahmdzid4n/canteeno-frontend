import { CartContainer } from "./CartContainer";
import defaultImg from "../../Assets/Images/burger.jpg";
import { FoodType } from "./FoodType";

export const ItemContainer = () => {
  return (
    <div className="dish-container">
      <div className="dish-container-sub">
        <h3>Big Mac Double cheese burger</h3>
        <FoodType foodType="veg" />
        <p>&#8377;123</p>
      </div>
      <div className="dish-container-sub">
        <img loading="lazy" src={defaultImg} alt="default-img" />
        <CartContainer className={"cart-container-home"} />
      </div>
    </div>
  );
};
