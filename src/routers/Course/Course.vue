<template lang="pug">
#course
  div.layout-row.layout-align-space-between-start
    post(:post-type="'course'", style="width: 75%")
    right-content

</template>

<script>
import CourseComponent from './Course.component'
export default CourseComponent
</script>
