/* @flow */
import Navbar from '../../components/Navbar/Navbar'
import '../../scss/app.scss' // eslint-disable-line
import {
  mapActions
} from 'vuex'
import api from '../../api'

export default {
  components: {
    Navbar
  },
  data() {
    return {}
  },
  created() {
    this.getRecentNews()
  },
  methods: {
    ...mapActions('news', [
      'setNews'
    ]),
    /**
     * 初期化
     */
    async getRecentNews() {
      const recentNews = await api.get('/post/listNew', {
        params: {
          postType: 'news'
        }
      })
      this.setNews(recentNews)
    }
  }
}
