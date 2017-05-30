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
    // ユーザーデータを取得
    this.getUser()
  },
  methods: {
    ...mapActions('user', [
      'setUser'
    ]),
    /**
     * ユーザーデータを取得
     */
    async getUser() {
      const userData = await api.get('/user/userData')
      if (userData === null) {
        location.href = '/login'
        return
      }
      // ユーザーデータをストアーに保存する
      this.setUser(userData)
    }
  }
}
