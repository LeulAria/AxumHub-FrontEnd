<template>
  <v-app>
    <side-navbar></side-navbar>
    <v-content></v-content>
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
