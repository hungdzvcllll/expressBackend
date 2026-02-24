import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";
import { DishOrderDetails } from "./DishOrderDetails";

@Entity()
export class DishOrder{
    @PrimaryGeneratedColumn()
    id!:number;
    @Column()
    amount:number;
    @Column()
    status:string;
    @ManyToOne(()=>User,(user)=>user.dishOrder)
    user!:User;
    @OneToMany(()=>DishOrderDetails,(dishOrderDetails)=>dishOrderDetails.dishOrder,{cascade:true})
    dishOrderDetails:DishOrderDetails[];
    constructor(amount:number,status:string,dishOrderDetails:DishOrderDetails[],user:User){
        this.amount=amount;
        this.status=status;
        this.dishOrderDetails=dishOrderDetails;
        this.user=user;
    }
}
export default DishOrder;