import express from 'express'
import mongoose from 'mongoose'
import { AddressInfo } from 'net'
import { baseDataController } from './controller/BaseDataController'
import { loginController } from './controller/LoginController'
import { userController } from './controller/UserController'
import { realmDataModel } from './model/basedata/RealmDataModel'
import { log, setBaseData } from './util'

class main {

    private readonly app = express()

    constructor() {
        // const redis = require('redis');
        // (async () => {
        //     const redisClient = redis.createClient({ url: 'redis://:127.0.0.1:6379' /* * redis://[[username][:password]@][host][:port][/db-number]* 写密码redis://:123456@127.0.0.1:6379/0 * 写用户redis://uername@127.0.0.1:6379/0  * 或者不写密码 redis://127.0.0.1:6379/0* 或者不写db_number redis://:127.0.0.1:6379* */ });
        //     redisClient.on('ready', () => {
        //         console.log('redis is ready...')
        //     })
        //     redisClient.on('error', (err: any) => {
        //         console.log(err)
        //     })
        //     await redisClient.connect()   //连接
        //     // /* 增 改*/
        //     // const status = await redisClient.set('key', 'value')
        //     // // 设置值
        //     // console.log(status)
        //     // /* 查 */
        //     // const value = await redisClient.get('key') 
        //     // // 得到value 没有则为null
        //     // console.log(value )
        //     // /* 删 */
        //     // const num = await redisClient.del('key') // 0 没有key关键字 // 1删除成功
        //     // console.log(num )
        //     // await redisClient.quit()   // 关闭
        // })();

        mongoose.connect('mongodb://127.0.0.1:27017/admin')
        mongoose.connection.on('connected', async () => { //连接成功
            log('Mongoose connection success')
            setBaseData('realm_data', realmDataModel)
        })
        mongoose.connection.on('error', (err) => { //连接异常
            log('Mongoose connection error: ' + err)
        })
        mongoose.connection.on('disconnected', () => { //连接断开
            log('Mongoose connection disconnected')
        })

        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(express.json())
        // this.app.use(express.static(path.join(__dirname, '../public'))) //静态资源
        this.app.all('*', function (req, res, next) { //允许跨域
            res.header('Access-Control-Allow-Origin', req.headers.origin)
            res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
            res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
            res.header('Access-Control-Allow-Credentials', 'true')
            req.method === 'OPTIONS' ? res.sendStatus(200) : next()
        })

        let server = this.app.listen(3000, () => {
            let host = <AddressInfo>server.address()
            log(`server url: ${host.address}:${host.port} family: ${host.family}`)

            loginController(this.app)
            userController(this.app)
            baseDataController(this.app)
        })
    }
}
new main()