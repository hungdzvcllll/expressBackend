import { DishOrderController } from "controller/DishOrderController";
import { Router } from "express";
import security from "security/Security";
const dishOrderRouter=Router()
dishOrderRouter.post("/order",
(req,res,next)=>{security(req,res,next,["USER"])},
DishOrderController.order)
dishOrderRouter.put("/cancel/:id",
(req,res,next)=>{security(req,res,next,["USER"])},
DishOrderController.cancel)
dishOrderRouter.get("/findAll",
(req,res,next)=>{security(req,res,next,["ADMIN"])},
DishOrderController.findAll)
dishOrderRouter.get("/findYourOrder",
(req,res,next)=>{security(req,res,next,["USER"])},
DishOrderController.findYourOrder)
dishOrderRouter.put("/success/:id",
(req,res,next)=>{security(req,res,next,["ADMIN"])},
DishOrderController.success)
export default dishOrderRouter