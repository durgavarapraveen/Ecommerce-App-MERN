import React from "react";
import { useSearch } from "../../Context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function SearchINput() {
  const naviagte = useNavigate();
  const [values, setValues] = useSearch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${VITE_BACKEND_URL}/api/v1/product/search-product/${values.keyword}`
      );
      setValues({ ...values, results: data });
      console.log(data);

      naviagte("/search");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchINput;
