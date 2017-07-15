/* @flow */
/**
 * Main server file
 */

import https from 'https'
import app from './app'
import config from './config'
const fs = require('fs')
const path = require('path')

const options = {
  key: fs.readFileSync(path.join(__dirname, '/certificates/server.key')),
  cert: fs.readFileSync(path.join(__dirname, '/certificates/server.crt'))
}

const server = https.createServer(options, app)

// Start server
server.listen(config.port, () => {
  console.log('Express server listening on %d, in %s mode', config.port, config.env)
})

// pm2用サーバー終了メッセージ
process.on('message', (msg) => {
  if (msg === 'shutdown') {
    console.log('Closing all connections...')

    setTimeout(() => {
      console.log('Finished closing connections')
      process.exit(0)
    }, 1500)
  }
})

