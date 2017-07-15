<template lang="pug">
#post
  div.layout-row.layout-align-space-between-start
    post(:post-type="postType", style="width: 75%")
    right-content
</template>
<style lang="scss" scoped>
</style>

<script>
import PostComponent from './Post.component'
export default PostComponent
</script>
