"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableService = void 0;
const data_source_1 = require("../data-source");
const Table_1 = require("../model/Table");
const tableRepo = data_source_1.AppDataSource.getRepository(Table_1.default);
class TableService {
    async findAll() {
        let list = await tableRepo.find();
        let res = [];
        for (let i = 0; i < list.length; i++) {
            res.push({ id: list[i].id, capacity: list[i].capacity, status: list[i].status });
        }
        return res;
    }
    async findById(req, res) {
        let tblId = Number(req.params.id);
        let tbl = await tableRepo.findOneBy({ id: tblId });
        if (tbl == null)
            return {};
        return { id: tbl.id, capacity: tbl.capacity, status: tbl.status };
    }
    async add(req, res) {
        let { capacity, status } = req.body;
        let tbl = new Table_1.default(capacity, status, []);
        await tableRepo.save(tbl);
    }
    async stopTable(req, res) {
        let tableId = Number(req.params.id);
        tableRepo.update({ id: tableId }, { status: false });
    }
    async startTable(req, res) {
        let tableId = Number(req.params.id);
        tableRepo.update({ id: tableId }, { status: true });
    }
}
exports.TableService = TableService;
//# sourceMappingURL=TableService.js.map