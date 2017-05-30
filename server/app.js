/* @flow */
/**
 * Express Application file
 */

import express from 'express'
import morgan from 'morgan'
import compression from 'compression'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import methodOverride from 'method-override'
import path from 'path'
const pmx = require('pmx').init()
import router from './router'

// Setup server
const app = express()

app.use(compression())
app.use(morgan('dev'))

app.use(cookieParser())
app.use(bodyParser.json({
  limit: '50mb'
}))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}))

app.use(methodOverride())

// keymetricにエラー情報を送る
app.use(pmx.expressErrorHandler())
// keymetricにHTTP latency情報を送る
pmx.http({
  http: true,
  ignore_routes: [/socket\.io/, /notFound/]
})

// serve pure static assets
app.use(express.static(path.join(__dirname, 'public')))

// router
app.use('/', router)

// Expose app
export default app
