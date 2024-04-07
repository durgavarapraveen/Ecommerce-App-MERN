import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/Auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          `${VITE_BACKEND_URL}/api/v1/auth/adminauth`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet> </Outlet> : <Spinner path="" />;
}

export default AdminRoute;
