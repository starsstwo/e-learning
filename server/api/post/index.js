/* @flow */
import express from 'express'
import PostCtrl from './post.controller'
const router = express.Router()
const controller = new PostCtrl()
router.get('/list', controller.listPost)
router.get('/listNew', controller.listNewPost)
router.get('/post', controller.getPost)
export default router
