/* @flow */
// mutations type
const SET_NEWS = 'SET_NEWS'
const SET_CONTENT = 'SET_CONTENT'
type Post = {
  id: number,
  permalink: string,
  title: string,
  description: string,
  thumbnail: string,
  created: string
}
type NewsStore = {
  recentNews: Post[],
  recentContent: Post[]
}
// init state
const state: NewsStore = {
  recentNews: [],
  recentContent: []
}

// getters
const getters = {}

// actions
const actions = {
  /**
   * ユーザーデータをセット
   * @param {*} context
   * @params {User} recentNews ユーザーデータ
   */
  setNews(context: any, recentNews: Post[]) {
    context.commit(SET_NEWS, recentNews)
  },
  setContent(context: any, recentContent: Post[]) {
    context.commit(SET_CONTENT, recentContent)
  }
}

// mutations
const mutations = {
  /**
   * ユーザーデータをセット
   * @param {UserStore} state
   * @param {User} user ユーザーデータ
   */
  [SET_NEWS](state: NewsStore, recentNews: Post[]) {
    state.recentNews = recentNews
  },
  [SET_CONTENT](state: NewsStore, recentContent: Post[]) {
    state.recentContent = recentContent
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
