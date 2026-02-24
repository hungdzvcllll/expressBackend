"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishOrderController = void 0;
const DishOrderService_1 = require("../service/DishOrderService");
const service = new DishOrderService_1.DishOrderService();
class DishOrderController {
    static async order(req, res) {
        try {
            await service.order(req, res);
            return res.status(200).json({ message: "success" });
        }
        catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }
    static async cancel(req, res) {
        try {
            await service.cancel(req, res);
            return res.status(200).json({ message: "success" });
        }
        catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }
}
exports.DishOrderController = DishOrderController;
//# sourceMappingURL=DishOrderService.js.map