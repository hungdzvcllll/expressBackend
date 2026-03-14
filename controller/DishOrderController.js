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
exports.DishOrderController = void 0;
var DishOrderService_1 = require("service/DishOrderService");
var service = new DishOrderService_1.DishOrderService();
var DishOrderController = (function () {
    function DishOrderController() {
    }
    DishOrderController.order = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, service.order(req, res)];
                    case 1:
                        _a.sent();
                        return [2, res.status(200).json({ message: "success" })];
                    case 2:
                        e_1 = _a.sent();
                        return [2, res.status(400).json({ message: e_1.message })];
                    case 3: return [2];
                }
            });
        });
    };
    DishOrderController.cancel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, service.cancel(req, res)];
                    case 1:
                        _a.sent();
                        return [2, res.status(200).json({ message: "success" })];
                    case 2:
                        e_2 = _a.sent();
                        return [2, res.status(400).json({ message: e_2.message })];
                    case 3: return [2];
                }
            });
        });
    };
    DishOrderController.findAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res.status(200)).json;
                        return [4, service.findAll()];
                    case 1: return [2, _b.apply(_a, [_c.sent()])];
                    case 2:
                        e_3 = _c.sent();
                        return [2, res.status(400).json({ message: e_3.message })];
                    case 3: return [2];
                }
            });
        });
    };
    DishOrderController.findYourOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res.status(200)).json;
                        return [4, service.findYourOrder(req, res)];
                    case 1: return [2, _b.apply(_a, [_c.sent()])];
                    case 2:
                        e_4 = _c.sent();
                        console.log(e_4.stack);
                        return [2, res.status(400).json({ message: e_4.message })];
                    case 3: return [2];
                }
            });
        });
    };
    DishOrderController.success = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, service.setStatusSuccess(req.params.id)];
                    case 1:
                        _a.sent();
                        return [2, res.status(200).json({ message: "success" })];
                    case 2:
                        e_5 = _a.sent();
                        return [2, res.status(400).json({ message: e_5.message })];
                    case 3: return [2];
                }
            });
        });
    };
    return DishOrderController;
}());
exports.DishOrderController = DishOrderController;
//# sourceMappingURL=DishOrderController.js.map