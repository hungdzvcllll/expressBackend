import { Router } from "express";
import { TableOrderController } from "controller/TableOrderController";
import security from "security/Security";
const tableOrderRouter=Router()
tableOrderRouter.post("/order",
(req,res,next)=>{ security(req,res,next,["USER"])},
TableOrderController.order)
tableOrderRouter.put("/cancel/:id",
(req,res,next)=>{security(req,res,next,["USER"])},
TableOrderController.cancel)
tableOrderRouter.get("/findAll",(req,res,next)=>{
    security(req,res,next,["ADMIN"])},TableOrderController.findAll
)
tableOrderRouter.get("/findYourOrder",(req,res,next)=>{
    security(req,res,next,["USER"])},TableOrderController.findYourOrder
)
tableOrderRouter.get("/freeTime",(req,res,next)=>{
    security(req,res,next,["USER"])},TableOrderController.freeTime
)
export default tableOrderRouter