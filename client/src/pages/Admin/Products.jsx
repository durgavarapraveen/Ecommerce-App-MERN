import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layoyt from "../../components/layout/Layoyt";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Products() {
  const [allProducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${VITE_BACKEND_URL}/api/v1/product/get-product`
      );
      if (data.status) {
        setAllProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layoyt>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products List</h1>
            <div className="d-flex w-75">
              {allProducts.map((products) => (
                <Link
                  to={`/dashboard/admin/product/${products.slug}`}
                  style={{ textDecoration: "none" }}
                  key={products._id}
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`${VITE_BACKEND_URL}/api/v1/product/get-photo-product/${products._id}`}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{products.name}</h5>
                      <p className="card-text">{products.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layoyt>
  );
}

export default Products;
