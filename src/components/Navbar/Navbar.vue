<template lang="pug">
md-toolbar.navbar.layout.layout-align-space-between-center
  h2.md-title
    router-link(to="/")
      | E-learning
  .layout.layout-align-start-center
    user-menu
</template>

<style lang="scss" scoped>
@import './Navbar';
</style>

<script>
import NavbarComponent from './Navbar.component.js'
export default NavbarComponent
</script>
