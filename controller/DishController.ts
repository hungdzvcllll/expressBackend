import {Request,Response}from "express"
import { DishService } from "service/DishService"
const dishService:DishService=new DishService();
export class DishController{
    static async findAll(req:Request,res:Response){
        try{
            return res.status(200).json(await dishService.findAll());
        }
        catch(e){
            return res.status(400).json({message:e.message});
        }
        
    }
    static async findById(req:Request,res:Response){
        try{
            return res.status(200).json(await dishService.findById(req,res));
        }
        catch(e){
            return res.status(400).json({message:e.message});
        }
    }
    static async add(req:Request,res:Response){
        try{
            await dishService.add(req,res);
            return res.status(201).json({message:"success"});
        }
        catch(e){
            return res.status(400).json({message:e.message});
        }
    }


}