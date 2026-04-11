import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";
import User from "model/User";
import TableOrder from "model/TableOrder";
import { DishOrderDetails } from "model/DishOrderDetails";
import DishOrder from "model/DishOrder";
import Dish from "model/Dish";
import Table from "model/Table";

export const AppDataSource = new DataSource({
  export const AppDataSource = new DataSource({
  type: "mysql",
  host: "metro.proxy.rlwy.net",
  port: 43324,
  username: "root",
  password: "WgvIsheoXkZdwATHDRIyDgOdTDnXbsVi",
  database: "railway",

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
  entities: [User,TableOrder,Table,DishOrderDetails,DishOrder,Dish]
});
