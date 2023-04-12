import { Application } from "express";
import { userModel } from "../model/UserModel";
import { log, send } from "../util";

export function userController(app: Application) {
    push_user(app, '/push_user')
    pull_user(app, '/pull_user')
}

/**
 * 上传用户数据
 */
function push_user(app: Application, route: string) {
    log('register controller route:' + route)
    app.post(route, async (req, res) => {
        let params = req.body
        log(`C ===> S method:POST route:${route}\nparams:${JSON.stringify(params)}`)

        let { userid, username } = params
        if (username) {
            let doc = await userModel.findOne({ userid })
            if (doc) {
                await doc.updateOne({ username })
                send(route, res)
            } else {
                send(route, res, null, {
                    code: 1,
                    message: 'user not exist'
                })
            }
        } else {
            send(route, res, null, {
                code: 1,
                message: 'username is nil'
            })
        }
    })
}

/**
 * 拉取用户数据
 */
function pull_user(app: Application, route: string) {
    log('register controller route:' + route)
    app.post(route, async (req, res) => {
        let params = req.body
        log(`C ===> S method:POST route:${route}\nparams:${JSON.stringify(params)}`)

        let { userid } = params
        let doc = await userModel.findOne({ userid })
        if (doc) {
            send(route, res, {
                username: doc?.username
            })
        } else {
            send(route, res, null, {
                code: 1,
                message: 'user not exist'
            })
        }
    })
}