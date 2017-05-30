<template lang="pug">
div
  snackbar(ref="snackbar", :message="snackbar.message", :type="snackbar.type")
  md-card
    md-card-header.layout.layout-align-space-between-center
      .md-title
        | ユーザー設定
      div
        .pointer(v-if="!editMode", @click="switchEdit()")
          md-tooltip(md-direction="top")
            | 編集
          .md-icon.mdi.mdi-border-color
        div(v-else)
          span.pointer.mr-l(@click="submit")
            md-tooltip(md-direction="top")
              | 保存
            .md-icon.mdi.mdi-content-save(v-bind:class="{'disabled': !isChange || $v.$invalid}")
          span.pointer(@click="cancel()")
            md-tooltip(md-direction="top")
              | キャンセル
            .md-icon.mdi.mdi-close
    md-card-content
      md-input-container(v-bind:class="{'md-input-invalid': $v.user.name.$error}")
        .md-icon.mdi.mdi-account-circle
        label お名前(必要)
        md-input(type="text", v-model="user.name", @input="inputChange($v, 'name')", :disabled="!editMode")
        span.md-error(v-if="!$v.user.name.required")
          | お名前を入力してください。
      md-input-container(v-bind:class="{'md-input-invalid': $v.user.email.$error}")
        .md-icon.mdi.mdi-email
        label メールアドレス(必要)
        md-input(type="text", v-model="user.email", @input="inputChange($v, 'email')", :disabled="!editMode")
        span.md-error(v-if="!$v.user.email.required")
          | メールアドレスを入力してください。
        span.md-error(v-if="!$v.user.email.email")
          | メールアドレスの形式が正しくありません。
      md-input-container.password(v-bind:class="{'md-input-invalid': $v.user.password.$error}")
        .md-icon.mdi.mdi-key-variant
        label パスワード
        md-input(type='password', v-model="user.password", @keydown.native="passwordOnKeydown($v)", :disabled="!editMode")
        span.md-error(v-if="!$v.user.password.required")
          | パスワードを入力してください。
        span.md-error(v-if="!$v.user.password.minLength")
          | パスワードは8文字以上で入力してください。
</template>

<script>
import UserInfoFormComponent from './UserInfoForm.component.js'
export default UserInfoFormComponent
</script>
