import React, { useEffect, useState } from "react";
import Layoyt from "../../components/layout/Layoyt";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function ForgotPassword() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    question: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${VITE_BACKEND_URL}/api/v1/auth/forgot-password`,
        user
      );
      if (res.data.success) {
        console.log(res.data.message);
        toast.success(res.data.message);
        navigate("/login");
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
              type="text"
              className="form-control"
              id="exampleInputquestion"
              placeholder="Who is your Favorite Player ?"
              value={user.question}
              onChange={(e) =>
                setUser((prevUser) => ({
                  ...prevUser,
                  question: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your New Password"
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
              onClick={() => navigate("/login")}
              className="btn btn-primary bg-white text-black w-100 border-0 text-end text-decoration-underline hover:none"
            >
              login ?
            </p>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
      <Toaster />
    </Layoyt>
  );
}

export default ForgotPassword;
