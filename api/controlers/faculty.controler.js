import express from 'express';
import mongoose from 'mongoose';
import Faculty from '../models/Faculty.model.js';
export const facul= async (req,res)=>{
   const {username, email, password} = req.body;
   const newuser = new Faculty({username, email, password});
   try {
    await newuser.save();
    res.status(201).json('User created sucessfully');
   } catch (error) {
    res.json(error);
   }
}