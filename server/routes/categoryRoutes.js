import express from "express";
import { adminAccess, requireSignin } from "../middleware/authMiddleware.js";
import {
  CategoryController,
  createCategoryController,
  deletecategory,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/CategoryController.js";

const router = express.Router();

//routes
//CREATE CATEGORY
router.post(
  "/create-category",
  requireSignin,
  adminAccess,
  createCategoryController
);

//Update CATEGORY
router.put(
  "/update-category/:id",
  requireSignin,
  adminAccess,
  updateCategoryController
);

//Get all categories
router.get("/get-all-category", CategoryController);

//Single Category
router.get("/single-category/:slug", singleCategoryController);

//Delete Category
router.delete(
  "/delete-category/:id",
  requireSignin,
  adminAccess,
  deletecategory
);

export default router;
