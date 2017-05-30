var path = require('path')
var config = require('./config')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var nodeExternals = require('webpack-node-externals')
var env = process.env.NODE_ENV === 'development'
  ? config.dev.env
  : config.build.env

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    server: './server/server.js'
  },
  output: {
    path: config.build.dist,
    filename: 'server.js',
    publicPath: config.build.assetsPublicPath,
    libraryTarget: 'commonjs2'
  },
  resolve: {
    modules: [path.join(__dirname, '../'), 'node_modules'],
    extensions: ['.js', '.json']
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('server')]
      }
    ]
  },
  plugins: [
    // Define free variables
    // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': env.NODE_ENV,
      'process.env.BROWSER': false
    }),
    // Adds a banner to the top of each generated chunk
    // https://webpack.github.io/docs/list-of-plugins.html#bannerplugin
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    }),
    // Do not create separate chunks of the server bundle
    // https://webpack.github.io/docs/list-of-plugins.html#limitchunkcountplugin
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    // copy custom folder
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../server/certificates'),
        to: path.resolve(__dirname, '../dist/certificates')
      },
      {
        from: path.resolve(__dirname, '../server/views'),
        to: path.resolve(__dirname, '../dist/views')
      }
    ])
  ],
  node: {
    console: true,
    global: false,
    process: true,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },

  devtool: 'source-map'
}
