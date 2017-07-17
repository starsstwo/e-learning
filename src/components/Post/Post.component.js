/* @flow */
import api from '../../api'
import PostList from './PostList/PostList'
export default {
  props: {
    postType: String
  },
  components: {
    PostList
  },
  data () {
    return {
      postList: [],
      postCount: 0,
      currentPage: 1
    }
  },
  created() {
    this.getPostList()
  },
  computed: {
    postName() {
      let postName = ''
      switch (this.postType) {
        case 'news':
          postName = 'TIN TỨC'
          break
        case 'course':
          postName = 'KHOÁ HỌC'
          break
        case 'recruits':
          postName = 'TUYỂN DỤNG'
          break
      }
      return postName
    }
  },
  methods: {
    changePagination(currentPage: number) {
      this.currentPage = currentPage
      this.getPostList()
    },
    /**
     * 初期化
     */
    async getPostList() {
      const postListData = await api.get('/post/list', {
        params: {
          currentPage: this.currentPage,
          postType: this.postType
        }
      })
      if (!postListData) return
      this.postList = postListData.postList
      this.postCount = postListData.postCount
    }
  }
}
