"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishOrderDetailsService = void 0;
const data_source_1 = require("data-source");
const DishOrderDetails_1 = require("model/DishOrderDetails");
const Dish_1 = require("model/Dish");
const UserService_1 = require("./UserService");
const orderDetails = data_source_1.AppDataSource.getRepository(DishOrderDetails_1.DishOrderDetails);
const dishRepo = data_source_1.AppDataSource.getRepository(Dish_1.default);
const userService = new UserService_1.default();
class DishOrderDetailsService {
    async createDetails(req, res) {
        let listOrder = req.body;
        let listRes = [];
        let price = 0;
        for (let i = 0; i < listOrder.length; i++) {
            let dish = await dishRepo.findOneBy({ id: listOrder[i].id });
            if (dish == null)
                throw new Error("dish not exist");
            listRes.push(new DishOrderDetails_1.DishOrderDetails(dish.id, listOrder[i].quantity, dish.price));
            price += listOrder[i].quantity * dish.price;
        }
        return { list: listRes, totalAmount: price };
    }
    async findOrderDetail(req, res) {
        let user = await userService.yourProfile(req, res);
        let orderId = Number(req.params.id);
        let detail = await orderDetails.find({ where: { dishOrderId: orderId }, relations: ["dish", "dishOrder", "dishOrder.user"] });
        if (detail.length == 0)
            throw new Error("not found");
        if (user.role != "ADMIN" && user.id != detail[0].dishOrder.user.id)
            throw new Error("you don't have permission");
        return detail.map(({ dishOrderId, dishId, quantity, priceOf1, dish }) => ({ dishOrderId, dishId, quantity, priceOf1, dishname: dish.name }));
    }
}
exports.DishOrderDetailsService = DishOrderDetailsService;
//# sourceMappingURL=DishOrderDetailsService.js.map