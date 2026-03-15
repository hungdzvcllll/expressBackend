import { Request, Response } from "express";
export declare class TableService {
    findAll(): Promise<Object[]>;
    findById(req: Request, res: Response): Promise<Object>;
    add(req: Request, res: Response): Promise<void>;
    stopTable(req: Request, res: Response): Promise<void>;
    startTable(req: Request, res: Response): Promise<void>;
}
