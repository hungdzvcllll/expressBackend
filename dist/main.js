"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const data_source_1 = require("./data-source");
const userRouter_1 = require("./router/userRouter");
const dishRouter_1 = require("./router/dishRouter");
const tableRouter_1 = require("./router/tableRouter");
const tableOrderRouter_1 = require("./router/tableOrderRouter");
const dishOrderRouter_1 = require("./router/dishOrderRouter");
const VnPayRouter_1 = require("./router/VnPayRouter");
const dishOrderDetailRouter_1 = require("./router/dishOrderDetailRouter");
const path = require('path');
const corsOptions = {
    origin: 'http://localhost:5173',
};
data_source_1.AppDataSource.initialize().then(async () => {
    const app = express();
    app.use(cors({
        origin: function (origin, callback) {
            if (!origin)
                return callback(null, true);
            if (origin.startsWith('https://')) {
                callback(null, true);
            }
            else {
                callback(new Error('Only HTTPS origins are allowed'));
            }
        },
        credentials: true
    }));
    app.use(bodyParser.json());
    app.use("/user", userRouter_1.default);
    app.use("/dish", dishRouter_1.default);
    app.use("/table", tableRouter_1.default);
    app.use("/tableOrder", tableOrderRouter_1.default);
    app.use("/dishOrder", dishOrderRouter_1.default);
    app.use("/VnPay", VnPayRouter_1.default);
    app.use("/dishOrderDetail", dishOrderDetailRouter_1.default);
    app.listen(3000);
    console.log("Express server has started on port 3000");
}).catch(error => console.log(error));
//# sourceMappingURL=main.js.map