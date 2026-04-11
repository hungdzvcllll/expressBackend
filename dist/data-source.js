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
  host: "sql100.infinityfree.com",
  port: 3306,
  username: "if0_41637469",
  password: "y6zKn7DnAmPg",
  database: "if0_41637469_railway",

  synchronize: true,
    extra: {
    connectionLimit: 10,          // tránh mở quá nhiều connection
    connectTimeout: 10000,        // timeout khi connect (10s)
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  },

  // 👇 cực kỳ quan trọng
  acquireTimeout: 10000,
  retryAttempts: 5,
  retryDelay: 3000,
    entities: [User_1.default, TableOrder_1.default, Table_1.default, DishOrderDetails_1.DishOrderDetails, DishOrder_1.default, Dish_1.default]
});
//# sourceMappingURL=data-source.js.map
