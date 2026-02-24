import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn }from "typeorm";
import { TableOrder } from "./TableOrder";
import DishOrder from "./DishOrder";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id!:number;
    @Column({unique:true})
    name:string;
    @Column()
    password:string;
    @Column()
    phone:string;
    @Column()
    role:string;
    @Column()
    email:string;
    @Column()
    registerCode:string;
    @Column()
    registerExpired:Date;
    @Column()
    registerStatus:boolean;
    @OneToMany(()=>TableOrder,(tableOrder)=>tableOrder.user)
    tableOrder:TableOrder[];
    @OneToMany(()=>DishOrder,(dishOrder)=>dishOrder.user)
    dishOrder:DishOrder[];
    constructor(name:string,password:string,phone:string,role:string, tableOrder:TableOrder[]
    ,dishOrder:DishOrder[],registerStatus:boolean,registerExpired:Date,email:string,registerCode:string){
        this.name=name;
        this.password=password;
        this.role=role;
        this.phone=phone;
        this.tableOrder=tableOrder;
        this.dishOrder=dishOrder;
        this.email=email;
        this.registerStatus=registerStatus;
        this.registerExpired=registerExpired;
        this.registerCode=registerCode;
    }
}
export default User;