/* @flow */
import moment from 'moment'
import User from '../../models/user/user.model'
import Session from '../../models/user/session.model'
import config from '../../config'

class UserController {
  /**
   * ログイン
   * @param {any} req
   * @param {any} res
   */
  async login(req: any, res: any) {
    const loginInfo = {
      email: req.body.email,
      password: req.body.password
    }
    const user = new User()

    try {
      // ログインチェック
      const userInfo = await user.loginCheck(loginInfo)
      console.log(userInfo)
      if (userInfo === null) {
        // ログインが失敗した場合、falseをリターン
        return res.json({
          loginResult: false
        })
      }

      // セッションキー
      const appSessionKey = req.cookies['connect.sid'] + moment().format('x') + userInfo.userId
      const session = new Session()
      // セッションをアクティブにする
      const activeSession = await session.activeSession(appSessionKey, userInfo.userId)
      if (activeSession === true) {
        // cookieにセッションキーを保存(期限20h)
        res.cookie('app_session_key', appSessionKey, {
          maxAge: config.sessionDuration
        })
      }

      res.json({
        loginResult: activeSession
      })
    } catch (err) {
      res.status(500).json({
        error: err
      })
    }
  }

  /**
   * セッションキーでユーザーデータを取得
   * @param {*} req
   * @param {*} res
   */
  async getUserData(req: any, res: any) {
    const appSessionKey = req.cookies['app_session_key']
    const user = new User()
    try {
      const userData = await user.getUserDataBySession(appSessionKey)
      res.json(userData)
    } catch (err) {
      res.status(500).json({
        error: err
      })
    }
  }

  /**
   * セッションキーでユーザーデータを更新
   * @param {*} req
   * @param {*} res
   */
  async updateUserData(req: any, res: any) {
    const appSessionKey = req.cookies['app_session_key']
    const updateData = req.body
    const user = new User()
    try {
      // ユーザー情報を取得
      const userInfo = await user.getUserDataBySession(appSessionKey)
      if (userInfo === null) {
        return res.sendStatus(403)
      }

      // ユーザーデータの変更を実行
      await user.updateUserData(userInfo.userId, updateData)
      res.json({
        result: true
      })
    } catch (err) {
      res.status(500).json({
        error: err
      })
    }
  }

  /**
   * メールアドレスでユーザー存在するかをチェック
   * @param {*} req
   * @param {*} res
   */
  async checkUserExistByEmail(req: any, res: any) {
    const email = req.query.email
    const userId = req.userId
    const user = new User()
    try {
      const result = await user.checkUserExistByEmail(userId, email)
      res.json({
        result: result
      })
    } catch (err) {
      res.status(500).json({
        error: err
      })
    }
  }

  /**
   * メールでユーザー情報を取得
   * @param {*} req
   * @param {*} res
   */
  async getUserByEmail(req: any, res: any) {
    const email = req.query.email
    const user = new User()
    try {
      const result = await user.getUserByEmail(email)
      res.json(result)
    } catch (err) {
      res.status(500).json({
        error: err
      })
    }
  }
}

export default UserController
