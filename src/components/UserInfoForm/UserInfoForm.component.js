/* @flow */
import {
  required,
  minLength,
  email
} from 'vuelidate/lib/validators' // eslint-disable-line
import api from '../../api'
import Snackbar from '../Snackbar/Snackbar'
import {
  mapState,
  mapActions
} from 'vuex'

export default {
  components: {
    Snackbar
  },
  data() {
    return {
      // ストアーからユーザーデータを初期化
      user: Object.assign({}, this.$store.state.user.user),
      editMode: false,
      isChange: false,
      isInputPassword: false,
      snackbar: {
        message: '',
        type: 'success'
      }
    }
  },
  computed: {
    ...mapState('user', {
      originData: state => Object.assign({}, state.user)
    })
  },
  watch: {
    originData(data: any) {
      this.user = Object.assign({}, this.originData)
    }
  },
  methods: {
    ...mapActions('user', [
      'setUser'
    ]),
    /**
     * submit
     */
    async submit() {
      // validations
      this.$v.$touch()
      if (this.$v.$invalid === true) {
        return
      }
      if (this.isChange === false) {
        return
      }
      const params: {
        name: string,
        email: string,
        password ? : string
      } = {
        name: this.user.name,
        email: this.user.email
      }
      // パスワードが変更の場合は、セット
      if (this.isInputPassword === true) {
        params.password = this.user.password
      }

      // メールアドレスでユーザー存在するかをチェック
      let data = await api.get('/user/checkUserExistByEmail', {
        params: {
          email: this.user.email
        }
      })
      if (data && data.result === true) {
        // snackbarを表示
        this.showSnackbar('既に登録済のメールアドレスです。', 'error')
        return
      }

      // ユーザー設定を変更
      data = await api.put('/user/userData', params)
      if (data === null || data.result !== true) {
        // snackbarを表示
        this.showSnackbar('保存に失敗しました。', 'error')
        return
      }
      this.originData = Object.assign(this.originData, params)
      // ユーザーデータをstoreにセット
      this.setUser(this.originData)
      this.cancel()
      // snackbarを表示
      this.showSnackbar('保存しました。', 'success')
    },
    /**
     * パスワード変更イベント
     * @param {*} $v
     */
    passwordOnKeydown($v: any) {
      // validate
      $v.user.password.$touch()
      // 最初入力する場合は、パスワードを''にセットし、パスワード変更フラグをtrueにセット
      if (this.isInputPassword === false) {
        this.isInputPassword = true
        this.user.password = ''
      }
      this.isChange = true
    },
    /**
     * input変更イベント
     * @param {*} $v
     * @param {string} name
     */
    inputChange($v: any, name: string) {
      // validate
      $v.user[name].$touch()
      this.isChange = true
    },
    /**
     * 編集モードを変換
     */
    switchEdit() {
      this.editMode = true
    },
    /**
     * キャンセル
     */
    cancel() {
      this.editMode = false
      this.isChange = false
      this.isInputPassword = false
      this.user = Object.assign({}, this.originData)
    },
    /**
     * snackbarを開く
     * @param {string} message メッセージ
     * @param {string} type タイプ
     */
    showSnackbar(message: string, type: 'success' | 'error') {
      this.snackbar.message = message
      this.snackbar.type = type
      this.$refs.snackbar.open()
    }
  },
  validations: {
    user: {
      name: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required,
        // パスワードは8文字以上が必要
        minLength: minLength(8)
      }
    }
  }
}
