import { Request, Response } from "express";
import { DishOrderDetailsService } from "./DishOrderDetailsService";
import { AppDataSource } from "data-source";
import DishOrder from "model/DishOrder";
import UserService from "./UserService";
import User from "model/User";

const detailService=new DishOrderDetailsService()
const orderRepo=AppDataSource.getRepository(DishOrder)
const userService=new UserService()
export class DishOrderService{
    public async order(req:Request,res:Response):Promise<void>{
        let orderList=await detailService.createDetails(req,res);
        let userId:number=(await userService.yourProfile(req,res)).id
        let order:DishOrder=new DishOrder(orderList.totalAmount,"PENDING",orderList.list,{id:userId}as User)
        await orderRepo.save(order);
    }
    public async findAll(){
        let order:DishOrder[]=await orderRepo.find({relations:["user"]})
        return order.map(({id,amount,status,user})=>({id,amount,status,userId:user.id,username:user.name}))
    }
    public async findYourOrder(req:Request,res:Response){
        let userId:number=(await userService.yourProfile(req,res)).id
        console.log(userId)
        let order:DishOrder[]=await orderRepo.find({where:{user:{id:userId}}})
        return order.map(({id,amount,status})=>({id,amount,status}))
    }
    async cancel(req:Request,res:Response){
        let user=await userService.yourProfile(req,res);
        let orderId:number=Number(req.params.id)
        let order:DishOrder|null=await orderRepo.findOne({where:{id:orderId},relations:["user"]})
        if(order==null)
            throw new Error("not exist")
        if(order.user.id!=user.id)
            throw new Error("you don't have permission")
        if(order.status=="SUCCESS")
            throw new Error("can't do it")
        orderRepo.update({id:orderId},{status:"CANCEL"})
    }
    async setStatusSuccess(orderId){
        let order:DishOrder|null=await orderRepo.findOne({where:{id:Number(orderId)},relations:["user"]})
        if(order==null)
            throw new Error("not exist")
        if(order.status==="CANCEL")
            throw new Error("canceled")
         orderRepo.update({id:orderId},{status:"SUCCESS"});
    }
    async getTotalAmountForPay(orderId:number):Promise<number>{
        let order:DishOrder|null=await orderRepo.findOneBy({id:orderId})
        if(order==null||order.status==="CANCEL"||order.status==="SUCCESS")
            throw new Error("not found order")
        return order.amount
    } 
    
}