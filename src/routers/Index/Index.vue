<template lang="pug">
div
  navbar
  router-view.content
  footer.footer
    .container
      .footer-main.layout-column.layout-align-start-start
        p.footer-main-title.mb-xs Trung tâm đào tạo và sát hạch lái xe
        div
          small Địa chỉ: Số 10 Nam Trung Yên, Cầu Giấy, Hà Nội
        div
          small Điện Thoại: 0984 996 650
      .footer-social
        span
          .el-popover.footer-popover(style='width: 120px; display: none;')
            //
            .footer-popover-title Eleme UED
            img(src='static/qrcode.a88f522.png', alt='')
        i.doc-icon-weixin.elementdoc
        a(href='//github.com/elemefe', target='_blank')
          i.doc-icon-github.elementdoc

</template>

<script>
import IndexComponent from './Index.component.js'
export default IndexComponent
</script>

<style lang="scss" scoped>
.content {
  margin: 0 90px;
}
.footer {
  height: 120px;
  background-color: rgb(50, 64, 87);
  color: rgb(164, 174, 189);
  width: 100%;
  z-index: 1000;
  &-main {
    padding-top: 40px;
    display: inline-block;
    &-title {
      line-height: 1;
      font-size: 22px;
      margin: 0px;
    }
  }
  .footer-social {
    float: right;
    line-height: 120px;
  }
}
.container {
    width: 1140px;
    padding: 0px 30px;
    margin: 0px auto;
}
</style>
