import * as express from "express"
import * as bodyParser from "body-parser"
const cors = require('cors');
import { AppDataSource } from "./data-source"
import userRouter from "router/userRouter"
import dishRouter from "router/dishRouter"
import tableRouter from "router/tableRouter"
import tableOrderRouter from "router/tableOrderRouter"
import dishOrderRouter from "router/dishOrderRouter"
import VnPayRouter from "router/VnPayRouter"
import dishOrderDetailRouter from "router/dishOrderDetailRouter"
const path = require('path');
const corsOptions = {
  origin: 'http://localhost:5173',// nếu bạn dùng cookie / auth header
};
AppDataSource.initialize().then(async () => {
    const app = express()
    app.use(cors({
  origin: function (origin, callback) {
    // Cho phép request không có origin (Postman, mobile app)
    if (!origin) return callback(null, true);

    if (origin.startsWith('https://')) {
      callback(null, true);
    } else {
      callback(new Error('Only HTTPS origins are allowed'));
    }
  },
  credentials: true
}));

    app.use(bodyParser.json())
    app.use("/user",userRouter)
    app.use("/dish",dishRouter)
    app.use("/table",tableRouter)
    app.use("/tableOrder",tableOrderRouter)
    app.use("/dishOrder",dishOrderRouter)
    app.use("/VnPay",VnPayRouter)
    app.use("/dishOrderDetail",dishOrderDetailRouter)
    app.listen(3000)
console.log("Express server has started on port 3000")
}).catch(error => console.log(error))