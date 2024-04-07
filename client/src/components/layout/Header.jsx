import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
import { toast } from "react-toastify";
import SearchINput from "../Form/SearchINput";
import useCategory from "../../Hooks/useCategory";
import { useCart } from "../../Context/Cart";
import { Badge } from "antd";

function Header() {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart, setCart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.clear();
    toast.success("Logout Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              🛒 Order
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchINput />
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/categories"
                  data-bs-toggle="dropdown"
                >
                  Category
                </Link>
                {categories?.length > 0 && (
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink className="dropdown-item" to="/categories">
                        All Categories
                      </NavLink>
                    </li>
                    {categories?.map((category) => (
                      <li key={category?._id}>
                        <NavLink
                          to={`/category/${category?.slug}`}
                          className="dropdown-item"
                        >
                          {category?.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {auth?.user ? (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      style={{ borderBottom: "0px" }}
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>

                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Regisiter
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              )}

              <li className="nav-item">
                <Badge
                  count={cart?.length}
                  style={{
                    lineHeight: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  offset={[0, 10]}
                  showZero
                >
                  <NavLink
                    to="/cart"
                    className="nav-link "
                    style={{ fontSize: "20px" }}
                  >
                    Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
