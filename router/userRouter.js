"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = require("controller/UserController");
var userRouter = (0, express_1.Router)();
userRouter.post("/register", UserController_1.UserController.register);
userRouter.post("/confirmRegister", UserController_1.UserController.confirmRegister);
userRouter.post("/login", UserController_1.UserController.login);
userRouter.get("/yourInfo", UserController_1.UserController.yourProfile);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map