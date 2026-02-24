import { Request, Response } from "express"
import { DishOrderService } from "service/DishOrderService"

const service=new DishOrderService()
export class DishOrderController{
    static async order(req:Request,res:Response){
         try{
            await service.order(req,res);
            return res.status(200).json({message:"success"});
        }
        catch(e){
            return res.status(400).json({message:e.message});
        }
    }
    static async cancel(req:Request,res:Response){
         try{
            await service.cancel(req,res);
            return res.status(200).json({message:"success"});
        }
        catch(e){
            return res.status(400).json({message:e.message});
        }
    }
    static async findAll(req:Request,res:Response){
        try{
            return res.status(200).json(await service.findAll())
        }
        catch(e){
            return res.status(400).json({message:e.message});
        }
    }
    static async findYourOrder(req:Request,res:Response){
        try{
            return res.status(200).json(await service.findYourOrder(req,res))
        }
        catch(e){
            console.log(e.stack)
            return res.status(400).json({message:e.message});
        }
    }
    static async success(req:Request,res:Response){
        try{
            await service.setStatusSuccess(req.params.id);
            return res.status(200).json({message:"success"});
        }
        catch(e){
            return res.status(400).json({message:e.message});
        }
    }


}