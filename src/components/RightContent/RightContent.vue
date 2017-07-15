<template lang="pug">
.RightContent
  el-card.p-n.mb-s
    .el-card-header
      .el-card-header__title
        | Hỗ trợ trực tuyến
    iframe(src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FTLH.giaidap%2F&tabs&width=400&height=214&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=1810945462562117" width="400" height="214" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true")

  el-card.p-n.mb-s
    .el-card-header
      .el-card-header__title
        | Tin Nổi Bật
    post-list.list(:post-list="recentNews", :type="'sub'")

  el-card
    .el-card-header
      .el-card-header__title
        | Kiến thức giao thông
    post-list.list(:post-list="recentNews", :type="'sub'")

  el-card
    .el-card-header
      .el-card-header__title
        | Luyện thi trực tuyến
    //- post-list.list(:post-list="recentNews", :type="'sub'")

</template>

<script>
import RightContentComponent from './RightContent.component.js'
export default RightContentComponent
</script>

<style lang="scss">
@import '../../scss/variables';
.RightContent {
  .el-card-header {
    background-color: $primary-color;
    padding: $base-spacing-unit * 1.5;
    margin-bottom: 0;
    border-radius: 4px 4px 0 0;
    .el-card-header__title {
      color: $base-text-color-white;
    }
  }
  .el-card__body {
    padding: 0;
  }

  .list {
    margin: 5px 5px;
    .post-card {
      margin-bottom: 10px
    }
  }
}
</style>
