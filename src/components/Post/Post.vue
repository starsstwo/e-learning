<template lang="pug">
div
  el-card.mr-s
    .el-card-header
      .el-card-header__title
        | {{postName}}
    post-list(:post-list="postList", :type="'list'")
    el-pagination(layout="prev, pager, next", :current-page="currentPage", @current-change="changePagination", :total="postCount")
</template>

<script>
import PostComponent from './Post.component.js'
export default PostComponent
</script>
