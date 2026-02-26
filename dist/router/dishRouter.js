"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Security_1 = require("security/Security");
const express_1 = require("express");
const DishController_1 = require("controller/DishController");
const FileHandles_1 = require("FileHandle/FileHandles");
const express = require("express");
const dishRouter = (0, express_1.Router)();
dishRouter.get("/findAll", DishController_1.DishController.findAll);
dishRouter.get("/findById/:id", DishController_1.DishController.findById);
dishRouter.post("/add", (req, res, next) => {
    (0, Security_1.default)(req, res, next, ["ADMIN"]);
}, (0, FileHandles_1.default)("dish").single("image"), DishController_1.DishController.add);
dishRouter.use(express.static('dish'));
exports.default = dishRouter;
//# sourceMappingURL=dishRouter.js.map