<template>
  <v-overlay :value="overlay">
    <v-progress-circular indeterminate width="8" size="70"></v-progress-circular>
  </v-overlay>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Logout extends Vue {
  overlay = false;

  created() {
    this.overlay = true;
    this.$store.dispatch("users/logOut");
    setTimeout(() => {
      this.$router.push({ name: "Login" });
      this.overlay = false;
    }, 2000);
  }
}
</script>