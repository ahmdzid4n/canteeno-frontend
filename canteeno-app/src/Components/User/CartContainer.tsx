import { useState } from "react";

type CartContainerProps = {
  className?: string;
  qty?: number;
};

export const CartContainer = ({ className, qty }: CartContainerProps) => {
  const [quantity, setQuantity] = useState(qty || 0);
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  if (quantity === 0) {
    return (
      <div className={`cart-container ${className}`}>
        <button className="cart-first-button" onClick={handleIncrement}>
          ADD
        </button>
      </div>
    );
  }
  return (
    <div className={`cart-container is-selected ${className}`}>
      <button onClick={handleDecrement}>-</button>
      <span>{quantity}</span>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};
