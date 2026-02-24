import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import Dish from "./Dish";
import DishOrder from "./DishOrder";

@Entity()
export class DishOrderDetails{
    @PrimaryColumn()
    dishOrderId!:number;
    @PrimaryColumn()
    dishId!:number;
    @Column()
    quantity:number;
    @Column()
    priceOf1:number;
    @ManyToOne(()=>Dish,(dish)=>dish.dishOrderDetails)
    @JoinColumn({ name: 'dishId' })
    dish:Dish;
    
    @ManyToOne(()=>DishOrder,(dishOrder)=>dishOrder.dishOrderDetails)
    @JoinColumn({ name: 'dishOrderId' })
    dishOrder:DishOrder;
    constructor(dishId:number,quantity:number,priceOf1:number){
        this.dishId=dishId
        this.quantity=quantity
        this.priceOf1=priceOf1
    }
    
}