"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var TableOrderController_1 = require("controller/TableOrderController");
var Security_1 = require("security/Security");
var tableOrderRouter = (0, express_1.Router)();
tableOrderRouter.post("/order", function (req, res, next) { (0, Security_1.default)(req, res, next, ["USER"]); }, TableOrderController_1.TableOrderController.order);
tableOrderRouter.put("/cancel/:id", function (req, res, next) { (0, Security_1.default)(req, res, next, ["USER"]); }, TableOrderController_1.TableOrderController.cancel);
tableOrderRouter.get("/findAll", function (req, res, next) {
    (0, Security_1.default)(req, res, next, ["ADMIN"]);
}, TableOrderController_1.TableOrderController.findAll);
tableOrderRouter.get("/findYourOrder", function (req, res, next) {
    (0, Security_1.default)(req, res, next, ["USER"]);
}, TableOrderController_1.TableOrderController.findYourOrder);
tableOrderRouter.get("/freeTime", function (req, res, next) {
    (0, Security_1.default)(req, res, next, ["USER"]);
}, TableOrderController_1.TableOrderController.freeTime);
exports.default = tableOrderRouter;
//# sourceMappingURL=tableOrderRouter.js.map