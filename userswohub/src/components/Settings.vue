<template>
  <v-app-bar elevation="0"  color="grayTec" app  clipped-right>
    <v-spacer></v-spacer>
    <router-link style="text-decoration: none; " to="/personalinfo"><p class="whiteTec--text text-h6 pa-1 mb-1">Personal Info</p></router-link>
    <v-spacer></v-spacer>
    <router-link style="text-decoration: none; " to="/goals"><p class="whiteTec--text text-h6 pa-1 mb-1">Your Goals</p></router-link>
    <v-spacer></v-spacer>
    <router-link style="text-decoration: none; " to="/resume"><p class="whiteTec--text pa-1 mb-1 text-h6">Resume</p></router-link>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
export default {
  name: "Settings"
}
</script>

<style scoped>

</style>