<template lang="pug">
.Home
  el-card
    el-carousel(:interval="4000" type="card" height="340px")
      el-carousel-item
        img(src="../../assets/images/header-1.jpg")
      el-carousel-item
        img(src="../../assets/images/header-2.jpg")
      el-carousel-item
        img(src="../../assets/images/header-3.jpg")
      el-carousel-item
        img(src="../../assets/images/header-4.jpg")
  .layout-row.layout-align-space-between-start
    left-content.mr-s(style="width: 75%")
    right-content

</template>

<style lang="scss" scoped>
@import './Home';
</style>

<script>
import HomeComponent from './Home.component.js'
export default HomeComponent
</script>
