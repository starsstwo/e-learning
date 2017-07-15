/* @flow */
import PostDetail from '../../components/Post/PostDetail/PostDetail'
import RightContent from '../../components/RightContent/RightContent'
export default {
  components: {
    PostDetail,
    RightContent
  },
  data () {
    return {
    }
  },
  computed: {
    permalink() {
      const postPermalink = this.$route.params.permalink.replace('.html', '')
      return postPermalink
    }
  }
}
