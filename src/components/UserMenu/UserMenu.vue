<template lang="pug">
md-menu(md-size="3")
  md-button.mr-n.pr-n(md-menu-trigger)
    avatar(:picture-url="user.pictureUrl", :name="user.name", :bg-white="true")
    .md-icon.mdi.mdi-menu-down
  md-menu-content
    md-menu-item(@click.native="userSetting()")
      .md-icon.mdi.mdi-account-circle.mr-xs
      span
        | ユーザー設定
    .divider
    md-menu-item(@click.native="logout()")
      .md-icon.mdi.mdi-logout.mr-xs
      span
        | ログアウト
</template>

<script>
import UserMenuComponent from './UserMenu.component.js'
export default UserMenuComponent
</script>
