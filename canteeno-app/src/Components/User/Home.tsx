import { NavLink } from "react-router";
import "../../Assets/Css/Home.scss";
import { CartButton } from "./CartButton";
import { ItemContainer } from "./ItemContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faUser } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../Utils/axiosConfig";
import { useEffect, useState } from "react";
import { ItemResponseType } from "../../Types/APITypes";
import { useSelector } from "react-redux";
import { RootState } from "../../Common/Slices/Store";
import { useDispatch } from "react-redux";
import { setCart } from "../../Common/Slices/CartSlice";
import { setErrorMessage } from "../../Common/Slices/ErrorMessage";

export type ItemStockType = {
  availableQuantity: number;
  isUnlimited: boolean;
  itemId: number;
  lastUpdatedAt?: string;
  reservedQuantity: number;
  totalQuantity: number;
};

export type GroupedItem = {
  itemId: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  veg: boolean;
  imageUrls: string[];
  store: {
    storeId: number;
    name: string;
    location: string;
  };
  createdAt: string;
  updatedAt: string;
  itemStock?: ItemStockType;
};

type CategorizedItems = {
  [categoryName: string]: GroupedItem[];
};

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user);
  const [itemList, setItemList] = useState<CategorizedItems[]>([]);
  const cartItems = useSelector(
    (state: RootState) => state.cart.cart?.cartItems || []
  );
  //const [storeName, setStoreName] = useState("");

  const groupItemsByCategory = (items: ItemResponseType[]) => {
    let categorizedItems: CategorizedItems = {};

    items.forEach((item) => {
      item.categories.forEach((category) => {
        if (!categorizedItems[category.name]) {
          categorizedItems[category.name] = [];
        }
        //setStoreName(item.store.name);

        categorizedItems[category.name].push({
          itemId: item.itemId,
          name: item.name,
          description: item.description,
          price: item.price,
          available: item.available,
          imageUrls: item.imageUrls,
          store: item.store,
          itemStock: item.itemStock,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          veg: item.veg,
        });
      });
    });

    return categorizedItems;
  };

  useEffect(() => {
    const getItemList = () => {
      axiosInstance
        .get("http://localhost:8080/api/catalog/item")
        .then((res) => {
          if (res.status === 200 && !res.data.errorCode) {
            setItemList([groupItemsByCategory(res.data)]);
          } else {
            dispatch(setErrorMessage(res.data.message));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getCartList = () => {
      axiosInstance
        .get(`http://localhost:8080/api/cart/${userData.userId}`)
        .then((res) => {
          console.log(res);
          if (res.status === 200 && !res.data.errorCode) {
            dispatch(setCart(res.data));
          } else {
            // dispatch(setErrorMessage(res.data.message));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getItemList();
    getCartList();
  }, [dispatch, userData.userId]);

  return (
    <div className="home-container">
      <span className="home-container-span">
        <h1 className="site-title-name">
          Canteeno
          {/*<span className="site-title-store-name">{storeName}</span>*/}
        </h1>
        <NavLink to={"/user"} className="site-profie">
          <FontAwesomeIcon icon={faUser} /> {} {userData.name}
        </NavLink>
      </span>
      <div className="image-slider-container"></div>
      <div className="menu-container">
        {Object.keys(itemList[0] || {}).map((key, index) => (
          <>
            <h2 className="menu-title-name" key={index}>
              <FontAwesomeIcon icon={faTag} /> {key}
            </h2>
            {itemList[0][key].map((item, index2) => (
              <ItemContainer key={index2} item={item} />
            ))}
          </>
        ))}
      </div>
      {cartItems?.length > 0 ? <CartButton /> : null}
    </div>
  );
};
