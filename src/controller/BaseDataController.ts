import { Application } from "express";
import { getBaseData, log, send } from "../util";

export function baseDataController(app: Application) {
    push_base_data(app, '/push_base_data')
    pull_base_data(app, '/pull_base_data')
}

function push_base_data(app: Application, route: string) {
    log('register controller route:' + route)
    app.post(route, async (req, res) => {
        let params = req.body
        log(`C ===> S method:POST route:${route}\nparams:${JSON.stringify(params)}`)

        let { userid, key, version, baseData } = params
        let doc = await getBaseData(key).findOne({ userid })
        if (doc) {
            if (version > doc.version) {
                await doc.updateOne({ version, baseData })
                send(route, res)
            } else {
                send(route, res, null, {
                    code: 1,
                    message: 'version is too low'
                })
            }
        } else {
            await getBaseData(key).insertMany([{ userid, version, baseData }])
            send(route, res)
        }
    })
}

function pull_base_data(app: Application, route: string) {
    log('register controller route:' + route)
    app.post(route, async (req, res) => {
        let params = req.body
        log(`C ===> S method:POST route:${route}\nparams:${JSON.stringify(params)}`)

        let { userid, key } = params
        let doc = await getBaseData(key).findOne({ userid })
        send(route, res, {
            version: doc?.version || 0,
            baseData: doc?.baseData || ''
        })
    })
}