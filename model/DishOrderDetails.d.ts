import Dish from "./Dish";
import DishOrder from "./DishOrder";
export declare class DishOrderDetails {
    dishOrderId: number;
    dishId: number;
    quantity: number;
    priceOf1: number;
    dish: Dish;
    dishOrder: DishOrder;
    constructor(dishId: number, quantity: number, priceOf1: number);
}
