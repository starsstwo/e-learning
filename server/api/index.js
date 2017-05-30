import express from 'express'
import user from './user'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('OK')
})

router.use('/user', user)

export default router
