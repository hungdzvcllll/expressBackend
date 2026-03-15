"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
require("dotenv/config");
const User_1 = require("./model/User");
const TableOrder_1 = require("./model/TableOrder");
const DishOrderDetails_1 = require("./model/DishOrderDetails");
const DishOrder_1 = require("./model/DishOrder");
const Dish_1 = require("./model/Dish");
const Table_1 = require("./model/Table");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "metro.proxy.rlwy.net",
    port: 30414,
    username: "root",
    password: "IJOvZefoEngFdqNPQRwhiSyAVzTxbupq",
    database: "railway",
    synchronize: true,
    entities: [User_1.default, TableOrder_1.default, Table_1.default, DishOrderDetails_1.DishOrderDetails, DishOrder_1.default, Dish_1.default]
});
//# sourceMappingURL=data-source.js.map