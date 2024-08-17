import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())


import { postSignUp,login } from "./controllers/user.js"



const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URL)

  if (conn) {
    console.log("MongoDB connected succesfully✅")
  }
};
connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Flexfit API"
  })
});

app.post('/signup', postSignUp);
app.post("/login", login)



const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})