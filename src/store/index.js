/* @flow */
import news from './news.store'
export default {
  modules: {
    news
  },
  strict: process.env.NODE_ENV !== 'production'
}
