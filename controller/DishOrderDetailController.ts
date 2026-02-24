import { DishOrderDetailsService } from "service/DishOrderDetailsService";
import { Request,Response } from "express";
const service=new DishOrderDetailsService()
export class DishOrderDetailController{
    static async detail(req:Request,res:Response){
            try{
                return res.status(200).json(await service.findOrderDetail(req,res));
            }
            catch(e){
                console.log(e.stack)
                return res.status(400).json({message:e.message});
            }
        }
}