<template lang="pug">
div
  div(v-if="postList.length > 0", v-bind:class="{'pb-n': postList.length > 0}")
    post-card(v-for="post in postList", :key="post.id", :post="post", :type="type")

</template>

<script>
import PostListComponent from './PostList.component.js'
export default PostListComponent
</script>

<style lang="scss" scoped>
</style>
