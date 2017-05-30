<template lang="pug">
.login-form.layout.layout-align-center-center
  md-dialog-alert(
    :md-title="failDialog.title",
    :md-content-html="failDialog.content",
    md-ok-text="閉じる",
    ref="failDialog")
  form(@submit.prevent="submit($v)")
    md-card
      md-card-header
        md-card-header-text
          .md-title E-learning
      md-card-content
        md-input-container(v-bind:class="{'md-input-invalid': $v.email.$error}")
          i.md-icon.mdi.mdi-email
          label メールアドレス
          md-input(type="text", v-model="email", @blur.native="$v.email.$touch")
          span.md-error(v-if="!$v.email.required")
            | メールアドレスを入力してください。
          span.md-error(v-if="!$v.email.email")
            | メールアドレスの形式が正しくありません。
        md-input-container.password(v-bind:class="{'md-input-invalid': $v.password.$error}")
          i.md-icon.mdi.mdi-key-variant
          label パスワード
          md-input(type='password', v-model="password", @blur.native="$v.password.$touch")
          span.md-error(v-if="!$v.password.required")
            | パスワードを入力してください。
          span.md-error(v-if="!$v.password.minLength")
            | パスワードは8文字以上で入力してください。
        a.reset-password(href="/reset-password")
          | パスワードをお忘れですか?
        md-card-actions.mt-xl
          md-button.md-raised.md-primary(type="submit", :disabled="$v.$invalid === true")
            | ログイン
</template>

<script>
import LoginFormComponent from './LoginForm.component.js'
export default LoginFormComponent
</script>

<style lang="scss" scoped>
@import './LoginForm';
</style>
