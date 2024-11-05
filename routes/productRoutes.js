import express from "express";
import productController from "../controllers/productController.js";
import productValidation from "../middlewares/productsValidator.js";
import adminValidation from "../middlewares/adminValidation.js";
import { expressjwt } from "express-jwt";
const router = express.Router();

router.get(
  "/api/products",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  productController.getAllProducts
);
router.get(
  "/api/products/:id",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  productController.getProductById
);
router.post(
  "/api/products",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  adminValidation,
  productValidation.create,
  productController.createProduct
);
router.patch(
  "/api/products/:id",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  adminValidation,
  productController.updateProduct
);
router.delete(
  "/api/products/:id",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  adminValidation,
  productController.destroy
);

export default router;
