import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Faculty from "./models/Faculty.model.js";
import Student from "./models/Student.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "./utills/error.js";
import jwt from 'jsonwebtoken';
// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB using environment variables
// Connect to MongoDB using environment variables
mongoose.connect(process.env.MONGO);


// Create another connection for the second database
const db1 = mongoose.createConnection(process.env.MONGO1);

// Create Express app
const app = express();

app.use(express.json());

// Routes
// Faculty Signup
app.post("/api/faculty/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedpassword1 = bcryptjs.hashSync(password, 10);
    const faculty = new Faculty({ username, email, password:hashedpassword1 });
    await faculty.save();
    res.status(201).json({ message: "Created Sucessfully" });
  } catch (error) {
    next(error);
  }
});
app.post("/api/faculty/signin", async (req,res,next)=>{
  const {email,password} = req.body;
  try {
    const validuser = await Faculty.findOne({email});
    if(!validuser) return next(errorHandler(404,'user not found !!!'));
    const validpassword =  bcryptjs.compareSync(password,validuser.password);
    if(!validpassword) return next(errorHandler(404,'Wrong credentials !!!'));
    const token = jwt.sign({id: validuser._id},process.env.JWT_SECRET);
    const {password:pass, ...rest} = validuser._doc;
    res
    .cookie('acces token',token,{httpOnly:true})
    .status(200)
    .json(rest);
  } catch (error) {
    next(error);
  }
})
// Student Signup
app.post("/api/student/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedpassword2 =  bcryptjs.hashSync(password, 10);
    const student = new Student({ username, email, password:hashedpassword2 });
    await student.save();
    res.status(201).json({ message: "Your account created successfully" });
  } catch (error) {
    next(error);
  }
});
app.post("/api/student/signin", async (req,res,next)=>{
  const {email,password} = req.body;
  try {
    const validuser = await Student.findOne({email});
    if(!validuser) return next(errorHandler(404,'user not found !!!'));
    const validpassword =  bcryptjs.compareSync(password,validuser.password);
    if(!validpassword) return next(errorHandler(404,'Wrong credentials !!!'));
    const token = jwt.sign({id: validuser._id},process.env.JWT_SECRET);
    const {password:pass, ...rest} = validuser._doc;
    res
    .cookie('acces token',token,{httpOnly:true})
    .status(200)
    .json(rest);
  } catch (error) {
    next(error);
  }
})
app.use((err,req,res,next) =>{
  const statuscode = err.statuscode || 500;
  const message = err.message || "internal Server Error";
  return res.status(statuscode).json({
      success: false,
      statuscode,
      message
  })
})
// Start the server
app.listen(3000, () => {
  console.log(`Server is running on port 3000....`);
});
