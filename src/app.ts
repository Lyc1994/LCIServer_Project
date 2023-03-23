import express from "express";
import { AddressInfo } from "net";
// import path from "path";
import { controller } from "./controller";

class main {

    private readonly app = express();

    constructor() {
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