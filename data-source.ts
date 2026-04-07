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
  type: "mysql",
  host:"mainline.proxy.rlwy.net",
  port: 30257,
  username: "root",
  password: "FqtfjWqvbsdcWkbCbwvUcdIrJsEkIecn",
  database: "railway",
  synchronize: true,
  extra: {
    connectTimeout: 20000,

    // QUAN TRỌNG
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,

    // tránh bị drop connection
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  },

  // tránh crash toàn app khi mất kết nối
  retryAttempts: 5,
  retryDelay: 3000,
  entities: [User,TableOrder,Table,DishOrderDetails,DishOrder,Dish]
});
