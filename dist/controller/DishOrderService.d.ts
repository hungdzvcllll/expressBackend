import { Request, Response } from "express";
export declare class DishOrderController {
    static order(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static cancel(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
