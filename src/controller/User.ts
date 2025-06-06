import UserModel from "../models/UserModel";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { getAccesToken } from "../utils/getAccesToken";
import { log } from "node:console";
dotenv.config();
const register = async (req: any, res: any) => {
  const body = req.body;
  const { email, password, name } = body;
  try {
    const user = await UserModel.findOne({ email });
    // console.log("keo qua tim kiem user", user);

    if (user) {
      return res.status(400).json({ message: "Tài khoản đã tồn tại" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    body.password = hashpassword;

    const newUser = new UserModel(body);
    await newUser.save();

    const userResponse = newUser.toJSON() as { [key: string]: any };
    delete userResponse.password;

    userResponse.token = await getAccesToken({
      _id: userResponse._id,
      email: userResponse.email,
      rules: 1,
    });
    console.log("ham user ", userResponse);

    res.status(200).json({
      message: "Register",
      data: userResponse,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const Login = async (req: any, res: any) => {
  const body = req.body;
  const { email, password } = body;
  try {
    const user = await UserModel.findOne({ email });
    // console.log("keo qua tim kiem user", user);

    if (!user) {
      return res.status(400).json({ message: "Email của bạn không tồn tại!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu của bạn không đúng!" });
    }
    const userResponse = user.toObject() as {
      [key: string]: any;
      password?: string;
    };
    delete userResponse.password;

    res.status(200).json({
      message: "Login successfyly!",
      data: {
        ...userResponse,
        token: await getAccesToken({
          _id: user._id,
          email: user.email,
          rules: user.rule ?? 1,
        }),
      },
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export { register, Login };
