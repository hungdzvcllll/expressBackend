import { AppDataSource } from "data-source";
import TableOrder from "model/TableOrder";
import {Request,Response} from "express";
import { Table } from "model/Table";
import {User} from"model/User"
import UserService from "./UserService";
import { Between } from "typeorm";
const Orderrepo=AppDataSource.getRepository(TableOrder);
const tableRepo=AppDataSource.getRepository(Table);
const userService=new UserService();
export class TableOrderService{
    async  checkIfYouCanOrder(tableId:number,startTime:Date,endTime:Date):Promise<void>{
        if(startTime.getHours()<=5|| endTime.getHours()>=22)
            throw new Error("please order between 6h and 22h");
        if(startTime>=endTime||startTime<new Date())
            throw new Error("invalid");
        if(await tableRepo.findOneBy({id:tableId,status:true})==null)
            throw new Error("not found table");
        let tableOrdered:Object[]=await Orderrepo.query("select * from table_order where tableId=? and ((start>? and start<?)or(end>? and end<?))",[tableId,startTime,endTime,startTime,endTime])
        if(tableOrdered.length!=0)
            throw new Error("please order in another time");
    }
    async order(req:Request,res:Response){
        let {tableId,start,end}=req.body;        
        await this.checkIfYouCanOrder(Number(tableId),new Date(start),new Date(end));
        let userId:number=Number((await userService.yourProfile(req,res)).id);
        let order=new TableOrder(new Date(start),new Date(end),{id:userId}as User,{id:tableId}as Table,true)
        await Orderrepo.save(order);
    }
    async cancel(req:Request,res:Response){
        let orderId:number=Number(req.params.id);
        let userId:number=Number((await userService.yourProfile(req,res)).id);
        console.log(orderId+" "+userId)
        let order:TableOrder|null=await Orderrepo.findOne({where:{id:orderId},relations:["user"]});
        if(order==null||order.user.id!=userId||new Date()>=order.start)
            throw new Error("you can't cancel this");
        order.status=false;
        Orderrepo.save(order);
    }
    async findAllOrder():Promise<Object[]>{
        let orderList:TableOrder[]=await Orderrepo.find({relations:["user","table"]});
        let res:Object[]=[]
        for(let i=0;i<orderList.length;i++){
            res.push({id:orderList[i].id,start:orderList[i].start,
            end:orderList[i].end,status:orderList[i].status,tableId:orderList[i].table.id,
            userId:orderList[i].user.id,username:orderList[i].user.name})
        }
        return res;
    }
    async findYourOrder(req:Request,res:Response){
        let userId:number=Number((await userService.yourProfile(req,res)).id);
        let orderList:TableOrder[]=await Orderrepo.find({where:{user:{id:userId}},relations:["user","table"]});
        
        let result:Object[]=[]
        for(let i=0;i<orderList.length;i++){
            let obj={id:orderList[i].id,start:orderList[i].start,
            end:orderList[i].end,status:orderList[i].status,tableId:orderList[i].table.id,
            userId:orderList[i].user.id,username:orderList[i].user.name}
            result.push(obj)
        }
        console.log(result)
        return result;
    }
    async getFreeTime(req:Request,res:Response){
        let date=String(req.query.date);
        let tableId=Number(req.query.tableId)
        let getDate=new Date(date);
        let nextDay=new Date(getDate.getTime()+24*60*60*1000);
        let list:TableOrder[]=await Orderrepo.find({where:{table:{id:tableId},start:Between(getDate,nextDay)},order:{start:"ASC"}})
        if(list.length==0)
            return [{start:"6h00",end:"22h00"}]
        let result:Object[]=[]
        for(let i=0;i<list.length;i++){
            if(i===0)
                result.push({start:"6h00",end:list[i].start.getHours()+"h"+list[i].start.getMinutes()})
            if( i<list.length-1)
                result.push({start:list[i].end.getHours()+"h"+list[i].end.getMinutes(),
                end:list[i+1].start.getHours()+"h"+list[i+1].start.getMinutes()})
            if(i===list.length-1){
                result.push({start:list[i].end.getHours()+"h"+list[i].end.getMinutes(),end:"22h00"})
            }
           
        }
        return result;
    }
}
