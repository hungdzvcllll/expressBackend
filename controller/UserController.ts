import {UserService} from "service/UserService"
import {Request,Response}from "express"
const userService=new UserService();
export class UserController{
    
    static async register(req,res){
        try{
            await userService.register(req,res);
            return res.status(201).json({message:"please check your email"});
        }
        catch(e){
            console.log(e.stack);
            return res.status(400).json({message1:e.message});
        }
    }
    static async confirmRegister(req,res){
        try{
            await userService.confirmRegister(req,res);
            return res.status(201).json({message:"success"});
        }
        catch(e){
            return res.status(400).json({message:e.message});
        }
    }
    static async login(req:Request,res:Response){
        try{
            let loginResult=await userService.login(req,res);
            return res.status(201).json(loginResult);
        }
        catch(e){
            return res.status(400).json({message:e.message});
        }
    }
    static async yourProfile(req:Request,res:Response){
        try{
            let profile=await userService.yourProfile(req,res);
            return res.status(201).json(profile);
        }
        catch(e){
            return res.status(400).json({message:e.message});
        }
    }

}