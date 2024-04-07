import React, { useEffect, useState } from "react";
import Layoyt from "../components/layout/Layoyt";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/CategoryProductStyles.css";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function CategoryProducts() {
  const naviagte = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const GetTotal = async () => {
    try {
      const { data } = await axios.get(
        `${VITE_BACKEND_URL}/api/v1/product/product-count`
      );
      setTotal(data?.productCount);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting Category ");
    }
  };

  useEffect(() => {
    GetTotal();
  }, []);

  const LoadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${VITE_BACKEND_URL}/api/v1/product/product-per-page/${page}`
      );
      setLoading(false);
      if (data?.success) {
        setProducts([...products, ...data.products]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Something went wrong in getting Category ");
    }
  };

  useEffect(() => {
    if (page > 1) {
      LoadMore();
    }
  }, [page]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${VITE_BACKEND_URL}/api/v1/product//category-product/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, [params.slug]);

  return (
    <Layoyt>
      <div className="container mt-3 category">
        <h2 className="text-center">Category - {category.name}</h2>
        <h6 className="text-center">{products.length} result found </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <h1>Products</h1>
            <div className="d-flex flex-wrap">
              {products.map((products) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${VITE_BACKEND_URL}/api/v1/product/get-photo-product/${products._id}`}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{products.name}</h5>
                      <h5 className="card-title card-price">
                        {products.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h5>
                    </div>
                    <p className="card-text ">
                      {products.description.substring(0, 60)}...
                    </p>
                    <div className="card-name-price">
                      <button
                        className="btn btn-info m-1"
                        onClick={() => naviagte(`/product/${products.slug}`)}
                      >
                        More Details
                      </button>
                      {/* <button class="btn btn-secondary m-1">Add to Cart</button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault(), setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layoyt>
  );
}

export default CategoryProducts;
