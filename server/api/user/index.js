/* @flow */
import express from 'express'
import UserCtrl from './user.controller'
const router = express.Router()
const controller = new UserCtrl()

// ログイン
router.post('/login', controller.login)
// セッションキーでユーザーデータを取得
router.get('/userData', controller.getUserData)
// セッションキーでユーザーデータを更新
router.put('/userData', controller.updateUserData)
// メールアドレスでユーザー存在するかをチェック
router.get('/checkUserExistByEmail', controller.checkUserExistByEmail)
// メールでユーザー情報を取得
router.get('/getUserByEmail', controller.getUserByEmail)
export default router
