import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import UserModel from "../models/UserModel.js";
import OrderModel from "../models/OrderModel.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, question } = req.body;
    if (!name) {
      return res.send({ error: "Name is required" });
    } else if (!email) {
      return res.send({ error: "Email is required" });
    } else if (!password) {
      return res.send({ error: "Passowrd is required" });
    } else if (!phone) {
      return res.send({ error: "Phone number is required" });
    } else if (!address) {
      return res.send({ error: "Address is required" });
    } else if (!question) {
      return res.send({ error: "Question is required" });
    }

    //Check User
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(200).send({
        success: false,
        message: "User already exists, please login",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);

    //save
    const newUser = await new UserModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      question,
    }).save();

    res.status(201).send({
      success: true,
      message: "Registration Successful",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//Login Controller
export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.send({ error: "Email is required" });
    } else if (!password) {
      return res.send({ error: "Passowrd is required" });
    }

    //Check User
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User does not exist, please register",
      });
    }

    //compare password
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //generate token
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

//Test Controller
export const testController = (req, res) => {
  res.send({ message: "Test Controller" });
};

//Forgot Password Controller

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, question, password } = req.body;
    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    } else if (!question) {
      return res.status(400).send({ error: "Security Question is required" });
    } else if (!password) {
      return res.status(400).send({ error: "Password is required" });
    }
    //check Email and Question
    const user = await UserModel.findOne({ email, question });
    if (!user) {
      return res
        .status(400)
        .send({ error: "Invalid Email or Security Question" });
    }
    //hash new password
    const hashedPassword = await hashPassword(password);
    //update password
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Password Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Forgot Password",
      error,
    });
  }
};

//Update Profile Controller
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    if (!name) {
      return res.send({ error: "Name is required" });
    } else if (!email) {
      return res.send({ error: "Email is required" });
    } else if (!phone) {
      return res.send({ error: "Phone is required" });
    } else if (!address) {
      return res.send({ error: "Address is required" });
    }
    //update

    const user = await UserModel.findById(req.user._id);

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Profile Update",
      error,
    });
  }
};

//Get Orders Controller
export const getOrdersControllers = async (req, res) => {
  try {
    console.log(req.user);
    const orders = await OrderModel.find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.status(200).send({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting orders",
      error,
    });
  }
};
