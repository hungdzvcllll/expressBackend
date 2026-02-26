import { TableOrder } from "./TableOrder";
import DishOrder from "./DishOrder";
export declare class User {
    id: number;
    name: string;
    password: string;
    phone: string;
    role: string;
    email: string;
    registerCode: string;
    registerExpired: Date;
    registerStatus: boolean;
    tableOrder: TableOrder[];
    dishOrder: DishOrder[];
    constructor(name: string, password: string, phone: string, role: string, tableOrder: TableOrder[], dishOrder: DishOrder[], registerStatus: boolean, registerExpired: Date, email: string, registerCode: string);
}
export default User;
