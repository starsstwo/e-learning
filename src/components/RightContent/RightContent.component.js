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
      recentNews: state => state.recentNews,
      recentContent: state => state.recentContent
    })
  }
}
