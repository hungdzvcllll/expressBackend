"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishOrderService = void 0;
const DishOrderDetailsService_1 = require("./DishOrderDetailsService");
const data_source_1 = require("../data-source");
const DishOrder_1 = require("../model/DishOrder");
const UserService_1 = require("./UserService");
const detailService = new DishOrderDetailsService_1.DishOrderDetailsService();
const orderRepo = data_source_1.AppDataSource.getRepository(DishOrder_1.default);
const userService = new UserService_1.default();
class DishOrderService {
    async order(req, res) {
        let orderList = await detailService.createDetails(req, res);
        let userId = (await userService.yourProfile(req, res)).id;
        let order = new DishOrder_1.default(orderList.totalAmount, "PENDING", orderList.list, { id: userId });
        await orderRepo.save(order);
    }
    async findAll() {
        let order = await orderRepo.find({ relations: ["user"] });
        return order.map(({ id, amount, status, user }) => ({ id, amount, status, userId: user.id, username: user.name }));
    }
    async findYourOrder(req, res) {
        let userId = (await userService.yourProfile(req, res)).id;
        console.log(userId);
        let order = await orderRepo.find({ where: { user: { id: userId } } });
        return order.map(({ id, amount, status }) => ({ id, amount, status }));
    }
    async cancel(req, res) {
        let user = await userService.yourProfile(req, res);
        let orderId = Number(req.params.id);
        let order = await orderRepo.findOne({ where: { id: orderId }, relations: ["user"] });
        if (order == null)
            throw new Error("not exist");
        if (order.user.id != user.id)
            throw new Error("you don't have permission");
        if (order.status == "SUCCESS")
            throw new Error("can't do it");
        orderRepo.update({ id: orderId }, { status: "CANCEL" });
    }
    async setStatusSuccess(orderId) {
        let order = await orderRepo.findOne({ where: { id: Number(orderId) }, relations: ["user"] });
        if (order == null)
            throw new Error("not exist");
        if (order.status === "CANCEL")
            throw new Error("canceled");
        orderRepo.update({ id: orderId }, { status: "SUCCESS" });
    }
    async getTotalAmountForPay(orderId) {
        let order = await orderRepo.findOneBy({ id: orderId });
        if (order == null || order.status === "CANCEL" || order.status === "SUCCESS")
            throw new Error("not found order");
        return order.amount;
    }
}
exports.DishOrderService = DishOrderService;
//# sourceMappingURL=DishOrderService.js.map