/* @flow */
import api from '../../../api'

export default {
  props: {
    permalink: String
  },
  data () {
    return {
      post: null
    }
  },
  created() {
    this.getPost()
  },
  watch: {
    permalink() {
      this.getPost()
    }
  },
  computed: {
    // // パスワード再設定の状態をセット: inputMail or inputPassword
    // formState() {
    //   const hash = this.$route.query.hash
    //   // ハッシュがない場合、メールアドレス入力フォームを表示
    //   if (!hash) {
    //     return 'inputMail'
    //   }

    //   this.checkHash(hash)
    //   return 'inputPassword'
    // }
  },
  methods: {
    /**
     * 初期化
     */
    async getPost() {
      const postData = await api.get('/post/post', {
        params: {
          permalink: this.permalink,
          postType: 'news'
        }
      })
      this.post = postData
    }
  }
}
