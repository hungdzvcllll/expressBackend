"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VnPayController_1 = require("../controller/VnPayController");
var express_1 = require("express");
var Security_1 = require("../security/Security");
var VnPayRouter = (0, express_1.Router)();
VnPayRouter.get("/getLink", function (req, res, next) { (0, Security_1.default)(req, res, next, ["USER"]); }, VnPayController_1.VnPayController.getLink);
VnPayRouter.put("/paymentResult", function (req, res, next) { (0, Security_1.default)(req, res, next, ["USER"]); }, VnPayController_1.VnPayController.payResult);
exports.default = VnPayRouter;
//# sourceMappingURL=VnPayRouter.js.map