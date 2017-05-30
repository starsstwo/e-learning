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
    socket: 'localhost:/Applications/MAMP/tmp/mysql/mysql.sock',
    user: 'root',
    password: 'root',
    database: 'elearning'
  },
  // セッション期限(20h)
  sessionDuration: 20 * 60 * 60 * 1000,
  // 暗号化キー ランダムの文字列設定
  crypto: {
    key: 'mAuuEyep4U'
  }
}
