import express from "express";
import dotenv from "dotenv";
import { log } from "console";
dotenv.config();

const app = express();
const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.71ficv6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
app.listen(process.env.PORT, (err: any) => {
  if (err) {
    throw new Error(err);
  }
  console.log(`Server is starting at http://localhost:${process.env.PORT}`);
});
console.log("Hello word! 2");
