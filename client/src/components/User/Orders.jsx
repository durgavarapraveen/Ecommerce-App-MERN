import React, { useEffect, useState } from "react";
import Layoyt from "../layout/Layoyt";
import UserMenu from "../layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../Context/Auth";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Orders() {
  const [orders, setOrders] = useState([]);
  const auth = useAuth();

  const getOrders = async () => {
    try {
      const res = await axios.get(
        `${VITE_BACKEND_URL}/api/v1/auth/allorders`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Layoyt title={"Orders - Ecommerce App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h1>Orders</h1>
            </div>
          </div>
        </div>
      </div>
    </Layoyt>
  );
}

export default Orders;
