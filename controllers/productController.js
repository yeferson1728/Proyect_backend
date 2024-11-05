import Product from "../models/Product.js";
import { validationResult } from "express-validator";
async function getAllProducts(req, res) {
  try {
    const product = await Product.find({ deletedAt: { $eq: null } });
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getProductById(req, res) {
  try {
    const productId = req.params.id;
    const productFound = await Product.findOne({
      _id: productId,
      deletedAt: { $eq: null },
    });

    if (!productFound) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(productFound);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
}

async function createProduct(req, res) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const {
      cod,
      name,
      description,
      price,
      brand,
      model,
      category,
      dimensions,
      stock,
    } = req.body;
    const productCreated = await Product.findOne({ cod: cod });

    if (!productCreated) {
      const newProduct = await Product.create({
        cod,
        name,
        description,
        price,
        brand,
        model,
        category,
        dimensions,
        stock,
        // avatar: req.file.filename,
      });
      return res.status(201).json(newProduct);
    } else {
      res.json({
        message:
          "El producto ya está creado por favor ingresa a la opción de actualizar",
      });
    }
    return res.json({ error: result.array() });
  }
}

async function updateProduct(req, res) {
  try {
    const product = req.body;
    const productId = await Product.findById(req.params.id);

    if (productId !== null) {
      productId.cod = product.cod || productId.cod;
      productId.name = product.name || productId.name;
      productId.description = product.description || productId.description;
      productId.price = product.price || productId.price;
      productId.brand = product.brand || productId.brand;
      productId.model = product.model || productId.model;
      productId.category = product.category || productId.category;
      productId.dimensions = product.dimensions || productId.dimensions;
      productId.stock = product.stock || productId.stock;

      await productId.save();
      return res.json(productId);
    } else {
      return res.json("el id del producto no existe");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function destroy(req, res) {
  try {
    const productDelete = await Product.findById(req.params.id);
    productDelete.deletedAt = Date.now();
    productDelete.save();
    console.log(productDelete);
    return res.json("se ha eliminado el producto");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default {
  getAllProducts,
  createProduct,
  getProductById,
  destroy,
  updateProduct,
};
