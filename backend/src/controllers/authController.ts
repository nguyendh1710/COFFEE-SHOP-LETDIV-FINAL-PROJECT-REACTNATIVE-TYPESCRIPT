// file này nhận dữ liệu trực tiếp được dispach từ thunks redux ở Frontend sau khi bấm nút submit ở component
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined.");
}

// Hàm đăng ký
export const register = async (req: Request, res: Response) => {

  // Loại bỏ khoảng trắng thừa trong các trường dữ liệu
  const email = req.body.email?.trim();
  const password = req.body.passWord?.trim();
  const confirmpassword = req.body.confirmPassWord?.trim();
  const username = req.body.userName?.trim();
  const phone = req.body.phone?.trim();
  const address = req.body.address?.trim();
  const role = req.body.role?.trim();
  const avatar = req.file; // Nhận file ảnh từ yêu cầu gửi lên

  console.log("Đã nhận được request đăng ký người dùng từ authRoutes:", req.body);

  // Kiểm tra xem thiếu thông tin gì
  if (!email || !password || !confirmpassword || !username || !phone || !address || !avatar) {
    res.status(400).json({ message: "Thiếu thông tin đăng ký." });
    return
  }

  if (password !== confirmpassword) {
    res.status(400).json({ message: "Mật khẩu xác nhận không khớp." });
    return;
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400).json({ message: "Email đã tồn tại." });
      return;
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedpassword,
      username,
      phone,
      address,
      avatar: {
        path: avatar.path,
        filename: avatar.filename,
        originalname: avatar.originalname
      }, // Đường dẫn tới ảnh đã được lưu, lưu thêm filename hoặc hiển thị ảnh cho người dùng
      role
    });

    await newUser.save();
    res.status(201).json({ message: "Đăng ký thành công." });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Lỗi server khi đăng ký." });
  }
};

// Hàm đăng nhập
export const login = async (req: Request, res: Response) => {
  console.log( req.body)
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Thiếu email hoặc mật khẩu." });
    return
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Email không tồn tại." });
      return
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Mật khẩu không đúng." });
      return
    }

    // Tạo token
    const token = jwt.sign(
      { id: user._id, role: user.role }, // payload
      JWT_SECRET,
      { expiresIn: "7d" } // thời gian sống của token
    );

    res.status(200).json({
      message: "Đăng nhập thành công.",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        address: user.address,
        avatar:user.avatar,
        role: user.role,
      },
    });
    return
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Lỗi server khi đăng nhập." });
    return
  }
};
