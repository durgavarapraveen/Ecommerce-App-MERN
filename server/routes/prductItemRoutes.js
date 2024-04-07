import express from "express";
import { adminAccess, requireSignin } from "../middleware/authMiddleware.js";
import {
  brainTreePaymentController,
  brainTreeTokenController,
  categoryProductController,
  createProductController,
  deleteProductController,
  filterProductController,
  getProductController,
  getProductCountController,
  getProductPhotoController,
  getProductsController,
  productListController,
  productSearchController,
  relatedProductController,
  updateProductController,
} from "../controllers/ProductController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignin,
  adminAccess,
  formidable(),
  createProductController
);

router.put(
  "/update-product/:pid",
  requireSignin,
  adminAccess,
  formidable(),
  updateProductController
);

//get product
router.get("/get-product", getProductsController);

//single product
router.get("/get-product/:slug", getProductController);

//get Photo
router.get("/get-photo-product/:pid", getProductPhotoController);

//Delete product
router.delete("/delete-product/:id", deleteProductController);

//filter Route
router.post("/filter-product", filterProductController);

//Product count
router.get("/product-count", getProductCountController);

//Product per page
router.get("/product-per-page/:page", productListController);

//SearchProductRouter
router.post("/search-product/:keyword", productSearchController);

//similar product
router.get("/similar-product/:pid/:cid", relatedProductController);

//category product
router.get("/category-product/:slug", categoryProductController);

//Payments Route
router.get("/braintree/token", brainTreeTokenController);

router.post("/braintree/payment", requireSignin, brainTreePaymentController);

export default router;
