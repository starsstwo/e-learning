var path = require('path')
var config = require('./config')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var nodeExternals = require('webpack-node-externals')
var env =
  process.env.NODE_ENV === 'development' ? config.dev.env : config.build.env

// コピーするファイルの設定
// コピーするファイルの設定
var copyConfig = [
  {
    from: path.resolve(__dirname, '../server/views'),
    to: path.resolve(__dirname, '../dist/views')
  }
]

// 本番環境の場合は、deployファイルをコピーする
if (env.NODE_ENV === '"production"') {
  // copyConfig = copyConfig.concat([
  //   {
  //     from: path.resolve(__dirname, '../deploy/appspec.yml'),
  //     to: path.resolve(__dirname, '../dist')
  //   },
  //   {
  //     from: path.resolve(__dirname, '../deploy/after-install.sh'),
  //     to: path.resolve(__dirname, '../dist')
  //   },
  //   {
  //     from: path.resolve(__dirname, '../deploy/deploy-slack-notification.js'),
  //     to: path.resolve(__dirname, '../dist')
  //   }
  // ])
} else {
  // 開発環境の場合は、SSL証明書をコピーする
  // copyConfig = copyConfig.concat([
  //   {
  //     from: path.resolve(__dirname, '../server/certificates'),
  //     to: path.resolve(__dirname, '../dist/certificates')
  //   }
  // ])
}

copyConfig = copyConfig.concat([
  {
    from: path.resolve(__dirname, '../server/certificates'),
    to: path.resolve(__dirname, '../dist/certificates')
  }
])

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    server: './server/server.js'
  },
  output: {
    path: config.build.dist,
    filename: 'app.js',
    publicPath: config.build.assetsPublicPath,
    libraryTarget: 'commonjs2'
  },
  resolve: {
    modules: [path.join(__dirname, '../'), 'node_modules'],
    extensions: ['.js', '.json']
  },
  target: 'node',
  externals: [
    nodeExternals({
      modulesFromFile: true
    })
  ],
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
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    // copy custom folder
    new CopyWebpackPlugin(copyConfig)
  ],
  node: {
    console: true,
    global: false,
    process: true,
    Buffer: false,
    __filename: false,
    __dirname: false
  },

  devtool: 'source-map'
}
