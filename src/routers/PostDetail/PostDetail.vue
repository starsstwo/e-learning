<template lang="pug">
#post-detail.layout.layout-align-space-between-start
  post-detail.mr-xs(:permalink="permalink", style="width: 75%")
  right-content
</template>

<script>
import PostDetailComponent from './PostDetail.component'
export default PostDetailComponent
</script>
