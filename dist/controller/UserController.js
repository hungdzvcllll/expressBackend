"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../service/UserService");
const userService = new UserService_1.UserService();
class UserController {
    static async register(req, res) {
        try {
            await userService.register(req, res);
            return res.status(201).json({ message: "please check your email" });
        }
        catch (e) {
            console.log(e.stack);
            return res.status(400).json({ message1: e.message });
        }
    }
    static async confirmRegister(req, res) {
        try {
            await userService.confirmRegister(req, res);
            return res.status(201).json({ message: "success" });
        }
        catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }
    static async login(req, res) {
        try {
            let loginResult = await userService.login(req, res);
            return res.status(201).json(loginResult);
        }
        catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }
    static async yourProfile(req, res) {
        try {
            let profile = await userService.yourProfile(req, res);
            return res.status(201).json(profile);
        }
        catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map