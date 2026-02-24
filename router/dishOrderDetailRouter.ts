import { DishOrderDetailController } from "controller/DishOrderDetailController";
import { Request,Response, Router } from "express"; 
import security from "security/Security";
const dishOrderDetailRouter=Router()
dishOrderDetailRouter.get("/details/:id",
(req,res,next)=>{security(req,res,next,["ADMIN","USER"])},
DishOrderDetailController.detail)
export default dishOrderDetailRouter