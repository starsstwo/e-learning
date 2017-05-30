<template lang="pug">
.login-form.layout.layout-align-center-center
  snackbar(ref="snackbar", :message="snackbar.message", :type="snackbar.type")
  md-dialog-alert(
    :md-title="failDialog.title",
    :md-content-html="failDialog.content",
    md-ok-text="閉じる",
    ref="failDialog")
  form(@submit.prevent="submit()")
    md-card
      md-card-header
        md-card-header-text
          .md-title E-learning
      md-card-content
        md-input-container(v-if="formState === 'inputMail'", v-bind:class="{'md-input-invalid': $v.email.$error}")
          i.md-icon.mdi.mdi-email
          label メールアドレス
          md-input(type="text", v-model="email", @blur.native="$v.email.$touch")
          span.md-error(v-if="!$v.email.required")
            | メールアドレスを入力してください。
          span.md-error(v-if="!$v.email.email")
            | メールアドレスの形式が正しくありません。

        md-input-container.password(v-if="formState === 'inputPassword' && invalidHash === false", v-bind:class="{'md-input-invalid': $v.password.$error}")
          i.md-icon.mdi.mdi-key-variant
          label 新しいパスワード
          md-input(type='password', v-model="password", @blur.native="$v.password.$touch")
          span.md-error(v-if="!$v.password.required")
            | パスワードを入力してください。
          span.md-error(v-if="!$v.password.minLength")
            | パスワードは8文字以上で入力してください。

        md-card-actions.mt-xl
          md-button.md-raised.md-primary(v-if="formState === 'inputMail'", type="submit",
            :disabled="$v.email.$invalid === true")
            | 確認メールを送信
          md-button.md-raised.md-primary(v-if="formState === 'inputPassword' || invalidHash === true", type="submit",
            :disabled="$v.password.$invalid === true")
            | パスワード再設定
        md-card-actions
          md-button.md-raised(@click.native="backToLogin()")
            | ログイン画面へ
</template>

<script>
import ResetPasswordComponent from './ResetPassword.component.js'
export default ResetPasswordComponent
</script>

<style lang="scss" scoped>
@import '../LoginForm/LoginForm';
</style>
