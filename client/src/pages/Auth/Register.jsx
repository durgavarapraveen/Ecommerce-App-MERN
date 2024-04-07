import React, { useState } from "react";
import Layoyt from "../../components/layout/Layoyt";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    question: "",
  });

  const handleSubmit = async (e) => {
    if(user.name === "" || user.email === "" || user.password === "" || user.phone === "" || user.address === "") { 
      toast.error("All fields are required");
      return;
    }
    e.preventDefault();
    try {
      const res = await axios.post(
        `${VITE_BACKEND_URL}/api/v1/auth/register`,
        user
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layoyt title={"Register - Ecommerce App"}>
      <div className="form-container">
        <form>
          <h2 className="title">Register Form</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Your Name"
              value={user.name}
              onChange={(e) =>
                setUser((prevUser) => ({ ...prevUser, name: e.target.value }))
              }
              required
            />
          </div>

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
            <input
              type="tel"
              className="form-control"
              id="exampleInputphone"
              placeholder="Enter Your Phone Number"
              pattern="[0-9]{10}"
              value={user.phone}
              onChange={(e) =>
                setUser((prevUser) => ({ ...prevUser, phone: e.target.value }))
              }
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter Your Address"
              value={user.address}
              onChange={(e) =>
                setUser((prevUser) => ({
                  ...prevUser,
                  address: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
              placeholder="Who is your favorite Player?"
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

          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </Layoyt>
  );
}

export default Register;
