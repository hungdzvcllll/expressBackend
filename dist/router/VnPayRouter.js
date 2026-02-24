"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VnPayController_1 = require("../controller/VnPayController");
const express_1 = require("express");
const Security_1 = require("../security/Security");
const VnPayRouter = (0, express_1.Router)();
VnPayRouter.get("/getLink", (req, res, next) => { (0, Security_1.default)(req, res, next, ["USER"]); }, VnPayController_1.VnPayController.getLink);
VnPayRouter.put("/paymentResult", (req, res, next) => { (0, Security_1.default)(req, res, next, ["USER"]); }, VnPayController_1.VnPayController.payResult);
exports.default = VnPayRouter;
//# sourceMappingURL=VnPayRouter.js.map