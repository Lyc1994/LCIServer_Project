import { Application } from "express";
import { loginModel } from "../model/LoginModel";
import { userModel } from "../model/UserModel";
import { log, send } from "../util";

export function userController(app: Application) {
    push_user(app, '/push_user')
    pull_user(app, '/pull_user')
}

//上传用户数据
function push_user(app: Application, route: string) {
    app.post(route, async (req, res) => {
        let params = req.body
        log(`C ===> S method:POST route:${route}\nparams:${params}`)

        let { userid, username } = params
        if (username) {
            let doc = await userModel.findOne({ userid })
            if (doc) {
                await doc.updateOne({ username })
            } else {
                await userModel.insertMany([{ userid, username }])
            }
            send(route, res)
        } else {
            send(route, res, {
                code: 1,
                message: 'username is nil'
            })
        }
    })
}

//拉取用户数据
function pull_user(app: Application, route: string) {
    app.post(route, async (req, res) => {
        let params = req.body
        log(`C ===> S method:POST route:${route}\nparams:${params}`)

        let { userid } = params
        let doc = await userModel.findOne({ userid })
        if (doc?.username) {
            send(route, res, {
                code: 0,
                message: 'success',
                username: doc.username
            })
        } else {
            let doc = await loginModel.findOne({ userid })
            send(route, res, {
                code: 0,
                message: 'success',
                username: doc?.account
            })
        }
    })
}