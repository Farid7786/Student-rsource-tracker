// faculty.route.js

import express, { Router } from 'express'
import Faculty from '../models/Faculty.model.js';

const router = express.Router();
async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedpassword1 = bcryptjs.hashSync(password, 10);
    const faculty = new Faculty({ username, email, password:hashedpassword1 });
    await faculty.save();
    res.status(201).json({ message: "Created Sucessfully" });
  } catch (error) {
    next(error);
  }
}

export default router;
