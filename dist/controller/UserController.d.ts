import { Request, Response } from "express";
export declare class UserController {
    static register(req: any, res: any): Promise<any>;
    static confirmRegister(req: any, res: any): Promise<any>;
    static login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static yourProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
