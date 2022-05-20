<template>
    <p class="grayTec--text text-md-start text-center text-h6">{{ title }} {{ info }}</p>
</template>

<script>
export default {
  name: "Profile",
  props:{
    title:String,
    info:String,
  }
}
</script>

<style scoped>

</style>