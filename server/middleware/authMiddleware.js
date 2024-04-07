import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

export const requireSignin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("Token in SignIn", token);
    if (!token) {
      return res
        .status(401)
        .send({ error: "Unauthorized - Token missing in SignIn" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    console.log(decode);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Unauthorized - Invalid token - SignIn" });
  }
};

//admin access

export const adminAccess = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({ error: "Unauthorized - Token missing" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    const user = await UserModel.findById(req.user._id);
    if (user.role !== 1) {
      return res
        .status(401)
        .send({ error: "Unauthorized - Admin access only" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Unauthorized - Invalid token - admin" });
  }
};
