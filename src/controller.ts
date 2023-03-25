import { Application } from 'express'
import url from 'url'
import { UserModel } from './models'

export function controller(app: Application) {
    app.get('/find_user', async (req, res) => {
        let params = url.parse(req.url, true).query
        console.log('/find_user body:', params)

        let doc = await UserModel.findOne({ name: params.name })
        if (doc) {
            res.send({
                error: 0,
                message: 'success',
                user: doc
            })
        } else {
            res.send({
                error: 1,
                message: 'the user not be found',
                user: null
            })
        }
    })

    app.post('/add_user', async (req, res) => {
        let params = req.body
        console.log('/add_user body:', params)

        let doc = await UserModel.findOne({ name: params.name })
        if (doc == null) {
            await UserModel.insertMany([
                { name: params.name, age: params.age }
            ])

            res.send({
                error: 0,
                message: 'success'
            })
        } else {
            res.send({
                error: 1,
                message: 'the user already exists'
            })
        }
    })

    app.post('/update_user', async (req, res) => {
        let params = req.body
        console.log('/update_user body:', params)

        let doc: any = await UserModel.findOne({ name: params.name })
        if (doc) {
            doc = await UserModel.updateOne({ name: params.name }, { age: params.age })
            console.log('doc', doc)

            res.send({
                error: 0,
                message: 'success'
            })
        } else {
            res.send({
                error: 1,
                message: 'the user already exists'
            })
        }
    })
}