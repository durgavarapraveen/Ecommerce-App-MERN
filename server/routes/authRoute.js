import express from "express";
import {
  registerController,
  LoginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersControllers,
} from "../controllers/authController.js";
import { adminAccess, requireSignin } from "../middleware/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", LoginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test route
router.get("/test", requireSignin, adminAccess, testController);

//protected auth route
router.get("/protected", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected auth route admin
router.get("/adminauth", adminAccess, (req, res) => {
  res.status(200).send({ ok: true });
});

//user update
router.put("/profile", requireSignin, updateProfileController);

router.get("/allorders", requireSignin, getOrdersControllers);

export default router;
