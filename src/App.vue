<template>
	<v-app>
		<side-navbar v-if="loggedIn && navbar"></side-navbar>
		<v-main
			:class="{'pa-0': loggedIn, 'mt-app-bar': loggedIn, 'nav-drawer-padding': !$vuetify.breakpoint.xsOnly && loggedIn}"
		>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";

import Navbar from "@/components/Navbar.vue";

@Component({
	components: {
		"side-navbar": Navbar
	},
	computed: {
		...mapGetters([
			"loggedIn",
			"snackbarText",
			"snackbarShow",
			"snackbarTimeout",
			"navbar"
		])
	},
	methods: {
		...mapActions(["hideSnackbar"])
	}
})
export default class App extends Vue {
	loaggedIn!: any;
	hideSnackbar!: any;
	snackbarText!: string;
	snackbarShow!: boolean;
	snackbarTimeout!: number;

	set show(val) {
		this.hideSnackbar();
	}
	get show() {
		return this.snackbarShow;
	}
	closeHideSnackbar() {
		this.hideSnackbar();
	}
}
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
.mt-app-bar
	margin-top 48px
</style>
