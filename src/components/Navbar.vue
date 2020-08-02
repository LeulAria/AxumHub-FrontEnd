<template>
	<div class="hidden">
		<vs-navbar fixed shadow square center-collapsed v-model="active">
			<template #left>
				<vs-button @click="activeSidebar = !activeSidebar" flat icon>
					<i class="bx bx-menu"></i>
				</vs-button>
			</template>
			<vs-navbar-item :active="active == 'guide'" id="guide">Guide</vs-navbar-item>
			<vs-navbar-item :active="active == 'docs'" id="docs">Documents</vs-navbar-item>
			<vs-navbar-item :active="active == 'components'" id="components">Components</vs-navbar-item>
			<vs-navbar-item :active="active == 'license'" id="license">license</vs-navbar-item>
			<template #right>
				<vs-button flat circle size="small" class="px-2">Login</vs-button>
				<vs-button>Get Started</vs-button>
			</template>
		</vs-navbar>
		<vs-sidebar v-model="active" :open.sync="activeSidebar" class="mxh-vh fixed-position">
			<template #logo>
				<img src="../assets/logo.png" class="brand-logo" alt="logo" />
				<h5 class="ml-5">AxumHUB</h5>
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
		{ title: "Settings", icon: "bx bxs-cog", to: "/", id: "settings" }
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
.brand-logo
	transform scale(1.6)
	box-shadow 0px 2px 15px rgba(0,0,0,0.2)
	border-radius 50%
</style>