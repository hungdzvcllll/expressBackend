import { Request, Response } from "express";
export declare class DishOrderService {
    order(req: Request, res: Response): Promise<void>;
    findAll(): Promise<{
        id: number;
        amount: number;
        status: string;
        userId: number;
        username: string;
    }[]>;
    findYourOrder(req: Request, res: Response): Promise<{
        id: number;
        amount: number;
        status: string;
    }[]>;
    cancel(req: Request, res: Response): Promise<void>;
    setStatusSuccess(orderId: any): Promise<void>;
    getTotalAmountForPay(orderId: number): Promise<number>;
}
