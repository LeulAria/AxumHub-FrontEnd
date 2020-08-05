<template>
	<div class="hidden">
		<vs-navbar fixed shadow square center-collapsed v-model="active" class="bg-image" dark>
			<template #left class="items">
				<vs-button @click="activeSidebar = !activeSidebar" flat icon>
					<i class="bx bx-menu"></i>
				</vs-button>
			</template>
			<vs-navbar-item :active="active == 'guide'" id="guide" class="items">Dashboard</vs-navbar-item>
			<vs-navbar-item :active="active == 'docs'" id="docs" class="items">Projects</vs-navbar-item>
			<vs-navbar-item :active="active == 'components'" id="components" class="items">Profie</vs-navbar-item>
			<vs-navbar-item :active="active == 'license'" id="license" class="items">QA</vs-navbar-item>
			<template #right class="items">
				<vs-button flat circle size="small" class="px-2">Logout</vs-button>
				<vs-button>Explore</vs-button>
				<v-menu
					transition="slide-y-transition"
					:close-on-content-click="false"
					:nudge-width="200"
					offset-y
				>
					<template v-slot:activator="{ on, attrs }">
						<vs-button
							circle
							upload
							color="whatsapp"
							icon
							animation-type="rotate"
							v-bind="attrs"
							v-on="on"
						>
							<i class="bx bxs-bell"></i>
							<template #animate>
								<i class="bx bxs-bell-ring"></i>
							</template>
						</vs-button>
					</template>

					<v-card>
						<v-list>
							<v-list-item>
								<v-list-item-avatar>
									<img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
								</v-list-item-avatar>

								<v-list-item-content>
									<v-list-item-title>John Leider</v-list-item-title>
									<v-list-item-subtitle>Founder of Vuetify.js</v-list-item-subtitle>
								</v-list-item-content>

								<v-list-item-action></v-list-item-action>
							</v-list-item>
						</v-list>

						<v-divider></v-divider>

						<v-list>
							<v-list-item>
								<v-list-item-action>
									<v-switch color="purple"></v-switch>
								</v-list-item-action>
								<v-list-item-title>Enable messages</v-list-item-title>
							</v-list-item>

							<v-list-item>
								<v-list-item-action>
									<v-switch color="purple"></v-switch>
								</v-list-item-action>
								<v-list-item-title>Enable hints</v-list-item-title>
							</v-list-item>
						</v-list>

						<v-card-actions>
							<v-spacer></v-spacer>

							<v-btn text @click="menu = false">Clear</v-btn>
						</v-card-actions>
					</v-card>
				</v-menu>
			</template>
		</vs-navbar>
		<vs-sidebar v-model="active" :open.sync="activeSidebar" class="mxh-vh fixed-position">
			<template #logo>
				<img src="../assets/logo.png" class="brand-logo" alt="logo" />
				<h5 class="ml-5">{{ $t('appName') }}</h5>
			</template>
			<template v-for="(menu, i) in menus">
				<vs-sidebar-item :id="menu.id" :key="i" :to="menu.to" link>
					<template #icon>
						<i :class="`{ ${menu.icon} }`"></i>
					</template>
					{{menu.title}}
				</vs-sidebar-item>
			</template>
			<vs-sidebar-group>
				<template #header>
					<vs-sidebar-item arrow>
						<template #icon>
							<i class="bx bx-group"></i>
						</template>
						Social media
					</vs-sidebar-item>
				</template>

				<vs-sidebar-item id="Instagram">
					<template #icon>
						<i class="bx bxl-instagram"></i>
					</template>
					Instagram
				</vs-sidebar-item>
			</vs-sidebar-group>

			<template #footer>
				<vs-row justify="space-between">
					<vs-avatar>
						<img
							src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/girl_female_woman_avatar-512.png"
							alt
						/>
					</vs-avatar>
					<h5 class="mr-auto ml-2 mt-3">{{userInfo.name}}</h5>

					<vs-switch dark v-model="globaltheme" class="bshadow">
						<template #circle>
							<i v-if="!globaltheme" class="bx bxs-moon"></i>
							<i v-else class="bx bxs-sun"></i>
						</template>
					</vs-switch>
					<!-- <vs-avatar badge-color="danger" badge-position="top-right">
						<i class="bx bx-bell"></i>
						<template #badge>28</template>
					</vs-avatar>-->
				</vs-row>
			</template>
		</vs-sidebar>
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
	active = "home";
	activeSidebar = false;

	toggleGlobalTheme!: any;

	menus = [
		{
			title: "Dashboard",
			icon: "bx bxs-dashboard",
			to: "/dashboard",
			id: "dashboard"
		},
		{ title: "Blog", icon: "bx bxl-blogger", to: "/axum_blogs", id: "blog" },
		{ title: "Q/A", icon: "bx bx-question-mark", to: "/qa", id: "qa" },
		{
			title: "Project",
			icon: "bx bxs-folder-open",
			to: "/project",
			id: "project"
		},
		{
			title: "Profile",
			icon: "bx bxs-user-detail",
			to: "/profile",
			id: "profile"
		},
		{
			title: "Logout",
			icon: "bx bxs-log-out-circle",
			to: "/logout",
			id: "logout"
		},
		{ title: "Settings", icon: "bx bxs-cog", to: "/settings", id: "settings" }
	];
	drawer = true;
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

	get globaltheme() {
		return this.globalTheme;
	}

	set globaltheme(val: boolean) {
		this.toggleGlobalTheme();
		this.$vuetify.theme.dark = this.globalTheme;
	}

	get bg() {
		return this.background
			? "https://www.omenkaonline.com/wp-content/uploads/2017/08/ETH_2015_DK_154_0.jpg"
			: undefined;
	}
}
</script>

<style lang="stylus" scoped>
.bg-image
	background-image linear-gradient(to bottom, rgba(0,0,0,0.0),rgba(0,0,20,0.0)), url('https://s3.envato.com/files/248925149/Preview%20Image.jpg')
  background-position top
  background-size cover
  position relative

.items
	z-index 1000
	// color #aaa
	
.brand-logo
	transform scale(1.6)
	box-shadow 0px 2px 15px rgba(0,0,0,0.2)
	border-radius 50%
.v-menu__content
	background transparent !important
	box-shadow none !important
	box-shadow 0px 0px 11px rgba(0,0,0,0.282) !important
	background yellow
	border-radius .5rem
</style>