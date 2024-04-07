import React from "react";
import Layoyt from "../../components/layout/Layoyt";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../Context/Auth";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Login() {
  const navigate = useNavigate();
  const Location = useLocation();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${VITE_BACKEND_URL}/api/v1/auth/login`,
        user
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(Location.state || "/");
        toast.success("Login Success");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layoyt>
      <div className="form-container">
        <form>
          <h2 className="title">Login</h2>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter Your Email"
              value={user.email}
              onChange={(e) =>
                setUser((prevUser) => ({ ...prevUser, email: e.target.value }))
              }
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              value={user.password}
              onChange={(e) =>
                setUser((prevUser) => ({
                  ...prevUser,
                  password: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="mb-3">
            <p
              type="submit"
              onClick={() => navigate("/forgot-password")}
              className="btn btn-primary bg-white text-black w-100 border-0 text-end text-decoration-underline hover:none"
            >
              Forgot Password ?
            </p>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Login
          </button>
        </form>
      </div>
    </Layoyt>
  );
}

export default Login;
