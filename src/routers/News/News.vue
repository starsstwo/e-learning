<template lang="pug">
#news
  div.layout-row.layout-align-space-between-start
    post(:post-type="'news'", style="width: 75%")
    right-content
</template>
<style lang="scss" scoped>
</style>

<script>
import NewsComponent from './News.component'
export default NewsComponent
</script>
