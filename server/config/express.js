/* @flow */
/**
 * Express configuration
 */

import express from 'express'
import morgan from 'morgan'
import compression from 'compression'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import path from 'path'
const pmx = require('pmx').init()

module.exports = function(app: any) {
  app.use(compression())
  app.use(morgan('dev'))

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
}
