import { Request, Response } from "express";
export declare class VnPayController {
    static getLink(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static payResult(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
