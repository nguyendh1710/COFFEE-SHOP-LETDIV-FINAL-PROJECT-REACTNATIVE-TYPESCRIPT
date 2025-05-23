// file này dùng phân quyền (authorization) để xác định admin hay customer
import { AuthRequest } from "./authenticateJWT";
import { Response, NextFunction } from "express";

// Middleware kiểm tra phân quyền cho admin
export const authorizeAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ message: "Quyền truy cập bị từ chối. Cần quyền admin." });
    return
  }
  next();
};

// Middleware kiểm tra phân quyền cho customer
export const authorizeCustomer = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "customer") {
    res.status(403).json({ message: "Quyền truy cập bị từ chối. Cần quyền customer." });
    return
  }
  next();
};



