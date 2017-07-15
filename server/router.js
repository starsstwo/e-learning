import express from 'express'
import path from 'path'
import api from './api'
const router = express.Router()

// api
router.use('/api', api)

// // api,authなど以下URLパターンへのアクセスは404を返す
// router.route('/:url(api|auth|components|app|vendor|assets)/*')
//   .get((req, res, next) => {
//     res.status(404).sendFile(path.join(__dirname, 'views/404.html'))
//   })

router.route('/*').all(async(req, res, next) => {
  return res.sendFile(path.join(__dirname, 'index.html'))
})

export default router
