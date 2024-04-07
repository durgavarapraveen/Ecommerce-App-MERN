import React from "react";
import Layoyt from "../layout/Layoyt";
import { useSearch } from "../../Context/Search";
import { Link } from "react-router-dom";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Search() {
  const [values, setValues] = useSearch();
  console.log(values);

  return (
    <Layoyt title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results && values.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results ? values.results.length : 0}`}
          </h6>
          <div className="d-flex flex-wrap">
            {values?.results.map((products) => (
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
                    <p className="card-text">
                      {products.description.substring(0, 30)}...
                    </p>
                    <p className="card-text">$ {products.price}</p>
                    <button class="btn btn-primary ms-1">More Details</button>
                    <button class="btn btn-secondary ms-1">Add to Cart</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layoyt>
  );
}

export default Search;
