<template lang="pug">
#course
  div.layout-row.layout-align-space-between-start
    post(:post-type="'recruits'", style="width: 75%")
    right-content

</template>

<script>
import RecruitComponent from './Recruit.component'
export default RecruitComponent
</script>
