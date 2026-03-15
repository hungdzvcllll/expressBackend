"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DishOrderDetailController_1 = require("../controller/DishOrderDetailController");
const express_1 = require("express");
const Security_1 = require("../security/Security");
const dishOrderDetailRouter = (0, express_1.Router)();
dishOrderDetailRouter.get("/details/:id", (req, res, next) => { (0, Security_1.default)(req, res, next, ["ADMIN", "USER"]); }, DishOrderDetailController_1.DishOrderDetailController.detail);
exports.default = dishOrderDetailRouter;
//# sourceMappingURL=dishOrderDetailRouter.js.map