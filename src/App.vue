<template>
	<v-app>
		<side-navbar v-if="loggedIn"></side-navbar>
		<v-main :class="{'pa-0': loggedIn, 'ml-md-14': loggedIn}">
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
</style>
