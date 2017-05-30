<template lang="pug">
md-avatar.mr-xxs(:class="{'bg-white': bgWhite}")
  img(v-if="pictureUrl", :src="pictureUrl")
  span(v-if="!pictureUrl && name")
    | {{name[0]}}
</template>

<script>
import AvatarComponent from './Avatar.component.js'
export default AvatarComponent
</script>
