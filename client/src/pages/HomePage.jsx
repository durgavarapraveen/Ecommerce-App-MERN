import React, { useEffect, useState } from "react";
import Layoyt from "../components/layout/Layoyt";
import { useAuth } from "../Context/Auth";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../Context/Cart";
import "../styles/HomePage.css";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function HomePage() {
  const naviagte = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
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

  //Get All products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${VITE_BACKEND_URL}/api/v1/product//product-per-page/${page}`
      );
      console.log(data);
      setLoading(false);
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllProducts();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${VITE_BACKEND_URL}/api/v1/product/filter-product`,
        {
          checked,
          radio,
        }
      );
      if (data.status) {
        setProducts(data?.products);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting Category ");
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
      setCategories(res?.data?.categories);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting Category ");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleFilter = (c, id) => {
    let newChecked = [...checked];
    if (c) {
      newChecked.push(id);
    } else {
      newChecked = newChecked.filter((i) => i !== id);
    }
    setChecked(newChecked);
    getAllProducts(newChecked);
  };

  return (
    <Layoyt title={"ALL PRODUCTS - BEST OFFERS"}>
      <img
        src="https://github.com/techinfo-youtube/ecommerce-app-2023/blob/15-admin-orders-css/client/public/images/banner.png?raw=true"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-2 filters">
          <h5 className="text-center">Filter By Category</h5>
          <div className="d-flex flex-column px-3">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                className="font-ectrabold"
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h5 className="text-center mt-4">Filter By Price</h5>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices.map((p) => (
                <div key={p._id}>
                  <Radio value={p.Array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column px-2">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Reset Filter
            </button>
          </div>
        </div>

        <div className="col-md-10">
          <h1 className="text-center">All Products</h1>
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
                      class="btn btn-primary m-1"
                      onClick={() => naviagte(`/product/${products.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      class="btn btn-secondary m-1"
                      onClick={() => {
                        setCart([...cart, products]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, products])
                        );
                        toast.success("Product added to cart");
                      }}
                    >
                      Add to Cart
                    </button>
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
    </Layoyt>
  );
}

export default HomePage;
