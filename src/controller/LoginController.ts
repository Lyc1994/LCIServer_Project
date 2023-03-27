import { Application } from "express"
import { loginModel } from "../model/LoginModel"
import { log, random, send } from "../util"

export function loginController(app: Application) {
    login(app, '/login')
}

function login(app: Application, route: string) {
    app.post(route, async (req, res) => {
        let params = req.body
        log(`C ===> S method:POST route:${route}\nparams:${params}`)

        let { account, password } = params
        let user = await loginModel.findOne({ account, password })
        if (user == null) { //新用户
            let userid = random(10000000, 99999999).toFixed()
            let doc = await loginModel.findOne({ userid })
            while (doc) {
                userid = random(10000000, 99999999).toFixed()
                doc = await loginModel.findOne({ userid })
            }
            [user] = await loginModel.insertMany([{ account, password, userid }])
        }
        let token = (Date.now() + 24 * 3600 * 1000).toFixed()
        await user.updateOne({ token })

        send(route, res, {
            code: 0,
            message: 'success',
            userid: user.userid,
            token
        })
    })
}