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
exports.DishOrderService = void 0;
var DishOrderDetailsService_1 = require("./DishOrderDetailsService");
var data_source_1 = require("../data-source");
var DishOrder_1 = require("../model/DishOrder");
var UserService_1 = require("./UserService");
var detailService = new DishOrderDetailsService_1.DishOrderDetailsService();
var orderRepo = data_source_1.AppDataSource.getRepository(DishOrder_1.default);
var userService = new UserService_1.default();
var DishOrderService = (function () {
    function DishOrderService() {
    }
    DishOrderService.prototype.order = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var orderList, userId, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, detailService.createDetails(req, res)];
                    case 1:
                        orderList = _a.sent();
                        return [4, userService.yourProfile(req, res)];
                    case 2:
                        userId = (_a.sent()).id;
                        order = new DishOrder_1.default(orderList.totalAmount, "PENDING", orderList.list, { id: userId });
                        return [4, orderRepo.save(order)];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DishOrderService.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, orderRepo.find({ relations: ["user"] })];
                    case 1:
                        order = _a.sent();
                        return [2, order.map(function (_a) {
                                var id = _a.id, amount = _a.amount, status = _a.status, user = _a.user;
                                return ({ id: id, amount: amount, status: status, userId: user.id, username: user.name });
                            })];
                }
            });
        });
    };
    DishOrderService.prototype.findYourOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, userService.yourProfile(req, res)];
                    case 1:
                        userId = (_a.sent()).id;
                        console.log(userId);
                        return [4, orderRepo.find({ where: { user: { id: userId } } })];
                    case 2:
                        order = _a.sent();
                        return [2, order.map(function (_a) {
                                var id = _a.id, amount = _a.amount, status = _a.status;
                                return ({ id: id, amount: amount, status: status });
                            })];
                }
            });
        });
    };
    DishOrderService.prototype.cancel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, orderId, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, userService.yourProfile(req, res)];
                    case 1:
                        user = _a.sent();
                        orderId = Number(req.params.id);
                        return [4, orderRepo.findOne({ where: { id: orderId }, relations: ["user"] })];
                    case 2:
                        order = _a.sent();
                        if (order == null)
                            throw new Error("not exist");
                        if (order.user.id != user.id)
                            throw new Error("you don't have permission");
                        if (order.status == "SUCCESS")
                            throw new Error("can't do it");
                        orderRepo.update({ id: orderId }, { status: "CANCEL" });
                        return [2];
                }
            });
        });
    };
    DishOrderService.prototype.setStatusSuccess = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, orderRepo.findOne({ where: { id: Number(orderId) }, relations: ["user"] })];
                    case 1:
                        order = _a.sent();
                        if (order == null)
                            throw new Error("not exist");
                        if (order.status === "CANCEL")
                            throw new Error("canceled");
                        orderRepo.update({ id: orderId }, { status: "SUCCESS" });
                        return [2];
                }
            });
        });
    };
    DishOrderService.prototype.getTotalAmountForPay = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, orderRepo.findOneBy({ id: orderId })];
                    case 1:
                        order = _a.sent();
                        if (order == null || order.status === "CANCEL" || order.status === "SUCCESS")
                            throw new Error("not found order");
                        return [2, order.amount];
                }
            });
        });
    };
    return DishOrderService;
}());
exports.DishOrderService = DishOrderService;
//# sourceMappingURL=DishOrderService.js.map