import React, { useEffect, useState } from "react";
import Layoyt from "../layout/Layoyt";
import UserMenu from "../layout/UserMenu";
import { useAuth } from "../../Context/Auth";
import { toast } from "react-toastify";
import axios from "axios";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Profile() {
  const [auth, setAuth] = useAuth();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    if (
      user.name === "" ||
      user.email === "" ||
      user.phone === "" ||
      user.address === ""
    ) {
      toast.error("All fields are required");
      return;
    }
    e.preventDefault();
    try {
      const res = await axios.put(
        `${VITE_BACKEND_URL}/api/v1/auth/profile`,
        user,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (res.data.success) {
        setAuth({ ...auth, user: res.data.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = res.data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const { name, email, phone, address } = auth.user;
    setUser({ name, email, phone, address });
  }, [auth.user]);

  return (
    <Layoyt className={"Profile - Ecommerce App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-100 p-3 form-container">
              <form>
                <h2 className="title">User Profile</h2>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputName"
                    placeholder="Enter Your Name"
                    value={user.name}
                    onChange={(e) =>
                      setUser((prevUser) => ({
                        ...prevUser,
                        name: e.target.value,
                      }))
                    }
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
                      setUser((prevUser) => ({
                        ...prevUser,
                        email: e.target.value,
                      }))
                    }
                    disabled
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
                      setUser((prevUser) => ({
                        ...prevUser,
                        phone: e.target.value,
                      }))
                    }
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
                  />
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn btn-primary"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layoyt>
  );
}

export default Profile;
