import express from 'express'
import path from 'path'
import api from './api'
import Session from './models/user/session.model'
const router = express.Router()

/**
 * 認証チェックし、グループロールをチェックするミドルウェア
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
async function authCheck(req, res, next) {
  // 認証チェックをスキップするAPI一覧
  const ignoreAuthCheckApiList = [
    '/api/user/login'
  ]

  // 認証チェックスキップがある場合は、next()
  if (ignoreAuthCheckApiList.indexOf(req.baseUrl + req.path) >= 0) {
    return next()
  }
  try {
    const appSessionKey = req.cookies['app_session_key']
    const session = new Session()
    // セッションデータを取得
    const sessionData = await session.getSession(appSessionKey)

    // 認証失敗の場合は、403を返す
    if (sessionData === null) {
      res.sendStatus(403)
      return
    }
    const userId = sessionData.userId
    // req内にユーザーIDを格納
    req.userId = userId
    next()
  } catch (err) {
    res.sendStatus(403)
  }
}

// ログイン
router.get('/login', async(req, res, next) => {
  const appSessionKey = req.cookies['app_session_key']
  const session = new Session()
  // セッションをチェック
  const sessionCheck = await session.sessionCheck(appSessionKey)

  // 認証に成功した場合は、ホームにリダイレクト
  if (sessionCheck === true) {
    return res.redirect('/')
  }
  return res.sendFile(path.join(__dirname, 'views/index.html'))
})

// 認証チェックミドルウェア
router.use('/api', authCheck)

// api
router.use('/api', api)

// api,authなど以下URLパターンへのアクセスは404を返す
router.route('/:url(api|auth|components|app|vendor|assets)/*')
  .get((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views/404.html'))
  })

router.route('/*').all(async(req, res, next) => {
  const appSessionKey = req.cookies['app_session_key']
  const session = new Session()
  // セッションをチェック
  const sessionCheck = await session.sessionCheck(appSessionKey)

  // 認証に失敗した場合は、ログインにリダイレクト
  if (sessionCheck === false) {
    return res.redirect('/login')
  }
  return res.sendFile(path.join(__dirname, 'views/index.html'))
})

export default router
