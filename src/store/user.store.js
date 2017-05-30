/* @flow */
// mutations type
const SET_USER = 'SET_USER'

// ユーザータイプ
type User = {
  userId: number | null,
  name: string,
  pictureUrl: string | null,
  email: string,
  fbUserId: string | null
}
// ユーザーストアータイプ
type UserStore = {
  user: User
}

// init state
const state: UserStore = {
  user: {
    userId: null,
    name: '',
    pictureUrl: null,
    email: '',
    fbUserId: null
  }
}

// getters
const getters = {}

// actions
const actions = {
  /**
   * ユーザーデータをセット
   * @param {*} context
   * @params {User} userData ユーザーデータ
   */
  setUser(context: any, userData: User) {
    context.commit(SET_USER, userData)
  }
}

// mutations
const mutations = {
  /**
   * ユーザーデータをセット
   * @param {UserStore} state
   * @param {User} user ユーザーデータ
   */
  [SET_USER](state: UserStore, user: User) {
    state.user = user
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
