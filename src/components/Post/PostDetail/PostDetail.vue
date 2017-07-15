<template lang="pug">
.post-detail(v-if="post != null")
  el-card
    .el-card-header
      .el-card-header__title
        | {{post.title}}
      .mt-xs
        timeago(:since="post.created", :auto-update="60", :max-time="86400")
    .post-detail-content
      b.mb-s(v-html="post.description")
      div(v-html="post.content")
</template>

<script>
import PostDetailComponent from './PostDetail.component.js'
export default PostDetailComponent
</script>

<style lang="scss" scoped>
@import '../../../scss/variables';
.post-detail {
  &-content {
    margin-top: $base-spacing-unit;
    font-size: 16px;
    white-space: pre-wrap;
  }
}
</style>
