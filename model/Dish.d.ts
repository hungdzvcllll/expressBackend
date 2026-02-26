import { DishOrderDetails } from "./DishOrderDetails";
export declare class Dish {
    id: number;
    name: string;
    price: number;
    image: string;
    dishOrderDetails: DishOrderDetails[];
    constructor(name: string, price: number, image: string, dishOrderDetails: DishOrderDetails[]);
}
export default Dish;
