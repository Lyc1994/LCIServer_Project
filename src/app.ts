import express from "express";
import mongoose from "mongoose";
import { AddressInfo } from "net";
import { controller } from "./controller";

class main {

    private readonly app = express();

    constructor() {
        mongoose.connect('mongodb://127.0.0.1:27017/admin')
        mongoose.connection.on('connected', async () => { //连接成功
            console.log('Mongoose connection success');
        });
        mongoose.connection.on('error', (err) => { //连接异常
            console.log('Mongoose connection error: ' + err);
        });
        mongoose.connection.on('disconnected', () => { //连接断开
            console.log('Mongoose connection disconnected');
        });

        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        // this.app.use(express.static(path.join(__dirname, "../public"))); //静态资源
        this.app.all('*', function (req, res, next) { //允许跨域
            res.header("Access-Control-Allow-Origin", req.headers.origin);
            res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
            res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
            res.header("Access-Control-Allow-Credentials", "true");
            req.method === "OPTIONS" ? res.sendStatus(200) : next()
        });

        let server = this.app.listen(3000, () => {
            let host = <AddressInfo>server.address();
            console.log(`server url: ${host.address}:${host.port} family: ${host.family}`)

            controller(this.app);
        });
    }
}
new main()