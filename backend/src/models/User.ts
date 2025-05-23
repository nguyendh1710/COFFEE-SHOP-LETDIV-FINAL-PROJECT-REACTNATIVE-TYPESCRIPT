import { Schema, Document } from "mongoose";
import { userDB } from "../database/connection"; // sử dụng kết nối userDB

export interface IUser extends Document {
  username: string;
  phone: string;
  address: string;
  email: string;
  password: string;
  avatar: {
    path: string;
    filename: string;
    originalname: string;
  };
  role: "admin" | "customer";
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    avatar: { 
      type: { 
        path: { type: String, required: true },
        filename: { type: String, required: true },
        originalname: { type: String, required: true }
      },
      required: true
    },
    role: { type: String, enum: ["admin", "customer"], default: "customer" },
  },
  { timestamps: true }
);

// Tên collection sẽ là "users"
const User = userDB.model<IUser>("User", userSchema, "users");

export default User;
