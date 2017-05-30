/* @flow */
import {
  required,
  minLength,
  email
} from 'vuelidate/lib/validators' // eslint-disable-line
import api from '../../api'
import Snackbar from '../Snackbar/Snackbar'

export default {
  components: {
    Snackbar
  },
  data () {
    return {
      email: '',
      password: '',
      userId: null,
      invalidHash: false,
      failDialog: {
        title: '',
        content: '<p></p>'
      },
      snackbar: {
        message: '',
        type: 'success'
      }
    }
  },
  computed: {
    // パスワード再設定の状態をセット: inputMail or inputPassword
    formState() {
      const hash = this.$route.query.hash
      // ハッシュがない場合、メールアドレス入力フォームを表示
      if (!hash) {
        return 'inputMail'
      }

      this.checkHash(hash)
      return 'inputPassword'
    }
  },
  methods: {
    /**
     * 初期化
     */
    init: function() {
      this.email = ''
      this.password = ''
      this.userId = null
      this.$v.$reset()
    },
    submit() {
      // メール入力フォームの場合
      if (this.formState === 'inputMail') {
        this.sendMailResetPassword()
      } else {
        // パスワード入力フォームの場合
        this.resetPassword()
      }
    },
    /**
     * 対象メールにパスワード再設定用のハッシュを送信
     */
    async sendMailResetPassword() {
      const result = await api.post('/user/sendMailResetPassword', {
        email: this.email
      })
      if (result !== null) {
        this.showSnackbar('パスワード再設定メールを、入力したメールアドレスに送信しました。', 'success')
        this.init()
        // スナックバー表示のため、3秒遅延させてログイン画面に移動
        setTimeout(() => {
          this.backToLogin()
        }, 3 * 1000)
        return
      }

      // メールが存在しない場合、エラーを表示
      this.openFailDialog('登録されていないメールアドレスです。再度入力してください。', '')
    },
    /**
     * パスワードを再設定
     */
    async resetPassword() {
      const result = await api.post('/user/resetPassword', {
        userId: this.userId,
        password: this.password
      })
      if (result !== null) {
        this.showSnackbar('パスワードを再設定しました。新しいパスワードでログインしてください。', 'success')
        this.init()
        // スナックバー表示のため、3秒遅延させてログイン画面に移動
        setTimeout(() => {
          this.backToLogin()
        }, 3 * 1000)
        return
      }

      // パスワード再設定が失敗した場合
      this.openFailDialog('パスワード再設定が失敗しました。', '')
    },
    /**
     * パスワード再設定用のハッシュをチェック
     * @param {string} hash ハッシュ
     */
    async checkHash(hash: string) {
      const result = await api.get('/user/checkHash', {
        params: {
          hash: hash
        }
      })
      // 有効なハッシュの場合、ハッシュに該当するユーザーIDをセット
      if (result !== null && result.error === null) {
        this.userId = result.userId
        return
      }

      // ハッシュの有効期限切れの場合、アラートを表示
      if (result !== null && result.error === 'hash-invalid') {
        this.openFailDialog('パスワード再設定の有効期限切れです。', '確認メールの送信後12時間以内に新しいパスワードを設定してください。')
        this.invalidHash = true
        return
      }

      // ハッシュが存在しない場合、ログイン画面に移動
      this.backToLogin()
    },
    /**
     * ログイン画面に移動
     */
    backToLogin() {
      this.$router.push('login')
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
    },
    /**
     * 失敗ダイアログを表示する
     * @param {string} title タイトル
     * @param {string} content コンテスト
     */
    openFailDialog(title: string, content: string) {
      this.failDialog = {
        title: title,
        content: content
      }
      this.$refs['failDialog'].open()
    }
  },
  validations: {
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
