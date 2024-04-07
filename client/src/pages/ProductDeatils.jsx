import React, { useEffect, useState } from "react";
import Layoyt from "../components/layout/Layoyt";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/ProductDeatilsStyless.css";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function ProductDeatils() {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${VITE_BACKEND_URL}/api/v1/product/get-product/${params.slug}`
      );

      setProducts(data?.product);
      getRelatedProducts(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting Category ");
    }
  };

  useEffect(() => {
    if (params.slug) {
      getProducts();
    }
  }, [params?.slug]);

  //Get related products
  const getRelatedProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${VITE_BACKEND_URL}/api/v1/product/similar-product/${pid}/${cid}`,
        {
          category: products?.category?._id,
        }
      );
      setRelatedProducts(data?.products);
      console.log(data.products);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting Category ");
    }
  };

  return (
    <Layoyt>
      <div className="row container product-details">
        <div className="col-md-6 p-2">
          <img
            src={`${VITE_BACKEND_URL}/api/v1/product/get-photo-product/${products._id}`}
            className="card-img-top "
            height={"300px"}
            width={"300px"}
            alt="..."
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {products.name}</h6>
          <h6>Description : {products.description} </h6>
          <h6>
            Price :{" "}
            {products?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6>Category : {products.category?.name}</h6>
          <h6>Quantity : {products.quantity}</h6>
          <button class="btn btn-secondary m-1">Add to Cart</button>
        </div>
      </div>
      <hr />
      <div>
        {relatedProducts.length > 0 ? (
          <div className="row">
            <h4>Similar Products ➡️</h4>
            {relatedProducts.length < 1 && (
              <p className="text-center">No Similar Products found</p>
            )}
            <div className="d-flex flex-wrap">
              {relatedProducts.map((products) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={products._id}
                >
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
                        className="btn btn-info ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h2 className="text-center my-5">No Similar Products Found</h2>
        )}
      </div>
    </Layoyt>
  );
}

export default ProductDeatils;
