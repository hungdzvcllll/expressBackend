import { Request, Response } from "express";
export declare class VnPayService {
    getLink(req: Request, res: Response): Promise<string>;
    payResult(req: Request, res: Response): Promise<void>;
}
