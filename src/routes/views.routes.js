import { Router } from "express";
import userModel from "../dao/models/user.model.js";

const router = Router();

router.get("/", (req,res) => {
    res.render("register")
})

router.get("/login", async(req,res) => {
    res.render("/login")
})

router.get("/usuarios", async (req,res) => {
    
    const users = await userModel.find().lean();
    
    res.render("users", {users, isAdmin: true})
})

export {router as viewRouter}



