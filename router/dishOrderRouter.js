"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DishOrderController_1 = require("controller/DishOrderController");
var express_1 = require("express");
var Security_1 = require("security/Security");
var dishOrderRouter = (0, express_1.Router)();
dishOrderRouter.post("/order", function (req, res, next) { (0, Security_1.default)(req, res, next, ["USER"]); }, DishOrderController_1.DishOrderController.order);
dishOrderRouter.put("/cancel/:id", function (req, res, next) { (0, Security_1.default)(req, res, next, ["USER"]); }, DishOrderController_1.DishOrderController.cancel);
dishOrderRouter.get("/findAll", function (req, res, next) { (0, Security_1.default)(req, res, next, ["ADMIN"]); }, DishOrderController_1.DishOrderController.findAll);
dishOrderRouter.get("/findYourOrder", function (req, res, next) { (0, Security_1.default)(req, res, next, ["USER"]); }, DishOrderController_1.DishOrderController.findYourOrder);
dishOrderRouter.put("/success/:id", function (req, res, next) { (0, Security_1.default)(req, res, next, ["ADMIN"]); }, DishOrderController_1.DishOrderController.success);
exports.default = dishOrderRouter;
//# sourceMappingURL=dishOrderRouter.js.map