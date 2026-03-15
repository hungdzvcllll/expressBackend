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
exports.Dish = void 0;
const typeorm_1 = require("typeorm");
const DishOrderDetails_1 = require("./DishOrderDetails");
let Dish = class Dish {
    id;
    name;
    price;
    image;
    dishOrderDetails;
    constructor(name, price, image, dishOrderDetails) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.dishOrderDetails = dishOrderDetails;
    }
};
exports.Dish = Dish;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Dish.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Dish.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Dish.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Dish.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DishOrderDetails_1.DishOrderDetails, (dishOrderDetails) => dishOrderDetails.dish),
    __metadata("design:type", Array)
], Dish.prototype, "dishOrderDetails", void 0);
exports.Dish = Dish = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [String, Number, String, Array])
], Dish);
exports.default = Dish;
//# sourceMappingURL=Dish.js.map