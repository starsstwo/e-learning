/* @flow */
import PostList from '../Post/PostList/PostList'
import {
  mapState
} from 'vuex'
export default {
  components: {
    PostList
  },
  computed: {
    ...mapState('news', {
      lastestNews: state => state.recentNews[0],
      recentNews: state => state.recentNews
    })
  }
}
