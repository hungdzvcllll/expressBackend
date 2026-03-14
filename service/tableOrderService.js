"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableOrderService = void 0;
var data_source_1 = require("data-source");
var TableOrder_1 = require("model/TableOrder");
var Table_1 = require("model/Table");
var UserService_1 = require("./UserService");
var typeorm_1 = require("typeorm");
var Orderrepo = data_source_1.AppDataSource.getRepository(TableOrder_1.default);
var tableRepo = data_source_1.AppDataSource.getRepository(Table_1.Table);
var userService = new UserService_1.default();
var TableOrderService = (function () {
    function TableOrderService() {
    }
    TableOrderService.prototype.checkIfYouCanOrder = function (tableId, startTime, endTime) {
        return __awaiter(this, void 0, void 0, function () {
            var tableOrdered;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (startTime.getHours() <= 5 || endTime.getHours() >= 22)
                            throw new Error("please order between 6h and 22h");
                        if (startTime >= endTime || startTime < new Date())
                            throw new Error("invalid");
                        return [4, tableRepo.findOneBy({ id: tableId, status: true })];
                    case 1:
                        if ((_a.sent()) == null)
                            throw new Error("not found table");
                        return [4, Orderrepo.query("select * from table_order where tableId=? and ((start>? and start<?)or(end>? and end<?))", [tableId, startTime, endTime, startTime, endTime])];
                    case 2:
                        tableOrdered = _a.sent();
                        if (tableOrdered.length != 0)
                            throw new Error("please order in another time");
                        return [2];
                }
            });
        });
    };
    TableOrderService.prototype.order = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, tableId, start, end, userId, _b, order;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, tableId = _a.tableId, start = _a.start, end = _a.end;
                        return [4, this.checkIfYouCanOrder(Number(tableId), new Date(start), new Date(end))];
                    case 1:
                        _c.sent();
                        _b = Number;
                        return [4, userService.yourProfile(req, res)];
                    case 2:
                        userId = _b.apply(void 0, [(_c.sent()).id]);
                        order = new TableOrder_1.default(new Date(start), new Date(end), { id: userId }, { id: tableId }, true);
                        return [4, Orderrepo.save(order)];
                    case 3:
                        _c.sent();
                        return [2];
                }
            });
        });
    };
    TableOrderService.prototype.cancel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var orderId, userId, _a, order;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        orderId = Number(req.params.id);
                        _a = Number;
                        return [4, userService.yourProfile(req, res)];
                    case 1:
                        userId = _a.apply(void 0, [(_b.sent()).id]);
                        console.log(orderId + " " + userId);
                        return [4, Orderrepo.findOne({ where: { id: orderId }, relations: ["user"] })];
                    case 2:
                        order = _b.sent();
                        if (order == null || order.user.id != userId || new Date() >= order.start)
                            throw new Error("you can't cancel this");
                        order.status = false;
                        Orderrepo.save(order);
                        return [2];
                }
            });
        });
    };
    TableOrderService.prototype.findAllOrder = function () {
        return __awaiter(this, void 0, void 0, function () {
            var orderList, res, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Orderrepo.find({ relations: ["user", "table"] })];
                    case 1:
                        orderList = _a.sent();
                        res = [];
                        for (i = 0; i < orderList.length; i++) {
                            res.push({ id: orderList[i].id, start: orderList[i].start,
                                end: orderList[i].end, status: orderList[i].status, tableId: orderList[i].table.id,
                                userId: orderList[i].user.id, username: orderList[i].user.name });
                        }
                        return [2, res];
                }
            });
        });
    };
    TableOrderService.prototype.findYourOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, orderList, result, i, obj;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Number;
                        return [4, userService.yourProfile(req, res)];
                    case 1:
                        userId = _a.apply(void 0, [(_b.sent()).id]);
                        return [4, Orderrepo.find({ where: { user: { id: userId } }, relations: ["user", "table"] })];
                    case 2:
                        orderList = _b.sent();
                        result = [];
                        for (i = 0; i < orderList.length; i++) {
                            obj = { id: orderList[i].id, start: orderList[i].start,
                                end: orderList[i].end, status: orderList[i].status, tableId: orderList[i].table.id,
                                userId: orderList[i].user.id, username: orderList[i].user.name };
                            result.push(obj);
                        }
                        console.log(result);
                        return [2, result];
                }
            });
        });
    };
    TableOrderService.prototype.getFreeTime = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var date, tableId, getDate, nextDay, list, result, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = String(req.query.date);
                        tableId = Number(req.query.tableId);
                        getDate = new Date(date);
                        nextDay = new Date(getDate.getTime() + 24 * 60 * 60 * 1000);
                        return [4, Orderrepo.find({ where: { table: { id: tableId }, start: (0, typeorm_1.Between)(getDate, nextDay) }, order: { start: "ASC" } })];
                    case 1:
                        list = _a.sent();
                        if (list.length == 0)
                            return [2, [{ start: "6h00", end: "22h00" }]];
                        result = [];
                        for (i = 0; i < list.length; i++) {
                            if (i === 0)
                                result.push({ start: "6h00", end: list[i].start.getHours() + "h" + list[i].start.getMinutes() });
                            if (i < list.length - 1)
                                result.push({ start: list[i].end.getHours() + "h" + list[i].end.getMinutes(),
                                    end: list[i + 1].start.getHours() + "h" + list[i + 1].start.getMinutes() });
                            if (i === list.length - 1) {
                                result.push({ start: list[i].end.getHours() + "h" + list[i].end.getMinutes(), end: "22h00" });
                            }
                        }
                        return [2, result];
                }
            });
        });
    };
    return TableOrderService;
}());
exports.TableOrderService = TableOrderService;
//# sourceMappingURL=tableOrderService.js.map