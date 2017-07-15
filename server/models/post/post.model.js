/* @flow */
import Mysql from '../../core/Mysql'

// ユーザー情報
type UserInfo = {
  userId: string
}

/**
 * ユーザーモデル
 * @class User
 */
class Post {
  table: string

  constructor() {
    this.table = 'news'
  }

  /**
   * ログインのチェック
   * @param {{email: string, password: string}} loginInfo ログイン情報
   * @returns {Promise <UserInfo | null>} ユーザー情報
   */
  async getPost(permalink: string, postType: string): Promise < UserInfo | null > {
    const column = 'id, title, description, content, thumbnail, permalink, created, type'
    const where = {
      permalink: {
        value: permalink,
        sign: '='
      },
      type: {
        value: postType,
        sign: '='
      }
    }
    return Mysql.selectOne(this.table, column, where, 'select', '', null)
  }

  /**
   * ログインのチェック
   * @param {{email: string, password: string}} loginInfo ログイン情報
   * @returns {Promise <UserInfo | null>} ユーザー情報
   */
  async listPost(currentPage: number, postType: string): Promise < any | null > {
    const column = 'id, title, description, content, thumbnail, permalink, created, type'
    const where = {
      type: {
        value: postType,
        sign: '='
      }
    }
    const options = `order by created desc limit ${(currentPage - 1) * 10} , 10`
    const postCount = await Mysql.select(this.table, 'id', where, 'count', '', null)
    const postList = await Mysql.select(this.table, column, where, 'select', options, null)
    return {
      postCount: postCount[0].count,
      postList: postList
    }
  }

  /**
   * ログインのチェック
   * @param {{email: string, password: string}} loginInfo ログイン情報
   * @returns {Promise <UserInfo | null>} ユーザー情報
   */
  async listNewPost(postType: string): Promise < any | null > {
    const column = 'id, title, description, content, thumbnail, permalink, created, type'
    const where = {
      type: {
        value: postType,
        sign: '='
      }
    }
    const options = 'order by created desc limit 5'
    return Mysql.select(this.table, column, where, 'select', options, null)
  }
}

export default Post
