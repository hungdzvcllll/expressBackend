"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TableController_1 = require("../controller/TableController");
const Security_1 = require("../security/Security");
const tableRouter = (0, express_1.Router)();
tableRouter.get("/findAll", TableController_1.TableController.findAll);
tableRouter.get("/findById/:id", TableController_1.TableController.findById);
tableRouter.post("/add", (req, res, next) => {
    (0, Security_1.default)(req, res, next, ["ADMIN"]);
}, TableController_1.TableController.add);
tableRouter.put("/stop/:id", (req, res, next) => {
    (0, Security_1.default)(req, res, next, ["ADMIN"]);
}, TableController_1.TableController.stop);
tableRouter.put("/start/:id", (req, res, next) => {
    (0, Security_1.default)(req, res, next, ["ADMIN"]);
}, TableController_1.TableController.start);
exports.default = tableRouter;
//# sourceMappingURL=tableRouter.js.map