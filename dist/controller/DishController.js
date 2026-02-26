"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishController = void 0;
const DishService_1 = require("service/DishService");
const dishService = new DishService_1.DishService();
class DishController {
    static async findAll(req, res) {
        try {
            return res.status(200).json(await dishService.findAll());
        }
        catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }
    static async findById(req, res) {
        try {
            return res.status(200).json(await dishService.findById(req, res));
        }
        catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }
    static async add(req, res) {
        try {
            await dishService.add(req, res);
            return res.status(201).json({ message: "success" });
        }
        catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }
}
exports.DishController = DishController;
//# sourceMappingURL=DishController.js.map