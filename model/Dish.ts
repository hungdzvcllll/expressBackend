import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DishOrderDetails } from "./DishOrderDetails";

@Entity()
export class Dish{
    @PrimaryGeneratedColumn()
    id!:number;
    @Column()
    name:string;
    @Column()
    price:number;
    @Column()
    image:string;
    @OneToMany(()=>DishOrderDetails,(dishOrderDetails)=>dishOrderDetails.dish)
    dishOrderDetails:DishOrderDetails[];
    constructor(name:string,price:number,image:string,dishOrderDetails:DishOrderDetails[]){
        this.name=name;
        this.price=price;
        this.image=image;
        this.dishOrderDetails=dishOrderDetails;
    }
}
export default Dish;