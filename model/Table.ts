import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import TableOrder from "./TableOrder";

@Entity()
export class Table{
    @PrimaryGeneratedColumn()
    id!:number;
    @Column()
    capacity:number;
    @Column()
    status:boolean;
    @OneToMany(()=>TableOrder,(tableOrder)=>tableOrder.table)
    tableOrder:TableOrder[];
    constructor(capacity:number,status:boolean,tableOrder:TableOrder[]){
        this.capacity=capacity;
        this.status=status;
        this.tableOrder=tableOrder;
    }
}
export default Table;