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
         // timeout connect (ms)
    enableKeepAlive: true
  },
  entities: [User,TableOrder,Table,DishOrderDetails,DishOrder,Dish]
});
