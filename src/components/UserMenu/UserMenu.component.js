/* @flow */
import Avatar from '../Avatar/Avatar'
import {
  mapState
} from 'vuex'

export default {
  components: {
    Avatar
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('user', {
      user: state => Object.assign({}, state.user),
      isGroupAdmin: state => state.selectedGroup.isGroupAdmin
    })
  },
  methods: {
    /**
     * ユーザー設定に移動
     */
    userSetting() {
      this.$router.push('user-setting')
    },
    /**
     * グループ設定に移動
     */
    groupSetting() {
      this.$router.push('group-setting')
    },
    /**
     * ログアウト
     */
    logout() {
      // app_session_key Cookieを削除
      document.cookie = 'app_session_key=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      // ログインに移動する
      location.href = '/login'
    }
  }
}
