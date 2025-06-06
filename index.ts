import express from "express";
import dotenv from "dotenv";
import { log } from "console";
import useRouters from "./src/routers/User";
import cors from "cors";
import mongoose from "mongoose";
dotenv.config();

const app = express();
const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.71ficv6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// body trong api ==> đọc được thì phải là Json
app.use(express.json());

app.use(cors());

app.use("/auth", useRouters);
const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log(`Connect to db successfully!!`);
  } catch (error) {
    console.log(`Can not connect to db ${error}`);
  }
};

connectDB()
  .then(() => {
    app.listen(process.env.PORT, (err: any) => {
      if (err) {
        throw new Error(err);
      }
      console.log(`Server is starting at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

console.log("Hello word! 2");
