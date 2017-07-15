<template lang="pug">
.navbar.layout.layout-align-space-between-center
  h2.md-title
    | TRUNG TÂM ĐÀO TẠO VÀ SÁT HẠCH LÁI XE
  el-menu.el-menu-demo(mode="horizontal")
    el-menu-item(index="1", @click="$router.push('/')")
      | TRANG CHỦ
    el-menu-item(index="2", @click="$router.push('/gioi-thieu')")
      | GIỚI THIỆU
    el-menu-item(index="3", @click="$router.push('/tin-tuc')")
      | TIN TỨC
    el-menu-item(index="4", @click="$router.push('/khoa-hoc')")
      | KHOÁ HỌC
    el-menu-item(index="5", @click="$router.push('/tuyen-dung')")
      | TUYỂN DỤNG
    el-menu-item(index="6", @click="$router.push('/lien-he')")
      | LIÊN HỆ
</template>

<style lang="scss">
@import './Navbar';
</style>

<script>
import NavbarComponent from './Navbar.component.js'
export default NavbarComponent
</script>
