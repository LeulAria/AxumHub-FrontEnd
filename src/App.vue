<template>
  <v-app pa-0>
    <side-navbar></side-navbar>
    <v-main class="pa-0 ml-md-14">
     <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Navbar from "@/components/Navbar.vue";

@Component({
  components: {
    "side-navbar": Navbar
  }
})
export default class App extends Vue {}
</script>

<style lang="stylus" scoped>
.container
  padding 0 !important
</style>
