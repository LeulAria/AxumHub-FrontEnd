<template>
	<v-app>
		<v-btn v-if="$vuetify.breakpoint.xsOnly" fab small class="drawer-menu" @click="toggleDrawerSM">
			<v-icon>mdi-menu</v-icon>
		</v-btn>
		<side-navbar v-if="loggedIn"></side-navbar>
		<v-main :class="{'pa-0': loggedIn, 'nav-drawer-padding': loggedIn}" class="secondary">
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

import Navbar from "@/components/Navbar.vue";

@Component({
	components: {
		"side-navbar": Navbar
	},
	computed: {
		...mapGetters(["loggedIn"])
	}
})
export default class App extends Vue {}
</script>

<style lang="stylus" scoped>
.container
  padding 0 !important
.drawer-menu 
	position fixed
	z-index 1000
	right 10px
	top 10px
.nav-drawer-padding
	margin-left 70px
</style>
