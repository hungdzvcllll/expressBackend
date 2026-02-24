import { Request, Response } from "express";
import { TableService } from "service/TableService";
const service=new TableService();
export class TableController{
    static async findAll(req:Request,res:Response){
        try{
            return res.status(200).json(await service.findAll());
        }
        catch(e){
            return res.status(400).json({message:e.message});
        }
    }
    static async findById(req:Request,res:Response){
        try{
            return res.status(200).json(await service.findById(req,res));
        }
        catch(e){
            return res.status(400).json({message:e.message});
        }
    }
    static async add(req:Request,res:Response){
        try{
            await service.add(req,res);
            return res.status(200).json({message:"success"});
        }
        catch(e){
            return res.status(400).json({message:e.message});
        }
    }
    static async stop(req:Request,res:Response){
        try{
            await service.stopTable(req,res);
            return res.status(200).json({message:"success"});
        }
        catch(e){
            return res.status(400).json({message:e.message});
        }
    }
    static async start(req:Request,res:Response){
        try{
            await service.startTable(req,res);
            return res.status(200).json({message:"success"});
        }
        catch(e){
            return res.status(400).json({message:e.message});
        }
    }
}