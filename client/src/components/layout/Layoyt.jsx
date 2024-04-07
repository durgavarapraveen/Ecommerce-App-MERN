import React from "react";
import Header from "./Header";
import Fotter from "./Fotter";
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


function Layoyt({ description, title, keywords, author, children }) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <ToastContainer />
      <Fotter />
    </div>
  );
}

Layoyt.defaultProps = {
  title: "Ecommerce APP - shop now",
  description: "We sell the best products for cheap",
  keywords: "MERN, Ecommerce, React, Node, Express, MongoDB",
  author: "Saathjan",

}

export default Layoyt;
