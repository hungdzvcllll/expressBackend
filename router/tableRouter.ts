import { Router } from "express";
import { TableController } from "controller/TableController";
import security from "security/Security";
const tableRouter=Router()
tableRouter.get("/findAll",TableController.findAll)
tableRouter.get("/findById/:id",TableController.findById)
tableRouter.post("/add",(req,res,next)=>{
    security(req,res,next,["ADMIN"])},TableController.add
)
tableRouter.put("/stop/:id",(req,res,next)=>{
    security(req,res,next,["ADMIN"])},TableController.stop
)
tableRouter.put("/start/:id",(req,res,next)=>{
    security(req,res,next,["ADMIN"])},TableController.start
)

export default tableRouter;