import * as bcrypt from 'bcrypt';
import User from 'model/User';
import { Repository } from 'typeorm';
import { MailService } from './MailService';
import { AppDataSource } from 'data-source';
require('dotenv').config();
const JWT_SECRET=process.env.JWT_SECRET_KEY;
const jwt = require('jsonwebtoken');
const userRepository= AppDataSource.getRepository(User);
const mailService=new MailService();
export class UserService{
   
    async register(req,res){
        const {username,password,email,phone}=req.body;
        let newPass:string=await bcrypt.hash(password,10);
        const crypto = require("crypto");
        let code:string= Math.floor(100000 + Math.random() * 900000).toString();
        let user:User|null=await userRepository.findOne({where:{name:username}})
            if(user!=null)
                throw new Error("change the username");
        const now = new Date();
        mailService.sendEmail(email,code);
        let userSave=new User(username,newPass,phone,"USER",[],[],false,new Date(now.getTime() + 60 * 60 * 1000),email,code);
        await userRepository.save(userSave);
    }
    async confirmRegister(req,res){
        const {username,code}=req.body;
        let user:User|null=await userRepository.findOne({where:{name:username}});
        if(user==null)
            throw new Error("user not exist");
        if(user.registerCode!=code)
            throw new Error("code not true");
        const now = new Date();
        if(now>user.registerExpired)
            throw new Error("expired");
        await userRepository.update({name:username},{registerStatus:true});
    }
    async login(req,res){
      
        const {username,password}=req.body;
        let user:User|null=await userRepository.findOne({where:{name:username}});
        if (!user||user.registerStatus===false)
            return res.status(401).json({ message: 'Not found user' });
        let isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(401).json({ message: 'Not true password' });
        const payload = {
            id: user.id,
            username: user.name,
            role: user.role,
            phone:user.phone,
            email:user.email
        };
       // Sign token
       const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

       return {token:token,role:user.role}
    }
    async yourProfile(req,res){

        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    }
    
}
export default UserService;
