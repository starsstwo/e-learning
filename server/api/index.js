import express from 'express'
import post from './post'
console.log(1111)
const router = express.Router()

router.get('/', (req, res) => {
  res.send('OK')
})

router.use('/post', post)

export default router
