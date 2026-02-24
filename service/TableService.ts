import { AppDataSource } from "data-source"
import Table from "model/Table"
import { Request,Response } from "express";
const tableRepo=AppDataSource.getRepository(Table)
export class TableService{
    async findAll():Promise<Object[]>{
        let list:Table[]= await tableRepo.find();
        let res:Object[]=[];
        for(let i=0;i<list.length;i++){
            res.push({id:list[i].id,capacity:list[i].capacity,status:list[i].status});
        }
        return res;
    }
    async findById(req:Request,res:Response):Promise<Object>{
        let tblId:number=Number(req.params.id);
        let tbl:Table|null=await tableRepo.findOneBy({id:tblId});
        if(tbl==null)
            return {};
        return {id:tbl.id,capacity:tbl.capacity,status:tbl.status};
    }
    async add(req:Request,res:Response):Promise<void>{
        let {capacity,status}=req.body;
        let tbl:Table=new Table(capacity,status,[]);
        await tableRepo.save(tbl);
    }
    async stopTable(req:Request,res:Response){
        let tableId:number=Number(req.params.id);
        tableRepo.update({id:tableId},{status:false});
    }
    async startTable(req:Request,res:Response){
        let tableId:number=Number(req.params.id);
        tableRepo.update({id:tableId},{status:true});
    }
    
    

}