import mongoose, { Schema } from "mongoose";
const Userschema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rule: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});
// Loại bỏ password khi trả về JSON
Userschema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const UserModel = mongoose.model("users", Userschema);
export default UserModel;
