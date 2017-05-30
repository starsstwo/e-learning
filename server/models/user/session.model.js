/* @flow */
import Mysql from '../../core/Mysql'
import config from '../../config'
import moment from 'moment'
// セッション情報
type SessionData = {
  sessionKey: string,
  userId: string
}

/**
 * セッションモデル
 * @class Session
 */
class Session {
  table: string

  constructor() {
    this.table = 'sessions'
  }

  /**
   * セッションチェック
   * @param {string} appSessionKey
   * @return {Promise <boolean>} セッションチェック結果
   */
  async sessionCheck(appSessionKey: string): Promise <boolean> {
    const table = 'sessions'
    const column = 'session_key as sessionKey, user_id as userId'
    const where = {
      session_key: {
        value: appSessionKey,
        sign: '='
      }
    }
    const type = 'select'
    const options = ''

    try {
      const data = await Mysql.selectOne(table, column, where, type, options)
      if (data !== null) {
        return true
      }
      return false
    } catch (err) {
      throw err
    }
  }

  /**
   * セッションをアクティブにする
   * @param {string} appSessionKey セッションキー
   * @param {string} userId ユーザーID
   * @returns {Promise <boolean>} アクティブ結果
   */
  async activeSession(appSessionKey: string, userId: string): Promise <boolean> {
    const sessionData = {
      session_key: appSessionKey,
      user_id: userId
    }

    try {
      // 期限切れしたセッションを削除する
      await this.deleteExpiredSession(userId)
      // セッションを保存
      const result = await Mysql.insert(this.table, sessionData, true)

      if (result) {
        return true
      }

      return false
    } catch (err) {
      return false
    }
  }

  /**
   * 期限切れしたセッションを削除する
   * @param {string} userId ユーザーID
   * @returns {Promise <boolean>} 結果
   */
  async deleteExpiredSession(userId: string): Promise <boolean> {
    const expiredTime = moment().subtract(config.sessionDuration, 'milliseconds').format('YYYY-MM-DD hh:mm:ss')
    const where = {
      created: {
        value: expiredTime,
        sign: '<'
      }
    }
    await Mysql.delete(this.table, where)
    return true
  }

  /**
   * セッションキーでセッションを取得
   * @param {string} appSessionKey セッションキー
   * @returns {Promise <SessionData>} セッションデータ
   */
  async getSession(appSessionKey: string): Promise <SessionData> {
    const table = this.table
    const column = 'session_key as sessionKey, user_id as userId'
    const where = {
      session_key: {
        value: appSessionKey,
        sign: '='
      }
    }
    const type = 'select'
    const options = ''

    try {
      const data = await Mysql.selectOne(table, column, where, type, options)
      return data
    } catch (err) {
      throw err
    }
  }

}

export default Session
