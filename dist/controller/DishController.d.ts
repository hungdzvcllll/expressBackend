import { Request, Response } from "express";
export declare class DishController {
    static findAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static findById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static add(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
