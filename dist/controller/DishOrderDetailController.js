"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishOrderDetailController = void 0;
const DishOrderDetailsService_1 = require("../service/DishOrderDetailsService");
const service = new DishOrderDetailsService_1.DishOrderDetailsService();
class DishOrderDetailController {
    static async detail(req, res) {
        try {
            return res.status(200).json(await service.findOrderDetail(req, res));
        }
        catch (e) {
            console.log(e.stack);
            return res.status(400).json({ message: e.message });
        }
    }
}
exports.DishOrderDetailController = DishOrderDetailController;
//# sourceMappingURL=DishOrderDetailController.js.map