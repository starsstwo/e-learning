/* @flow */
import {
  required,
  minLength,
  email
} from 'vuelidate/lib/validators' // eslint-disable-line
import api from '../../api'

export default {
  data() {
    return {
      email: '',
      password: '',
      failDialog: {
        title: '',
        content: '<p></p>'
      }
    }
  },
  methods: {
    submit: async function($v: any) {
      // validations
      $v.$touch()
      if ($v.$invalid === true) {
        return
      }

      const params = {
        email: this.email,
        password: this.password
      }
      const data = await api.post('/user/login', params)
      // ログインに失敗した場合は、失敗ダイアログを表示する
      if (data === null || data.loginResult === false) {
        this.openFailDialog('user')
        return
      }

      // ログインが成功した場合は、ホームに移動する
      location.href = '/'
    },
    /**
     * 失敗ダイアログを表示する
     * @param {('user' | 'fb')} type タイプ
     */
    openFailDialog(type: 'user' | 'fb') {
      if (type === 'user') {
        this.failDialog = {
          title: 'ログインに失敗しました。',
          content: '<p>正しいメールアドレスとパスワードの組み合わせを入力してください。</p>'
        }
      } else {
        this.failDialog = {
          title: 'Facebookアカウントが連携されていません。',
          content: ''
        }
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
