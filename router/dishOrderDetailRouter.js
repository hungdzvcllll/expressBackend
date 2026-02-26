"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DishOrderDetailController_1 = require("../controller/DishOrderDetailController");
var express_1 = require("express");
var Security_1 = require("../security/Security");
var dishOrderDetailRouter = (0, express_1.Router)();
dishOrderDetailRouter.get("/details/:id", function (req, res, next) { (0, Security_1.default)(req, res, next, ["ADMIN", "USER"]); }, DishOrderDetailController_1.DishOrderDetailController.detail);
exports.default = dishOrderDetailRouter;
//# sourceMappingURL=dishOrderDetailRouter.js.map