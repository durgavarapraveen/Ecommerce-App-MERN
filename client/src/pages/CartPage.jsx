import React, { useEffect, useState } from "react";
import Layoyt from "../components/layout/Layoyt";
import { useCart } from "../Context/Cart";
import { useAuth } from "../Context/Auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/CartStyles.css";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientToken, setClientToken] = useState("");

  const totalPrice = () => {
    try {
      let total = 0;
      cart.map((c) => {
        total += c.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let existingCart = JSON.parse(localStorage.getItem("cart"));
    if (existingCart) {
      setCart(existingCart);
    }
  }, []);

  const removeCartItem = (id) => {
    try {
      let mycart = [...cart];
      let index = mycart.findIndex((c) => c._id === id);
      mycart.splice(index, 1);
      setCart(mycart);
      localStorage.setItem("cart", JSON.stringify(mycart));
    } catch (error) {
      console.error(error);
    }
  };

  const getPaymentToken = async () => {
    try {
      const { data } = await axios.get(
        `${VITE_BACKEND_URL}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPaymentToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${VITE_BACKEND_URL}/api/v1/product/braintree/payment`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Success");
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Payment Failed");
    }
  };

  return (
    <Layoyt>
      <div className="cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 b-1">
              {`Hello ${auth?.token && auth?.user?.name} `}
            </h1>
            <h4 className="text-center ">
              {cart?.length > 0
                ? `You Have ${cart?.length} Products in Cart ${
                    auth?.token ? "" : "Please Login to Checkout"
                  }`
                : `Your Cart is Empty`}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7 p-0 m-0">
            {cart.map((c) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`${VITE_BACKEND_URL}/api/v1/product/get-photo-product/${c._id}`}
                    alt={c?.name}
                    className="card-img-top"
                    width="100%"
                    height={"130px"}
                  />
                </div>
                <div className="col-md-4">
                  <h4>{c?.name}</h4>
                  <p>{c?.description.substring(0, 30)}</p>
                  <p>Price : {c?.price}</p>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-5 cart-summary">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Login to Checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || cart?.length == 0 ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={
                      !clientToken ||
                      loading ||
                      !instance ||
                      !auth?.user?.address
                    }
                  >
                    {loading ? "Processing..." : "Pay Now"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layoyt>
  );
}

export default CartPage;
