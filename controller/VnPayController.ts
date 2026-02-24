import { Request, Response } from "express";
import { VnPayService } from "service/VnPayService";

const service=new VnPayService()
export class VnPayController{
    static async getLink(req:Request,res:Response){
        try{
            return res.status(200).json({mesage:await service.getLink(req,res)});
        }
        catch(e){
            console.log(e.stack)
            return res.status(400).json({message:e.message});
        }
    }
    static async payResult(req:Request,res:Response){
        try{
            return res.status(200).json({mesage:await service.payResult(req,res)});
        }
        catch(e){
            return res.status(400).json({message:e.message});
        }
    }
}