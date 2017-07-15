require('./check-versions')()

var config = require('./config')
process.env.NODE_ENV = 'development'

var rm = require('rimraf')
var path = require('path')
var fs = require('fs')
var express = require('express')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackConfig = require('./webpack.dev.conf')
var webpackServerConfig = require('./webpack.server.conf')
var browserSync = require('browser-sync')
var nodemon = require('nodemon')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser

// remove dist
rm(config.build.dist, err => {
  // bundle server
  bundleServer()
    .then(() => {
      // copy index.dev.html
      return copyFile(
        path.join(__dirname, '../index.dev.html'),
        config.build.indexHtml
      )
    })
    .then(() => {
      // bundle client
      bundleClient()
    })
})

// bundle client
function bundleClient() {
  return new Promise(resolve => {
    var compiler = webpack([webpackConfig])

    var devMiddleware = webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      quiet: true
    })

    var hotMiddleware = require('webpack-hot-middleware')(compiler, {
      log: () => {}
    })
    // force page reload when html-webpack-plugin template changes
    compiler.plugin('compilation', function(compilation) {
      compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
      })
    })

    devMiddleware.waitUntilValid(() => {
      const bs = browserSync.create()
      bs.init({
        proxy: {
          target: 'https://localhost:' + port, // <- where Node.js app is running
          middleware: [devMiddleware, hotMiddleware]
        },
        port: 37004,
        open: autoOpenBrowser
      })

      resolve('Finished')
    })
  })
}

// buncle server
function bundleServer() {
  console.log('> Starting dev server...')
  return new Promise(resolve => {
    var compilerServer = webpack(webpackServerConfig)

    compilerServer.run(function(err, stats) {
      const serverPath = path.join(
        webpackServerConfig.output.path,
        webpackServerConfig.output.filename
      )

      nodemon({
        script: serverPath,
        watch: [serverPath],
        env: { NODE_ENV: 'development' }
      }).on('start', function() {
        resolve('Finished')
      })
    })

    compilerServer.watch(
      {
        // watch options:
        aggregateTimeout: 300, // wait so long for more changes
        poll: true // use polling instead of native watchers
        // pass a number to set the polling interval
      },
      function(err, stats) {
        console.log(
          stats.toString({
            chunks: false, // Makes the build much quieter
            colors: true
          })
        )
      }
    )
  })
}

// copyFile
function copyFile(source, target) {
  return new Promise((resolve, reject) => {
    let cbCalled = false
    function done(err) {
      if (!cbCalled) {
        cbCalled = true
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      }
    }

    const rd = fs.createReadStream(source)
    rd.on('error', err => done(err))
    const wr = fs.createWriteStream(target)
    wr.on('error', err => done(err))
    wr.on('close', err => done(err))
    rd.pipe(wr)
  })
}
