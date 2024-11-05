import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/database.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(express.json());

//Connection
connectDB();

const newAvatarUser = path.join(import.meta.dirname, "public/ImgUser");

if (!fs.existsSync(newAvatarUser)) {
  fs.mkdirSync(newAvatarUser, { recursive: true });
}

//Routes
app.use(userRoutes);
app.use(authRoutes);
app.use(orderRoutes);
app.use(productRoutes);
// app.use(
//   "/api/avatars",
//   express.static(path.join(import.meta.dirname, "avatar/ImgUser"))
// );
//servidor en escucha
app.listen(process.env.APP_PORT, () => {
  console.log(`[Server] Server running at ${process.env.APP_PORT} port`);
});
