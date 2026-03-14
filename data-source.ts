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
  host:"ballast.proxy.rlwy.net",
  port: 24359,
  username: "root",
  password: "SnkBEuYNaFZcznmwxIvnfgzZLjNEjDhQ",
  database: "railway",
  synchronize: true,
  entities: [User,TableOrder,Table,DishOrderDetails,DishOrder,Dish]
});
