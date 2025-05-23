import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import rateLimit from "express-rate-limit";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import cartRoutes from "./routes/cartRoutes";
import path from 'path';
import { productDB, userDB } from "./database/connection"; // import 2 kết nối DB

const app = express();
const PORT: number = parseInt(process.env.PORT || "5000", 10);

// Middleware
app.use(cors());
// Đảm bảo app có thể nhận body JSON từ client
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // xử lý form-data
//------------------------------------------------- MongoDB connection----------------------------------------
productDB.once("open", () => console.log(" Kết nối tới DB sản phẩm (QuanLySanPham) thành công"));
productDB.on("error", (err) => console.error(" Lỗi DB sản phẩm:", err));

userDB.once("open", () => console.log("Kết nối tới DB người dùng (QuanLyNguoiDung) thành công"));
userDB.on("error", (err) => console.error(" Lỗi DB người dùng:", err));
//------------------------------------------------- Start server----------------------------------------
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});

// -------------------------------------------------API Routes----------------------------------------
// product Routes
app.use("/api/products", productRoutes);
// auth Routes
app.use("/api/users", authRoutes);
// cart Routes
app.use("/api/users", cartRoutes);
// Cho phép truy cập ảnh
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
//--------------------------------------------------TEST------------------------------
// Health check MongoDB
app.get("/api/test-mongo", async (req: Request, res: Response) => {
  try {
    const isProductConnected = productDB.readyState === 1;
    const isUserConnected = userDB.readyState === 1;
    res.json({
      productDB: isProductConnected,
      userDB: isUserConnected,
      allConnected: isProductConnected && isUserConnected,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});


// Health check server
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "OK", message: "Server is running smoothly" });
});

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send(" Backend đang hoạt động tốt!!");
});

// Environment checks
// console.log("Email:", process.env.EMAIL_SENDER);
// console.log(" Password:", process.env.EMAIL_PASSWORD ? "Loaded" : "Not Loaded");
