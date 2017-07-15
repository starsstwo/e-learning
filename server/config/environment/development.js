/* @flow */

// 開発環境のセッティング
export default {
  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 9005,
  // サイト設定
  site: {
    root: 'https://localhost:37004'
  },
  // Mysql関連
  mysql: {
    host: 'localhost',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'elearning'
  }
}
