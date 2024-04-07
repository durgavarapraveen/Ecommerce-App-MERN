import React, { useState } from "react";
import Layoyt from "./layout/Layoyt";
import useCategory from "../Hooks/useCategory";
import { Link } from "react-router-dom";

function Categories() {
  const categories = useCategory();

  return (
    <Layoyt title={"Catogories - Ecommerce App"}>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row container">
          {categories.map((category) => (
            <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={category._id}>
              <div className="card">
                <Link to={`/category/${category.slug}`} className="btn cat-btn">
                  {category.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layoyt>
  );
}

export default Categories;
