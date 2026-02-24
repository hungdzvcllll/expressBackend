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
exports.DishOrder = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const DishOrderDetails_1 = require("./DishOrderDetails");
let DishOrder = class DishOrder {
    id;
    amount;
    status;
    user;
    dishOrderDetails;
    constructor(amount, status, dishOrderDetails, user) {
        this.amount = amount;
        this.status = status;
        this.dishOrderDetails = dishOrderDetails;
        this.user = user;
    }
};
exports.DishOrder = DishOrder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DishOrder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DishOrder.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DishOrder.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.default, (user) => user.dishOrder),
    __metadata("design:type", User_1.default)
], DishOrder.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DishOrderDetails_1.DishOrderDetails, (dishOrderDetails) => dishOrderDetails.dishOrder, { cascade: true }),
    __metadata("design:type", Array)
], DishOrder.prototype, "dishOrderDetails", void 0);
exports.DishOrder = DishOrder = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Number, String, Array, User_1.default])
], DishOrder);
exports.default = DishOrder;
//# sourceMappingURL=DishOrder.js.map