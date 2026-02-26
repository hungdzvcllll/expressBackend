"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DishOrderController_1 = require("controller/DishOrderController");
const express_1 = require("express");
const Security_1 = require("security/Security");
const dishOrderRouter = (0, express_1.Router)();
dishOrderRouter.post("/order", (req, res, next) => { (0, Security_1.default)(req, res, next, ["USER"]); }, DishOrderController_1.DishOrderController.order);
dishOrderRouter.put("/cancel/:id", (req, res, next) => { (0, Security_1.default)(req, res, next, ["USER"]); }, DishOrderController_1.DishOrderController.cancel);
dishOrderRouter.get("/findAll", (req, res, next) => { (0, Security_1.default)(req, res, next, ["ADMIN"]); }, DishOrderController_1.DishOrderController.findAll);
dishOrderRouter.get("/findYourOrder", (req, res, next) => { (0, Security_1.default)(req, res, next, ["USER"]); }, DishOrderController_1.DishOrderController.findYourOrder);
dishOrderRouter.put("/success/:id", (req, res, next) => { (0, Security_1.default)(req, res, next, ["ADMIN"]); }, DishOrderController_1.DishOrderController.success);
exports.default = dishOrderRouter;
//# sourceMappingURL=dishOrderRouter.js.map