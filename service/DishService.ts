import { AppDataSource } from "data-source";
import Dish from "model/Dish";
import {Request,Response}from "express"
const dishRepo=AppDataSource.getRepository(Dish);
export class DishService{
    async findAll():Promise<Object[]>{
        let list:Dish[]=await dishRepo.find();
        let res:Object[]=[];
        for(let i=0;i<list.length;i++){
            res.push({id:list[i].id,name:list[i].name,price:list[i].price,image:list[i].image});
        }
        return res;
    }
    async findById(req:Request,res:Response):Promise<Object>{
        let idFind:number=Number(req.params.id);
        let obj:Dish|null=await dishRepo.findOne({where:{id:idFind}});
        if(obj==null)
            return {};
        return {id:obj.id,name:obj.name,price:obj.price,image:obj.image};
    }
    async add (req:Request,res:Response):Promise<void>{
        let {name,price}=req.body;
        let fileName=req.file?.filename;
        let save:Dish=new Dish(name,Number(price),"/dish/"+fileName,[]);
        await dishRepo.save(save);
    }
    


}