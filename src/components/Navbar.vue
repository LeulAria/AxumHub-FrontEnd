<template>
	<v-container>
		<v-navigation-drawer
			v-model="drawer"
			class="secondary"
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

					<v-list-item-content v-if="userInfo.name">
						<v-list-item-title>{{userInfo.name}}</v-list-item-title>
						<v-list-item-subtitle>{{userInfo.email}}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>

				<v-divider class="mb-2"></v-divider>

				<v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
					<v-list-item-icon>
						<v-icon class="nav-icons">{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-list-item @click="changeTheme()">
					<v-list-item-icon>
						<v-icon class="nav-icons" v-if="globalTheme">mdi-white-balance-sunny</v-icon>
						<v-icon class="nav-icons" v-if="!globalTheme">mdi-moon-waxing-crescent</v-icon>
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
		...mapGetters(["globalTheme"]),
		...mapGetters("users", ["userInfo"])
	},
	methods: {
		...mapActions(["toggleGlobalTheme"])
	}
})
export default class Navbar extends Vue {
	globalTheme!: boolean;
	userInfo!: any;

	toggleGlobalTheme!: any;

	items = [
		{ title: "Dashboard", icon: "mdi-view-dashboard", to: "/dashboard" },
		{ title: "Blog", icon: "mdi-compass", to: "/" },
		{ title: "Q/A", icon: "mdi-comment-question", to: "/qa" },
		{ title: "Project", icon: "mdi-folder-cog", to: "/chatspace" },
		{ title: "Profile", icon: "mdi-account-settings", to: "/profile" },
		{ title: "Logout", icon: "mdi-logout-variant", to: "/logout" },
		{ title: "Settings", icon: "mdi-cog", to: "/" }
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
.top-avatar {
	margin-left: -10px !important;
	transition: all 0.4s;

	&:hover {
		transform: scale(1.3);
	}
}

.nav-icons {
	margin-left: -3px !important;
}
</style>