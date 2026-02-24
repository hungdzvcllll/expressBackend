import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";
import Table from "./Table";

@Entity()
export class TableOrder{
    @PrimaryGeneratedColumn()
    id!:number;
    @Column()
    start:Date;
    @Column()
    end:Date;
    @Column()
    status:boolean
    @ManyToOne(()=>User,(user)=>user.tableOrder)
    user:User;
    @ManyToOne(()=>Table,(table)=>table.tableOrder)
    table:Table;
    constructor(start:Date,end:Date,user:User,table:Table,status:boolean){
        this.start=start;
        this.end=end;
        this.user=user;
        this.table=table;
        this.status=status;
    }
}
export default TableOrder;