"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishOrderDetails = void 0;
var typeorm_1 = require("typeorm");
var Dish_1 = require("./Dish");
var DishOrder_1 = require("./DishOrder");
var DishOrderDetails = (function () {
    function DishOrderDetails(dishId, quantity, priceOf1) {
        this.dishId = dishId;
        this.quantity = quantity;
        this.priceOf1 = priceOf1;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", Number)
    ], DishOrderDetails.prototype, "dishOrderId", void 0);
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", Number)
    ], DishOrderDetails.prototype, "dishId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], DishOrderDetails.prototype, "quantity", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], DishOrderDetails.prototype, "priceOf1", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Dish_1.default; }, function (dish) { return dish.dishOrderDetails; }),
        (0, typeorm_1.JoinColumn)({ name: 'dishId' }),
        __metadata("design:type", Dish_1.default)
    ], DishOrderDetails.prototype, "dish", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return DishOrder_1.default; }, function (dishOrder) { return dishOrder.dishOrderDetails; }),
        (0, typeorm_1.JoinColumn)({ name: 'dishOrderId' }),
        __metadata("design:type", DishOrder_1.default)
    ], DishOrderDetails.prototype, "dishOrder", void 0);
    DishOrderDetails = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [Number, Number, Number])
    ], DishOrderDetails);
    return DishOrderDetails;
}());
exports.DishOrderDetails = DishOrderDetails;
//# sourceMappingURL=DishOrderDetails.js.map