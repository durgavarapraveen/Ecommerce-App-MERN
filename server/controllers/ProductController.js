import slugify from "slugify";
import ProductModel from "../models/ProductModel.js";
import CategoryModel from "../models/CategoryModel.js";
import fs from "fs";
import braintree from "braintree";
import OrderModel from "../models/OrderModel.js";

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res
          .status(400)
          .send({ status: false, message: "Name is required" });
      case !description:
        return res
          .status(400)
          .send({ status: false, message: "Description is required" });
      case !price:
        return res
          .status(400)
          .send({ status: false, message: "Price is required" });
      case !category:
        return res
          .status(400)
          .send({ status: false, message: "Category is required" });
      case !quantity:
        return res
          .status(400)
          .send({ status: false, message: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res.status(400).send({
          status: false,
          message: "Photo is required and should be less than 1mb",
        });
    }

    const products = new ProductModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res
      .status(201)
      .send({ status: true, message: "Product created", products });
  } catch (error) {
    res.status(500).send({
      status: false,
      error,
      message: "Internal server error",
    });
  }
};

// Update product
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res
          .status(400)
          .send({ status: false, message: "Name is required" });
      case !description:
        return res
          .status(400)
          .send({ status: false, message: "Description is required" });
      case !price:
        return res
          .status(400)
          .send({ status: false, message: "Price is required" });
      case !category:
        return res
          .status(400)
          .send({ status: false, message: "Category is required" });
      case !quantity:
        return res
          .status(400)
          .send({ status: false, message: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res.status(400).send({
          status: false,
          message: "Photo is required and should be less than 1mb",
        });
    }

    const products = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    console.log(products);
    res.status(201).send({
      status: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      error,
      message: "Internal server error",
    });
  }
};

// Get all products
export const getProductsController = async (req, res) => {
  try {
    const products = await ProductModel.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res
      .status(200)
      .send({ status: true, totalCount: products.length, products });
  } catch (error) {
    res.status(500).send({
      status: false,
      error,
      message: "Internal server error",
    });
  }
};

// Get single product
export const getProductController = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await ProductModel.findOne({ slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({ status: true, product });
  } catch (error) {
    res.status(500).send({
      status: false,
      error,
      message: "Internal server error",
    });
  }
};

// Get single product photo
export const getProductPhotoController = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    res.status(500).send({
      status: false,
      error,
      message: "Internal server error",
    });
  }
};

// Delete product
export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndDelete(id).select("-photo");
    res
      .status(200)
      .send({ status: true, message: "Product Deleted successfully" });
  } catch (error) {
    res.status(500).send({
      status: false,
      error,
      message: "Internal server error",
    });
  }
};

//Filters
export const filterProductController = async (req, res) => {
  console.log(req.body);
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) {
      args.category = checked;
    }
    if (radio.length) {
      args.price = {
        $gte: radio[0],
        $lte: radio[1],
      };
    }
    const products = await ProductModel.find(args);
    console.log(products);
    res.status(200).send({ status: true, products });
  } catch (error) {
    res.status(500).send({
      status: false,
      error,
      message: "Internal server error",
    });
  }
};

// Get product count
export const getProductCountController = async (req, res) => {
  try {
    const productCount = await ProductModel.find({}).estimatedDocumentCount();
    res.status(200).send({ success: true, productCount });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Internal server error",
    });
  }
};

// Get product per page
export const productListController = async (req, res) => {
  try {
    const perpage = 12;
    const page = req.params.page ? req.params.page : 1;
    const products = await ProductModel.find({})
      .select("-photo")
      .skip(perpage * (page - 1))
      .limit(perpage)
      .sort({ createdAt: -1 });
    res.status(200).send({ success: true, products });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Internal server error",
    });
  }
};

//Search product
export const productSearchController = async (req, res) => {
  console.log(req.params);
  try {
    const query = req.params;
    console.log(query);
    if (query) {
      const products = await ProductModel.find({
        $or: [
          { name: { $regex: query.keyword, $options: "i" } },
          { description: { $regex: query.keyword, $options: "i" } },
        ],
      }).select("-photo");
      console.log(products);
      res.json(products);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Internal server error",
    });
  }
};

// Get related product
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await ProductModel.find({
      _id: { $ne: pid },
      category: cid,
    })
      .limit(4)
      .select("-photo")
      .populate("category");
    res.status(200).send({ success: true, products });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Internal server error",
    });
  }
};

// Get category product
export const categoryProductController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    const products = await ProductModel.find({ category })
      .select("-photo")
      .populate("category");
    res.status(200).send({ success: true, products, category });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Internal server error",
    });
  }
};

//Payment Gateway

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "bbhnpntj5tyy638j",
  publicKey: "nw8nw45fsrq7kjsf",
  privateKey: "dc290f4657cfabad4e7b215e4fbfbd57",
});

export const brainTreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send({
          success: false,
          error: err,
          message: "Internal server error",
        });
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Internal server error",
    });
  }
};

export const brainTreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((c) => {
      total += c.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (err, result) {
        if (result) {
          const order = new OrderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send({
            success: false,
            error: err,
            message: "Internal server error",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Internal server error",
    });
  }
};
