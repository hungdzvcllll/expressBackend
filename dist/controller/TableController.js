"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableController = void 0;
const TableService_1 = require("../service/TableService");
const service = new TableService_1.TableService();
class TableController {
    static async findAll(req, res) {
        try {
            return res.status(200).json(await service.findAll());
        }
        catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }
    static async findById(req, res) {
        try {
            return res.status(200).json(await service.findById(req, res));
        }
        catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }
    static async add(req, res) {
        try {
            await service.add(req, res);
            return res.status(200).json({ message: "success" });
        }
        catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }
    static async stop(req, res) {
        try {
            await service.stopTable(req, res);
            return res.status(200).json({ message: "success" });
        }
        catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }
    static async start(req, res) {
        try {
            await service.startTable(req, res);
            return res.status(200).json({ message: "success" });
        }
        catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }
}
exports.TableController = TableController;
//# sourceMappingURL=TableController.js.map