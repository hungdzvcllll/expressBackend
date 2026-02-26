"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VnPayController = void 0;
const VnPayService_1 = require("service/VnPayService");
const service = new VnPayService_1.VnPayService();
class VnPayController {
    static async getLink(req, res) {
        try {
            return res.status(200).json({ mesage: await service.getLink(req, res) });
        }
        catch (e) {
            console.log(e.stack);
            return res.status(400).json({ message: e.message });
        }
    }
    static async payResult(req, res) {
        try {
            return res.status(200).json({ mesage: await service.payResult(req, res) });
        }
        catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }
}
exports.VnPayController = VnPayController;
//# sourceMappingURL=VnPayController.js.map