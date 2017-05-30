/* @flow */
import user from './user.store'
export default {
  modules: {
    user
  },
  strict: process.env.NODE_ENV !== 'production'
}
