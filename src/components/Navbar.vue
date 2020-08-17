
<template>
	<div>
		<v-app-bar color="deep-purple accent-4 ml-16" dense dark>
			<v-app-bar-nav-icon v-if="$vuetify.breakpoint.xsOnly"></v-app-bar-nav-icon>
			<v-toolbar-title class="ml-4">Dashbaord</v-toolbar-title>
			<v-spacer></v-spacer>

			<v-btn icon>
				<v-icon>mdi-heart</v-icon>
			</v-btn>

			<v-btn icon>
				<v-icon>mdi-magnify</v-icon>
			</v-btn>

			<v-menu left bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-bind="attrs" v-on="on">
						<v-icon>mdi-dots-vertical</v-icon>
					</v-btn>
				</template>

				<v-list>
					<v-list-item v-for="n in 5" :key="n" @click="() => {}">
						<v-list-item-title>Option {{ n }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>

			<v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
				<template v-slot:activator="{ on, attrs }">
					<v-avatar color="indigo" size="36" v-bind="attrs" v-on="on">
						<img src="https://cdn.vuetifyjs.com/images/john.jpg" />
					</v-avatar>
				</template>

				<v-card>
					<v-list>
						<v-list-item>
							<v-list-item-avatar>
								<img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
							</v-list-item-avatar>

							<v-list-item-content>
								<v-list-item-title>{{userInfo.name}}</v-list-item-title>
								<v-list-item-subtitle>{{userInfo.email}}</v-list-item-subtitle>
							</v-list-item-content>

							<v-list-item-action>
								<v-tooltip top>
									<template v-slot:activator="{ on, attrs }">
										<v-btn icon v-bind="attrs" v-on="on">
											<v-icon>mdi-image-edit-outline</v-icon>
										</v-btn>
									</template>
									<span>Change avatar</span>
								</v-tooltip>
							</v-list-item-action>
						</v-list-item>
					</v-list>

					<v-divider></v-divider>

					<v-list>
						<v-list-item>
							<v-list-item-action>
								<v-btn icon>
									<i class="bx bx-user-circle icon-size-md"></i>
								</v-btn>
							</v-list-item-action>
							<v-list-item-title>Profile</v-list-item-title>
						</v-list-item>

						<v-list-item>
							<v-list-item-action>
								<v-btn icon>
									<i class="bx bx-log-out-circle icon-size-md"></i>
								</v-btn>
							</v-list-item-action>
							<v-list-item-title>Logout</v-list-item-title>
						</v-list-item>

						<v-list-item>
							<v-list-item-action>
								<v-btn icon @click="changeTheme()">
									<i v-if="globalTheme" class="bx bx-sun icon-size-md"></i>
									<i v-if="!globalTheme" class="bx bx-moon icon-size-md"></i>
								</v-btn>
							</v-list-item-action>
							<v-list-item-title>change theme</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-card>
			</v-menu>
		</v-app-bar>

		<v-navigation-drawer
			v-model="drawer"
			class="secondary"
			:expand-on-hover="expandOnHover"
			:mini-variant="false"
			mini-variant-width="70"
			:right="right"
			:permanent="permanent"
			:src="bg"
			gradient="to top right, rgba(0,0,0,0.8), rgba(0,0,0,.7)"
			fixed
			:width="200"
		>
			<v-list dense nav class="py-0 px-3 nav-content" dark>
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

				<v-list-item v-for="item in items" :key="item.title" :to="item.to" class="hoverable" link>
					<v-list-item-icon>
						<v-icon class="nav-icons">{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</div>
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
		{ title: "Blog", icon: "mdi-compass", to: "/axum_blogs" },
		{ title: "Q/A", icon: "mdi-comment-question", to: "/qa" },
		{ title: "Project", icon: "mdi-folder-cog", to: "/project" },
		{ title: "Profile", icon: "mdi-account-settings", to: "/profile" },
		{ title: "Settings", icon: "mdi-cog", to: "/setting" }
	];
	drawer = true;
	menu = false;

	color = "blue";
	colors = ["primary", "blue", "success", "red", "teal"];
	right = false;
	permanent = true;
	miniVariant = true;
	expandOnHover = true;
	background = true;
	created() {
		this.$vuetify.theme.dark = this.globalTheme;
	}
	get bg() {
		return this.background
			? "https://www.omenkaonline.com/wp-content/uploads/2017/08/ETH_2015_DK_154_0.jpg"
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
	transition all 0.4s
	&:hover
		transform scale(1.3)
.nav-icons
	margin-left -3px !important
	
.nav-content
	position relative
	height 100%
	&::after
		content ''
		position absolute
		z-index -1
		top 0
		left 0
		width 100%
		height 100%
		background-image linear-gradient(to bottom, rgba(0,0,30,0.6),rgba(60,0,30,0.95))
</style>

	// submit() {
	// 	const form = document.getElementById("avatar-form") as HTMLFormElement;
	// 	const formData = new FormData(form);
	// 	this.uploadAvatar(formData);
	// }
