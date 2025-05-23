// file này nhận dữ liệu từ frontend dùng chia route để đẩy dữ liệu đúng route vô các hàm trong controller
import { Router } from "express";
import { register, login } from "../controllers/authController";
import { authenticateToken } from "../middleware/authenticateJWT";
import { authorizeAdmin, authorizeCustomer } from "../middleware/authorizeRole";
import multer from 'multer';


// Tạo router
const router = Router();

// Cấu hình multer để xử lý file tải lên
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Đảm bảo rằng thư mục 'uploads' tồn tại
    cb(null, 'uploads/');  // Đảm bảo bạn có thư mục 'uploads' trong project của mình
  },
  filename: (req, file, cb) => {
    // Tạo tên file duy nhất bằng cách sử dụng thời gian hiện tại
    cb(null, Date.now() + '-' + file.originalname);  // Tên file sau khi tải lên
  },
});

const upload = multer({ storage });

// Đăng ký người dùng mới
router.post("/register", upload.single("avatar"), register);

// Đăng nhập và trả về token + role
router.post("/login", login); 

// Bảo vệ route này bằng cách yêu cầu người dùng phải có token hợp lệ và quyền admin
router.get("/admin-dashboard", authenticateToken, authorizeAdmin, (req, res) => {
  res.json({ message: "Chào mừng bạn đến với trang quản trị" });
});

// Bảo vệ route này cho customer
router.get("/customer-profile", authenticateToken, authorizeCustomer, (req, res) => {
  res.json({ message: "Chào mừng bạn đến với hồ sơ khách hàng" });
});

export default router;
