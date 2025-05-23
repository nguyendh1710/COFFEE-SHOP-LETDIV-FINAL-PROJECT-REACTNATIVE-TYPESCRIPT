// FILE NÀY NHẬN KẾT QUẢ TỪ CONTROLLER PHÙ HỢP ĐỂ XỬ LÝ VÀ ĐIỀU HƯỚNG CHO SERVER ĐỂ VÀO DATABASE THỰC HIỆN THAY ĐỔI TRONG DATABASE
import { Router } from "express";
import { getCartByUserId,updateCartByUserId } from "../controllers/cartController";
import { authenticateToken } from "../middleware/authenticateJWT";
import { authorizeAdmin, authorizeCustomer } from "../middleware/authorizeRole";

// Tạo router
const router = Router();

router.get("/:userId/cart", authenticateToken, authorizeCustomer, getCartByUserId);// Lấy giỏ hàng theo user ID + Bảo vệ route này bằng cách yêu cầu người dùng phải có token hợp lệ và quyền customer
router.post("/:userId/cart", authenticateToken, authorizeCustomer, updateCartByUserId); // Cập nhật giỏ hàng theo user ID

export default router;
