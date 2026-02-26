import { Request, Response } from "express";
export declare class DishService {
    findAll(): Promise<Object[]>;
    findById(req: Request, res: Response): Promise<Object>;
    add(req: Request, res: Response): Promise<void>;
}
