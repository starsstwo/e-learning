<template lang="pug">
.post-card
  .layout-row.layout-align-start-start
    img.post-card-thumbnail.mr-s(@click="$router.push('/tin-tuc/' + post.permalink + '.html')",
        :class="{'img-large': type !== 'sub', 'img-small': type === 'sub'}", :style="{backgroundImage: 'url(' + post.thumbnail + ')'}")
    .layout-column.layout-align-start-start
      .post-card-head.layout-column.layout-align-start-start
        .post-card-head-title(@click="$router.push('/tin-tuc/' + post.permalink + '.html')")
          | {{post.title}}
        small(v-if="type === 'list'")
          timeago(:since="post.created", :auto-update="60", :max-time="86400", :format="formatTime")
      .post-card-description(v-if="type === 'list'")
        span(v-html="post.description")

</template>

<script>
import PostCardComponent from './PostCard.component.js'
export default PostCardComponent
</script>

<style lang="scss" scoped>
@import './PostCard';
</style>
