import User from "./User";
import { DishOrderDetails } from "./DishOrderDetails";
export declare class DishOrder {
    id: number;
    amount: number;
    status: string;
    user: User;
    dishOrderDetails: DishOrderDetails[];
    constructor(amount: number, status: string, dishOrderDetails: DishOrderDetails[], user: User);
}
export default DishOrder;
