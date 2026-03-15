"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TableOrderController_1 = require("../controller/TableOrderController");
const Security_1 = require("../security/Security");
const tableOrderRouter = (0, express_1.Router)();
tableOrderRouter.post("/order", (req, res, next) => { (0, Security_1.default)(req, res, next, ["USER"]); }, TableOrderController_1.TableOrderController.order);
tableOrderRouter.put("/cancel/:id", (req, res, next) => { (0, Security_1.default)(req, res, next, ["USER"]); }, TableOrderController_1.TableOrderController.cancel);
tableOrderRouter.get("/findAll", (req, res, next) => {
    (0, Security_1.default)(req, res, next, ["ADMIN"]);
}, TableOrderController_1.TableOrderController.findAll);
tableOrderRouter.get("/findYourOrder", (req, res, next) => {
    (0, Security_1.default)(req, res, next, ["USER"]);
}, TableOrderController_1.TableOrderController.findYourOrder);
tableOrderRouter.get("/freeTime", (req, res, next) => {
    (0, Security_1.default)(req, res, next, ["USER"]);
}, TableOrderController_1.TableOrderController.freeTime);
exports.default = tableOrderRouter;
//# sourceMappingURL=tableOrderRouter.js.map