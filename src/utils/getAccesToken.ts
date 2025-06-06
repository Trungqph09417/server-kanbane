import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const getAccesToken = async (payload: {
  _id: Types.ObjectId;
  email: string;
  rules?: number;
}) => {
  try {
    if (!process.env.SCRET_KEY) {
      throw new Error(
        "SCSCRET_KEY is not defined in the environment variables"
      );
    }
    const token = jwt.sign(payload, process.env.SCRET_KEY, {
      expiresIn: "1h",
    });

    return token;
  } catch (error: any) {
    console.error("Lỗi khi tạo token:", error.message);
    throw new Error("Không thể tạo token");
  }
};
