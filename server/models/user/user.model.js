/* @flow */
import Mysql from '../../core/Mysql'
import Crypto from '../../core/Crypto'
import UtilCore from '../../core/UtilCore'

// ユーザー情報
type UserInfo = {
  userId: string
}

/**
 * ユーザーモデル
 * @class User
 */
class User {
  table: string

  constructor() {
    this.table = 'users'
  }

  /**
   * ログインのチェック
   * @param {{email: string, password: string}} loginInfo ログイン情報
   * @returns {Promise <UserInfo | null>} ユーザー情報
   */
  async loginCheck(loginInfo: {
    email: string,
    password: string
  }): Promise < UserInfo | null > {
    // 暗号化パスワード
    const cipheredPassword = Crypto.cipherText(loginInfo.password)
    const column = 'user_id as userId'
    const where = {
      email: {
        value: loginInfo.email,
        sign: '='
      },
      password: {
        value: cipheredPassword,
        sign: '='
      }
    }

    return Mysql.selectOne(this.table, column, where, 'select', '', null)
  }

  /**
   * セッションキーでユーザーデータを取得
   * @param {string} appSessionKey セッションキー
   * @returns ユーザーデータ
   */
  async getUserDataBySession(appSessionKey: string) {
    const column = 'users.user_id as userId, name, email, picture_url as pictureUrl, password'
    const where = {
      'sessions.session_key': {
        value: appSessionKey,
        sign: '='
      }
    }
    const joinOption = [{
      table: 'sessions',
      where: 'users.user_id = sessions.user_id',
      type: 'INNER JOIN'
    }]

    try {
      const userData = await Mysql.selectOne(this.table, column, where, 'select', '', joinOption)
      if (userData === null) {
        return null
      }
      // パスワードを'*******'に変換
      const password = Crypto.decipherText(userData.password)
      userData.password = Array(password.length + 1).join('*')

      return userData
    } catch (err) {
      throw err
    }
  }

  /**
   * ユーザーデータの変更
   * @param {number} userId ユーザーID
   * @param {*} userData 変更データ
   * @returns 変更結果
   */
  async updateUserData(userId: number, userData: any) {
    const where = {
      user_id: {
        value: userId,
        sign: '='
      }
    }
    // パスワードが8文字以下場合は、変更データからパスワードを削除
    if (userData.password !== undefined && userData.password.length < 8) {
      delete userData.password
    }
    // パスワードがある場合は、暗号化する
    if (userData.password !== undefined) {
      userData.password = Crypto.cipherText(userData.password)
    }

    return Mysql.update(this.table, where, userData)
  }

  /**
   * メールアドレスでユーザー存在するかをチェック
   * @param {number} userId ユーザーID
   * @param {string} email メールアドレス
   * @returns {Promise < boolean >}
   */
  async checkUserExistByEmail(userId: number, email: string): Promise < boolean > {
    const column = 'users.user_id as userId'
    const where = {
      email: {
        value: email,
        sign: '='
      },
      user_id: {
        value: userId,
        sign: '!='
      }
    }

    try {
      const userData = await Mysql.selectOne(this.table, column, where, 'select', '', null)
      if (userData === null) {
        return false
      }
      return true
    } catch (err) {
      throw err
    }
  }

  /**
   * メールでユーザー情報を取得
   * @param {string} email メール
   * @returns {Promise <{userId: number, name: string, pictureUrl: string, groupIds: string} | null>} ユーザー情報
   */
  async getUserByEmail(email: string) {
    const column = 'users.user_id as userId, name, picture_url as pictureUrl, GROUP_CONCAT(group_id) as groupIds'
    const where = {
      email: {
        value: email,
        sign: '='
      }
    }
    const joinOption = [{
      table: 'group_usermaps',
      where: 'group_usermaps.user_id = users.user_id',
      type: 'INNER JOIN'
    }]

    return Mysql.selectOne(this.table, column, where, 'select', '', joinOption)
  }

  /**
   * 新規ユーザーを追加
   * @param {string} email メール
   * @param {string} name ユーザー名
   * @returns {Promise <{userId: number, password: string} | null>} 追加したユーザーID
   */
  async addNewUser(email: string, name: string): Promise < {
    userId: number,
    password: string
  } | null > {
    // ランダムパスワードを生成
    const password = UtilCore.randomString(12)
    const inserData = {
      email: email,
      name: name,
      password: Crypto.cipherText(password)
    }
    try {
      const data = await Mysql.insert(this.table, inserData, false)
      return {
        userId: data.insertId,
        password: password
      }
    } catch (err) {
      return null
    }
  }
}

export default User
