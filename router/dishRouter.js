"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Security_1 = require("security/Security");
var express_1 = require("express");
var DishController_1 = require("controller/DishController");
var FileHandles_1 = require("FileHandle/FileHandles");
var express = require("express");
var dishRouter = (0, express_1.Router)();
dishRouter.get("/findAll", DishController_1.DishController.findAll);
dishRouter.get("/findById/:id", DishController_1.DishController.findById);
dishRouter.post("/add", function (req, res, next) {
    (0, Security_1.default)(req, res, next, ["ADMIN"]);
}, (0, FileHandles_1.default)("dish").single("image"), DishController_1.DishController.add);
dishRouter.use(express.static('dish'));
exports.default = dishRouter;
//# sourceMappingURL=dishRouter.js.map