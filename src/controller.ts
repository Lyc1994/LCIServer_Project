import { Application } from 'express'
import url from 'url'

export function controller(app: Application) {
    app.get('/test_get', (req, res) => {
        let params = url.parse(req.url, true).query
        console.log('/test_get body:', params)
        res.send(params)
    })

    app.post('/test_post', (req, res) => {
        let params = req.body
        console.log('/test_post body:', params)
        res.send(req.body)
    })
}