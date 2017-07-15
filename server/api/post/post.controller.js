/* @flow */
import Post from '../../models/post/post.model'

class PostController {
  /**
   *
   * @param {*} req
   * @param {*} res
   */
  async getPost(req: any, res: any) {
    const permalink = req.query.permalink
    const postType = req.query.postType
    const post = new Post()
    try {
      const postData = await post.getPost(permalink, postType)
      res.json(postData)
    } catch (err) {
      res.status(500).json({
        error: err
      })
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  async listPost(req: any, res: any) {
    const currentPage = req.query.currentPage
    const postType = req.query.postType
    const post = new Post()
    try {
      const listPost = await post.listPost(currentPage, postType)
      res.json(listPost)
    } catch (err) {
      res.status(500).json({
        error: err
      })
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  async listNewPost(req: any, res: any) {
    const postType = req.query.postType
    const post = new Post()
    try {
      const listPost = await post.listNewPost(postType)
      res.json(listPost)
    } catch (err) {
      res.status(500).json({
        error: err
      })
    }
  }
}

export default PostController
