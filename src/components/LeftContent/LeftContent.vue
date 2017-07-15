<template lang="pug">
.LeftContent
  el-card.p-xs
    .layout-row.layout-align-start-start
      .layout-column.layout-align-start-start.mr-s(v-if="lastestNews", style="width: 65%")
        img.thumbnail(@click="$router.push('/tin-tuc/' + lastestNews.permalink + '.html')",
          :style="{backgroundImage: 'url(' + lastestNews.thumbnail + ')'}")
        h2.title(@click="$router.push('/tin-tuc/' + lastestNews.permalink + '.html')")
          | {{lastestNews.title}}
        .description
          span(v-html="lastestNews.description")

      post-list.list(:post-list="recentNews", :type="'sub'")
      //- ul
      //-   li.mb-xs(v-for="news in recentNews", :key="news.id")
      //-     .title(@click="$router.push('/tin-tuc/' + news.permalink + '.html')")
      //-       | {{news.title}}

</template>

<script>
import LeftContentComponent from './LeftContent.component.js'
export default LeftContentComponent
</script>

<style lang="scss">
@import '../../scss/variables';
.LeftContent {
  ul {
    list-style-type: none;
    margin: 0 0 $base-spacing-unit;
    padding: 0;
  }
  .thumbnail {
    width: 100%;
    height: 305px;
    background-position: center;
    background-size: cover;
    cursor: pointer;
  }
  .title {
    line-height: 20px;
    font-weight: bold;
    cursor: pointer;
  }
  .description {
    font-size: 16px;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-all;
  }

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
    .post-card {
      margin-bottom: 10px
    }
  }
}
</style>
