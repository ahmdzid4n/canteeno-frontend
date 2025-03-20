import { NavLink, useNavigate } from "react-router";
import { CartItem } from "./CartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { persistor, RootState } from "../../../Common/Slices/Store";
import { useEffect } from "react";
import axiosInstance from "../../../Utils/axiosConfig";
import { useDispatch } from "react-redux";
import { setErrorMessage } from "../../../Common/Slices/ErrorMessage";

// Extend the Window interface to include Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

export const CartHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartData = useSelector((state: RootState) => state.cart.cart);
  const userData = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (cartData?.cartItems.length === 0) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData]);

  const handlePlaceOrder = async () => {
    const { data } = await axiosInstance.post(
      `http://localhost:8080/api/cart/${cartData?.userId}/checkout`
    );

    interface RazorpayOptions {
      key: string;
      amount: number;
      currency: string;
      name: string;
      description: string;
      order_id: string;
      handler: (response: RazorpayResponse) => Promise<void>;
      prefill: RazorpayPrefill;
      theme: RazorpayTheme;
    }

    interface RazorpayResponse {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    }

    interface RazorpayPrefill {
      name: string;
      email: string;
      contact: string;
    }

    interface RazorpayTheme {
      color: string;
    }

    const options: RazorpayOptions = {
      key: process.env.REACT_APP_RAZORPAY_KEY || "",
      amount: data.amount,
      currency: "INR",
      name: "Canteeno",
      description: "Serving Cravings, One Click Away!",
      order_id: data.razorPayOrderId,
      handler: async (response: RazorpayResponse) => {
        const orderResponse = await axiosInstance.post(
          "http://localhost:8080/api/order/payment/verify",
          {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            canteeno_order_id: data?.canteenoOrderId, // Add canteenoId from cartData
          }
        );

        if (orderResponse.status === 200 && !orderResponse.data.errorCode) {
          console.log(orderResponse);
          persistor.purge();
          navigate(`/order-success/${orderResponse.data.orderId}`);
        } else {
          dispatch(setErrorMessage(orderResponse.data.message));
        }
      },
      prefill: {
        name: userData.name, // Replace with user's name
        email: userData.email, // Replace with user's email
        contact: userData.phoneNumber, // Replace with user's contact number
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    // axiosInstance
    //   .post(`http://localhost:8080/api/cart/${cartData?.userId}/checkout`)
    //   .then((res) => {
    //     if (res.status === 200 && !res.data.errorCode) {
    //       console.log(res);
    //       persistor.purge();
    //       navigate(`/order-success/${res.data.orderId}`);
    //     } else {
    //       dispatch(setErrorMessage(res.data.message));
    //     }
    //   });
  };

  return (
    <>
      <div className="header-container">
        <NavLink to="/">
          <FontAwesomeIcon icon={faLeftLong} className="back-button" />
        </NavLink>
      </div>
      <div className="cart-home-container">
        <h2 className="cart-title-name">Food Cart</h2>
        <div className="cart-item-list">
          {cartData?.cartItems.map((item, index) => (
            <CartItem item={item} key={index} />
          ))}
        </div>
      </div>
      <div className="cart-total-container">
        <div className="cart-total-divider">
          <p className="cart-total-text">Total</p>
          <p className="cart-total-price">₹ {cartData?.totalPrice}</p>
        </div>
        <button className="cart-total-button" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </>
  );
};
