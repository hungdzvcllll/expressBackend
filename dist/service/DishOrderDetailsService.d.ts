import { Request, Response } from "express";
export declare class DishOrderDetailsService {
    createDetails(req: Request, res: Response): Promise<any>;
    findOrderDetail(req: Request, res: Response): Promise<{
        dishOrderId: number;
        dishId: number;
        quantity: number;
        priceOf1: number;
        dishname: string;
    }[]>;
}
