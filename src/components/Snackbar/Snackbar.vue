<template lang="pug">
md-snackbar(:md-position="vertical + ' ' + horizontal", ref="snackbar", :md-duration="duration", v-bind:class="{'error': type === 'error'}")
  span
    | {{message}}
</template>

<script>
import SnackbarComponent from './Snackbar.component.js'
export default SnackbarComponent
</script>
