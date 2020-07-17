<template>
  <v-container>
    <v-navigation-drawer
      v-model="drawer"
      color="primary"
      :expand-on-hover="expandOnHover"
      :mini-variant="miniVariant"
      :right="right"
      :permanent="permanent"
      :src="bg"
      absolute
    >
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Application</v-list-item-title>
            <v-list-item-subtitle>Subtext</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  computed: {}
})
export default class Navbar extends Vue {
  drawer = true;
  items = [
    { title: "Dashboard", icon: "mdi-view-dashboard" },
    { title: "Photos", icon: "mdi-image" },
    { title: "About", icon: "mdi-help-box" }
  ];
  color = "primary";
  colors = ["primary", "blue", "success", "red", "teal"];
  right = false;
  permanent = true;
  miniVariant = false;
  expandOnHover = true;
  background = false;

  created() {
    this.$vuetify.theme.dark = true;
  }

  get bg() {
    return this.background
      ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      : undefined;
  }
}
</script>