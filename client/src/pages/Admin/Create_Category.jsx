import React, { useEffect, useState } from "react";
import Layoyt from "../../components/layout/Layoyt";
import axios from "axios";
import { useAuth } from "../../Context/Auth";
import { toast } from "react-toastify";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import AdminMenu from "../../components/layout/AdminMenu";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Create_Category() {
  const [auth] = useAuth();

  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${VITE_BACKEND_URL}/api/v1/category/create-category`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        getAllCategory();
        setName("");
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in Form");
    }
  };

  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        `${VITE_BACKEND_URL}/api/v1/category/get-all-category`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setCategory(res?.data?.categories);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting Category ");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${VITE_BACKEND_URL}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (data.success) {
        toast.success(`${updatedName} is Updated `);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (e, selected) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(
        `${VITE_BACKEND_URL}/api/v1/category/delete-category/${selected._id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (data.success) {
        toast.success(`${selected.name} is Deleted `);
        setSelected(null);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layoyt title={"Create Category - Ecommerce App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {category?.map((category, index) => (
                    <tr key={index}>
                      <td>{category.name}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(category.name);
                            setSelected(category);
                          }}
                        >
                          Edit
                        </button>{" "}
                        <button
                          className="btn btn-danger"
                          onClick={(e) => handleDelete(e, category)}
                        >
                          Delete
                        </button>{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layoyt>
  );
}

export default Create_Category;
