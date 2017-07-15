/* @flow */
import '../../scss/app.scss' // eslint-disable-line
import Post from '../../components/Post/Post'
import RightContent from '../../components/RightContent/RightContent'
export default {
  components: {
    Post,
    RightContent
  },
  data () {
    return {
    }
  },
  computed: {
    postType() {
      const postType = this.$route.path.substring(1)
      return postType
    }
  }
}
