import security from "security/Security";
import { Router } from "express";
import { DishController } from "controller/DishController";
import FileHandles from "FileHandle/FileHandles";
import { Request,Response } from "express";
import * as express from "express"
const dishRouter = Router();
dishRouter.get("/findAll",DishController.findAll);
dishRouter.get("/findById/:id",DishController.findById);
dishRouter.post("/add",
(req,res,next)=>{
security(req,res,next,["ADMIN"])},FileHandles("dish").single("image"),
DishController.add)
dishRouter.use(express.static('dish'))
export default dishRouter;