"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableOrderController = void 0;
const tableOrderService_1 = require("../service/tableOrderService");
const service = new tableOrderService_1.TableOrderService();
class TableOrderController {
    static async order(req, res) {
        try {
            await service.order(req, res);
            return res.status(200).json({ message: "success" });
        }
        catch (e) {
            console.log(e.stack);
            return res.status(400).json({ message: e.message });
        }
    }
    static async cancel(req, res) {
        try {
            await service.cancel(req, res);
            return res.status(200).json({ message: "success" });
        }
        catch (e) {
            console.log(e.stack);
            return res.status(400).json({ message: e.message });
        }
    }
    static async findAll(req, res) {
        try {
            return res.status(200).json(await service.findAllOrder());
        }
        catch (e) {
            console.log(e.stack);
            return res.status(400).json({ message: e.message });
        }
    }
    static async findYourOrder(req, res) {
        try {
            return res.status(200).json(await service.findYourOrder(req, res));
        }
        catch (e) {
            console.log(e.stack);
            return res.status(400).json({ message: e.message });
        }
    }
    static async freeTime(req, res) {
        try {
            return res.status(200).json(await service.getFreeTime(req, res));
        }
        catch (e) {
            console.log(e.stack);
            return res.status(400).json({ message: e.message });
        }
    }
}
exports.TableOrderController = TableOrderController;
//# sourceMappingURL=TableOrderController.js.map