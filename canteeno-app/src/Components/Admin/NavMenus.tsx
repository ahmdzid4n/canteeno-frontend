import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useLocation, useNavigate } from "react-router";
import { persistor } from "../../Common/Slices/Store";

export const NavMenus = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("userToken");
    persistor.purge();
    navigate("/login");
  };

  const getActiveClass = (path: string) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <div className="admin-nav-menu-list">
      <NavLink to="/admin/orders" className={getActiveClass("/admin/orders")}>
        Orders
      </NavLink>
      <NavLink
        to="/admin/addStore"
        className={getActiveClass("/admin/addStore")}
      >
        Store
      </NavLink>
      <NavLink
        to="/admin/addCategories"
        className={getActiveClass("/admin/addCategories")}
      >
        Categories
      </NavLink>
      <NavLink
        to="/admin/addItems"
        className={getActiveClass("/admin/addItems")}
      >
        Items
      </NavLink>
      <NavLink
        to="/admin/addStock"
        className={getActiveClass("/admin/addStock")}
      >
        Stock
      </NavLink>
      <button className="logout-button" onClick={handleLogout}>
        <FontAwesomeIcon icon="face-clouds" />
        Logout
      </button>
    </div>
  );
};
