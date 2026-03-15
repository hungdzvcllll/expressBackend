export declare class UserService {
    register(req: any, res: any): Promise<void>;
    confirmRegister(req: any, res: any): Promise<void>;
    login(req: any, res: any): Promise<any>;
    yourProfile(req: any, res: any): Promise<any>;
}
export default UserService;
