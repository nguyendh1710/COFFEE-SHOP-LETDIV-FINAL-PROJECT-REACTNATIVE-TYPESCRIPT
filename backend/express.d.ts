import { User } from "./models/User"; // import User model nếu cần

declare global {
  namespace Express {
    interface Request {
      user?: { role: "admin" | "customer"; [key: string]: any }; // Mở rộng Request để bao gồm user
    }
  }
}
