import { Request, Response } from "express";
import { TableOrderService } from "service/tableOrderService";

const service=new TableOrderService()
export class TableOrderController{
    static async order(req:Request,res:Response){
        try{
            await service.order(req,res);
            return res.status(200).json({message:"success"});
        }
        catch(e){
            console.log(e.stack)
            return res.status(400).json({message:e.message});
        }
    }
    static async cancel(req:Request,res:Response){
        try{
            await service.cancel(req,res);
            return res.status(200).json({message:"success"});
        }
        catch(e){
            console.log(e.stack)
            return res.status(400).json({message:e.message});
        }
    }
    static async findAll(req:Request,res:Response){
        try{
            
            return res.status(200).json(await service.findAllOrder());
        }
        catch(e){
            console.log(e.stack)
            return res.status(400).json({message:e.message});
        }
    }
    static async findYourOrder(req:Request,res:Response){
        try{
            
            return res.status(200).json(await service.findYourOrder(req,res));
        }
        catch(e){
            console.log(e.stack)
            return res.status(400).json({message:e.message});
        }
    }
     static async freeTime(req:Request,res:Response){
        try{
            
            return res.status(200).json(await service.getFreeTime(req,res));
        }
        catch(e){
            console.log(e.stack)
            return res.status(400).json({message:e.message});
        }
    }


}