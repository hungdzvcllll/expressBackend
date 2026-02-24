import { Request, Response } from "express";
export declare class TableController {
    static findAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static findById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static add(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static stop(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static start(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
