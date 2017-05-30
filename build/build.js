require('./check-versions')()

process.env.NODE_ENV = 'production'

var fs = require('fs')
var mkdirp = require('mkdirp')
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('./config')
var webpackConfig = require('./webpack.prod.conf')
var webpackServerConfig = require('./webpack.server.conf')
var package = require('../package.json')

var spinner = ora('building for production...')
spinner.start()

// start build
clean().then(() => {
  return writePackageJson()
}).then(() => {
  return bundle()
}).catch((err) => {
  console.log('Build ERROR:', err)
})

// clean
function clean() {
  return new Promise((resolve, reject) => {
    rm(config.build.dist, err => {
      if (err) {
        return reject(err)
      }
      resolve('OK')
    })
  })
}

// writePackageJson
function writePackageJson() {
  return new Promise((resolve, reject) => {
    mkdirp(config.build.dist, (err) => {
      if (err) {
        return reject(err)
      }
      fs.writeFile(path.join(config.build.dist, 'package.json'), JSON.stringify({
        "private": true,
        "name": package.name,
        "version": package.version,
        "description": package.description,
        "author": package.author,
        "scripts": {
          "start": "node server.js"
        },
        "dependencies": package.dependencies,
        "engines": package.engines
      }, null, 2), 'utf8', err => {
        if (err) {
          return reject(err)
        }

        resolve('OK')
      });
    })
  })
}

// bundle
function bundle() {
  return new Promise((resolve, reject) => {
      webpack([webpackConfig, webpackServerConfig], function (err, stats) {
      spinner.stop()
      if (err) {
        return reject(err)
      }
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      console.log(chalk.cyan('  Build complete.\n'))
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ))

      resolve('OK')
    })
  })
}
