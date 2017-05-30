/* @flow */
import development from './environment/development'
import production from './environment/production'
import testing from './environment/testing'

// Set default node environment
let envConfig = development
let env = 'development'

if (process.env.NODE_ENV === 'production') {
  envConfig = production
  env = 'production'
}

if (process.env.NODE_ENV === 'testing') {
  envConfig = testing
  env = 'testing'
}

// developもproductionもコールされる設定[設定は最小限に]
const all = {
  env: env,
  assetsSubDirectory: 'static',
  assetsPublicPath: '/'
}

// 環境ごとにrequireする設定ファイルの変更
export default Object.assign({}, all, envConfig)
