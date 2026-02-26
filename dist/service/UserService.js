"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt = require("bcrypt");
const User_1 = require("model/User");
const MailService_1 = require("./MailService");
const data_source_1 = require("data-source");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const jwt = require('jsonwebtoken');
const userRepository = data_source_1.AppDataSource.getRepository(User_1.default);
const mailService = new MailService_1.MailService();
class UserService {
    async register(req, res) {
        const { username, password, email, phone } = req.body;
        let newPass = await bcrypt.hash(password, 10);
        const crypto = require("crypto");
        let code = Math.floor(100000 + Math.random() * 900000).toString();
        let user = await userRepository.findOne({ where: { name: username } });
        if (user != null)
            throw new Error("change the username");
        const now = new Date();
        mailService.sendEmail(email, code);
        let userSave = new User_1.default(username, newPass, phone, "USER", [], [], false, new Date(now.getTime() + 60 * 60 * 1000), email, code);
        await userRepository.save(userSave);
    }
    async confirmRegister(req, res) {
        const { username, code } = req.body;
        let user = await userRepository.findOne({ where: { name: username } });
        if (user == null)
            throw new Error("user not exist");
        if (user.registerCode != code)
            throw new Error("code not true");
        const now = new Date();
        if (now > user.registerExpired)
            throw new Error("expired");
        await userRepository.update({ name: username }, { registerStatus: true });
    }
    async login(req, res) {
        const { username, password } = req.body;
        let user = await userRepository.findOne({ where: { name: username } });
        if (!user || user.registerStatus === false)
            return res.status(401).json({ message: 'Not found user' });
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Not true password' });
        const payload = {
            id: user.id,
            username: user.name,
            role: user.role,
            phone: user.phone,
            email: user.email
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        return { token: token, role: user.role };
    }
    async yourProfile(req, res) {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    }
}
exports.UserService = UserService;
exports.default = UserService;
//# sourceMappingURL=UserService.js.map