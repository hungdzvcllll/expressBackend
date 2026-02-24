import { Request, Response } from "express";
export declare class TableOrderService {
    checkIfYouCanOrder(tableId: number, startTime: Date, endTime: Date): Promise<void>;
    order(req: Request, res: Response): Promise<void>;
    cancel(req: Request, res: Response): Promise<void>;
    findAllOrder(): Promise<Object[]>;
    findYourOrder(req: Request, res: Response): Promise<Object[]>;
    getFreeTime(req: Request, res: Response): Promise<Object[] | {
        start: string;
        end: string;
    }[]>;
}
