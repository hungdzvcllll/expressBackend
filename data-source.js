"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
require("dotenv/config");
var User_1 = require("./model/User");
var TableOrder_1 = require("./model/TableOrder");
var DishOrderDetails_1 = require("./model/DishOrderDetails");
var DishOrder_1 = require("./model/DishOrder");
var Dish_1 = require("./model/Dish");
var Table_1 = require("./model/Table");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "turntable.proxy.rlwy.net",
    port: 15530,
    username: "root",
    password: "zOHcjOlrMdLFPEsoqMNdsfhNcfJtTPxq",
    database: "railway",
    synchronize: true,
    entities: [User_1.default, TableOrder_1.default, Table_1.default, DishOrderDetails_1.DishOrderDetails, DishOrder_1.default, Dish_1.default]
});
//# sourceMappingURL=data-source.js.map