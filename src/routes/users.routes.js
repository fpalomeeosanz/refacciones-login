import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import { uploader } from "../utils.js";
import { authToken } from "../JWT.utils.js";

const router = Router();

//get general
router.get("/", authToken, async (req,res) =>{
    
    const users = await userModel.find();

    res.send({
        status: "succes",
        message: users
    })
})
//get individual
router.get("/:uid", authToken, async (req,res) =>{

    const id = req.params.uid;
    const user = await userModel.find({_id:id});

    res.send({
        status: "succes",
        message: users
    })
})
//creacion
router.post("/", uploader.single("thumbnail") ,async (req,res) =>{
    
    const {firts_name, last_name, email} = req.body;

    const filename = req.file.filename;
  
    if(!firts_name || !last_name || !email ||!filename){
        return res.status(400).send({
            status: "error",
            message: "Valores no completos"
        })
    }
    
    const user = {
        firts_name,
        last_name,
        email,
        thumbnail: `http://localhost:8080/images/${filename}`
    }

    const result = await userModel.create(user);

    res.send({ 
        status: "succes",
        message: result
    })
})
//actualizacion por cambiar...
router.put("/:uid", async (req,res) =>{
    
    const id = req.params.uid;

    const {firts_name, last_name, email, thumbnail} = req.body;
    //validar con BD
    const updateUser = {
        firts_name,
        last_name,
        email,
        thumbnail
    }

    const result = await userModel.updateOne({_id:id},{$set:updateUser});

    res.send({
        status: "succes",
        message: result
    })
})
//eliminacion
router.delete("/:uid", async (req,res) =>{
    
    const id = req.params.uid;
    const result = await userModel.deleteOne({_id:id})

    res.send({
        status: "succes",
        message: result
    })
})

export default router;
