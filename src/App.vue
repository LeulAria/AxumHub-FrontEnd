<template>
  <v-app>
    <side-navbar></side-navbar>
    <v-main class="ml-md-14">
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
