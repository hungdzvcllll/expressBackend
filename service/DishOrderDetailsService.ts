import { AppDataSource } from "data-source";
import { DishOrderDetails } from "model/DishOrderDetails";
import { Request,Response } from "express";
import Dish from "model/Dish";
import UserService from "./UserService";
const orderDetails=AppDataSource.getRepository(DishOrderDetails);
const dishRepo=AppDataSource.getRepository(Dish);
const userService=new UserService()
export class DishOrderDetailsService{
    async createDetails(req:Request,res:Response):Promise<any>{
        let listOrder:any[]=req.body;
        let listRes:DishOrderDetails[]=[]
        let price:number=0;
        for(let i=0;i<listOrder.length;i++){
            let dish:Dish|null=await dishRepo.findOneBy({id:listOrder[i].id})
            if(dish==null)
                throw new Error("dish not exist");
            listRes.push(new DishOrderDetails(dish.id,listOrder[i].quantity,dish.price))
            price+=listOrder[i].quantity*dish.price
        }
        return {list:listRes,totalAmount:price};
    }
    async findOrderDetail(req:Request,res:Response){
        let user=await userService.yourProfile(req,res);
        let orderId=Number(req.params.id)
        let detail:DishOrderDetails[]=await orderDetails.find({where:{dishOrderId:orderId},relations:["dish","dishOrder","dishOrder.user"]});
        if(detail.length==0)
            throw new Error("not found")
        if(user.role!="ADMIN"&&user.id!=detail[0].dishOrder.user.id)
            throw new Error("you don't have permission")
        return detail.map(({dishOrderId,dishId,quantity,priceOf1,dish})=>({dishOrderId,dishId,quantity,priceOf1,dishname:dish.name}))
    }
   
    
}