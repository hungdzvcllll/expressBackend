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
exports.DishOrderDetailsService = void 0;
var data_source_1 = require("data-source");
var DishOrderDetails_1 = require("model/DishOrderDetails");
var Dish_1 = require("model/Dish");
var UserService_1 = require("./UserService");
var orderDetails = data_source_1.AppDataSource.getRepository(DishOrderDetails_1.DishOrderDetails);
var dishRepo = data_source_1.AppDataSource.getRepository(Dish_1.default);
var userService = new UserService_1.default();
var DishOrderDetailsService = (function () {
    function DishOrderDetailsService() {
    }
    DishOrderDetailsService.prototype.createDetails = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var listOrder, listRes, price, i, dish;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        listOrder = req.body;
                        listRes = [];
                        price = 0;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < listOrder.length)) return [3, 4];
                        return [4, dishRepo.findOneBy({ id: listOrder[i].id })];
                    case 2:
                        dish = _a.sent();
                        if (dish == null)
                            throw new Error("dish not exist");
                        listRes.push(new DishOrderDetails_1.DishOrderDetails(dish.id, listOrder[i].quantity, dish.price));
                        price += listOrder[i].quantity * dish.price;
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4: return [2, { list: listRes, totalAmount: price }];
                }
            });
        });
    };
    DishOrderDetailsService.prototype.findOrderDetail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, orderId, detail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, userService.yourProfile(req, res)];
                    case 1:
                        user = _a.sent();
                        orderId = Number(req.params.id);
                        return [4, orderDetails.find({ where: { dishOrderId: orderId }, relations: ["dish", "dishOrder", "dishOrder.user"] })];
                    case 2:
                        detail = _a.sent();
                        if (detail.length == 0)
                            throw new Error("not found");
                        if (user.role != "ADMIN" && user.id != detail[0].dishOrder.user.id)
                            throw new Error("you don't have permission");
                        return [2, detail.map(function (_a) {
                                var dishOrderId = _a.dishOrderId, dishId = _a.dishId, quantity = _a.quantity, priceOf1 = _a.priceOf1, dish = _a.dish;
                                return ({ dishOrderId: dishOrderId, dishId: dishId, quantity: quantity, priceOf1: priceOf1, dishname: dish.name });
                            })];
                }
            });
        });
    };
    return DishOrderDetailsService;
}());
exports.DishOrderDetailsService = DishOrderDetailsService;
//# sourceMappingURL=DishOrderDetailsService.js.map