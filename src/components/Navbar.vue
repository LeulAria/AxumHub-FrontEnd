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
      <v-list dense nav class="py-0 px-3">
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar class="top-avatar">
            <img src="../assets/logo.png" alt />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jhon some thing Doe</v-list-item-title>
            <v-list-item-subtitle>Subtext</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="mb-2"></v-divider>

        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="changeTheme()">
          <v-list-item-icon>
            <v-icon v-if="globalTheme">mdi-white-balance-sunny</v-icon>
            <v-icon v-if="!globalTheme">mdi-moon-waxing-crescent</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Change theme</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";

@Component({
  computed: {
    ...mapGetters(["globalTheme"])
  },
  methods: {
    ...mapActions(["toggleGlobalTheme"])
  }
})
export default class Navbar extends Vue {
  globalTheme!: boolean;
  toggleGlobalTheme!: any;

  items = [
    { title: "Dashboard", icon: "mdi-view-dashboard-outline" },
    { title: "Blog", icon: "mdi-account-settings-outline" },
    { title: "Q/A", icon: "mdi-comment-question-outline" },
    { title: "Profile", icon: "mdi-account-settings-outline" },
    { title: "Logout", icon: "mdi-card-bulleted-settings-outline" },
    { title: "Settings", icon: "mdi-cog-outline" }
  ];
  drawer = true;
  color = "blue";
  colors = ["primary", "blue", "success", "red", "teal"];
  right = false;
  permanent = true;
  miniVariant = false;
  expandOnHover = true;
  background = false;

  created() {
    this.$vuetify.theme.dark = this.globalTheme;
  }

  get bg() {
    return this.background
      ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      : undefined;
  }

  changeTheme() {
    this.toggleGlobalTheme();
    this.$vuetify.theme.dark = this.globalTheme;
  }
}
</script>

<style lang="stylus" scoped>
.top-avatar 
  margin-left -10px !important
  transition all .4s
  &:hover 
    transform scale(1.3)
</style>