import axios from "axios";
import React, { useEffect, useState } from "react";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${VITE_BACKEND_URL}/api/v1/category/get-all-category`
      );
      setCategories(data?.categories);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
