import { VnPayController } from "controller/VnPayController";
import { Router } from "express";
import security from "security/Security";
const VnPayRouter=Router()
VnPayRouter.get("/getLink",
(req,res,next)=>{security(req,res,next,["USER"])},
VnPayController.getLink)
VnPayRouter.put("/paymentResult",
(req,res,next)=>{security(req,res,next,["USER"])},
VnPayController.payResult)
export default VnPayRouter