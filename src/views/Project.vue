<template>
	<v-main>
		<v-row no-gutters class="my-2 mb-1">
			<v-col cols="10" sm="10" class="mx-5 mb-2 d-flex align-center">
				<h3 class="grey--text text--darken-2 mr-auto">Axum HUB Project</h3>
				<v-menu transition="scroll-y-reverse-transition" class="ml-auto">
					<template v-slot:activator="{ on, attrs }">
						<v-btn text class="ma-2 elevation-0" fab small v-bind="attrs" v-on="on">
							<v-icon>mdi-pencil-plus-outline</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item :to="{ name: 'NewProject' }" link>
							<v-list-item-title>Create New Project</v-list-item-title>
						</v-list-item>
						<v-list-item :to="{ name: 'UserPosts' }" link>
							<v-list-item-title>See Your Projects</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-col>
		</v-row>

		<v-container fluid class="px-xs-4 px-sm-8 px-md-15 py-0">
			<v-row justify="space-between">
				<v-col cols="12" xs="12" sm="6" md="6">
					<v-row>
						<div class="d-flex">
							<v-btn
								small
								@click="toggleTab(1)"
								:class="{ 'elevation-0': true, 'mx-1': true, 'indigo': isTab(1), 'white--text': isTab(1) }"
							>Explor Projects</v-btn>
							<v-btn
								small
								@click="toggleTab(2)"
								:class="{ 'elevation-0': true, 'mx-1': true, 'indigo': isTab(2), 'white--text': isTab(2) }"
							>Projects</v-btn>
						</div>
						<v-col cols="12" xs="12" v-if="isTab(1)">
							<v-text-field
								v-model="search"
								cache-items
								prepend-inner-icon="mdi-magnify"
								class="auto-complete mt-4"
								flat
								solo-inverted
								hide-no-data
								label="Search Projects..."
								:autocomplete="false"
							></v-text-field>
							<v-row>
								<v-col cols="12" xs="12" sm="6" v-for="project in filteredProjects" :key="project._id">
									<v-card
										outlined
										class="project-card rounded-lg pa-2 py-5 my-1 overflow-hidden"
										min-height="160"
										max-height="200"
									>
										<small
											class="project-date grey--text text--darken-1 ma-0"
										>{{project&&project.data.slice(0,10)}}</small>
										<h4 class="ml-4 bolded">{{project.title}}</h4>
										<v-card-subtitle>{{project&&project.summary.split(' ').slice(0,10).join(' ')}}</v-card-subtitle>
										<div class="project-star d-flex align-center">
											<v-icon color="info">mdi-star-outline</v-icon>
											<small>12</small>
										</div>
									</v-card>
								</v-col>
							</v-row>
						</v-col>
						<v-col cols="12" xs="12" v-if="isTab(2)">
							<h5>Projects..... Joined...</h5>
						</v-col>
					</v-row>
				</v-col>
				<v-col cols="12" xs="12" sm="6" md="5">
					<v-text-field
						v-model="searchUserProjects"
						cache-items
						prepend-inner-icon="mdi-magnify"
						class="auto-complete mx-4 mx-md-13"
						flat
						hide-no-data
						label="Search Your Projects..."
						:autocomplete="false"
						v-if="projects"
					></v-text-field>
					<v-subheader>Your Projects</v-subheader>
					<v-card
						v-for="project in filteredUserProjects"
						:key="project._id"
						outlined
						class="project-card rounded-lg pa-2 py-5 my-3 overflow-hidden"
						min-height="150"
						max-height="150"
					>
						<small
							class="project-date grey--text text--darken-1 ma-0"
						>{{project&&project.data.slice(0,10)}}</small>
						<h4 class="ml-4 bolded">{{project.title}}</h4>
						<v-card-subtitle>{{project&&project.summary.split(' ').slice(0,10).join(' ')}}</v-card-subtitle>
						<div class="project-star d-flex align-center">
							<v-icon color="info">mdi-star-outline</v-icon>
							<small>12</small>
						</div>
						<v-col cols="12" sm="6" offset-sm="3">
							<div class="text-center">
								<v-menu
									class="menu-project"
									v-model="project.menu"
									:close-on-content-click="false"
									:nudge-width="200"
									offset-x
								>
									<template v-slot:activator="{ on, attrs }">
										<v-btn text fab small class="project-more-btn elevation-0" v-bind="attrs" v-on="on">
											<v-icon>mdi-dots-vertical</v-icon>
										</v-btn>
									</template>

									<v-card outlined class="rounded-xl elevation-0">
										<v-list>
											<v-list-item>
												<v-list-item-action>
													<v-btn fab small class="elevation-0" link>
														<v-icon>mdi-eye</v-icon>
													</v-btn>
												</v-list-item-action>
												<v-list-item-title>See Detail</v-list-item-title>
											</v-list-item>

											<v-list-item>
												<v-list-item-action>
													<v-btn @click="openChat(project.chatgroupname)" fab small class="elevation-0">
														<v-icon>mdi-chat</v-icon>
													</v-btn>
												</v-list-item-action>
												<v-list-item-title>Go to chat</v-list-item-title>
											</v-list-item>
										</v-list>
									</v-card>
								</v-menu>
							</div>
						</v-col>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
		<v-overlay :value="isLoading | isLoadingUser">
			<v-progress-circular indeterminate size="64"></v-progress-circular>
		</v-overlay>
	</v-main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";

@Component({
	computed: {
		...mapGetters("users", ["userInfo"]),
		...mapGetters("project", [
			"isLoading",
			"isLoadingUser",
			"projects",
			"userProjects"
		])
	},
	methods: {
		...mapActions("project", ["getAllProjects", "getUserProjects"])
	}
})
export default class Project extends Vue {
	search = "";
	searchUserProjects = "";
	isLoading!: boolean;
	isLoadingUser!: boolean;
	userInfo!: any;
	projects!: [any];
	userProjects!: [any];
	getAllProjects!: any;
	getUserProjects!: any;

	tab = 1;

	fav = true;
	menu = false;
	message = false;
	hints = true;

	mounted() {
		this.getAllProjects();
		this.getUserProjects(this.userInfo.id);
		this.projects.forEach((project: any) => {
			project.menu = false;
		});
		console.log(this.projects);
	}

	toggleTab(tab: number) {
		this.tab = tab;
	}

	isTab(tab: number) {
		return this.tab == tab;
	}

	openChat(id: string) {
		this.$router.push({ name: "Chat", params: { id } });
	}

	showDetail(id: string) {
		console.log("show project detail");
	}

	set filteredUserProjects(val: any) {
		this.userProjects = val;
	}
	get filteredUserProjects() {
		const p = this.userProjects.filter((project: any) => {
			return project.title.toLowerCase().match(this.searchUserProjects);
		});
		return p;
	}

	set filteredProjects(val: any) {
		this.projects = val;
	}
	get filteredProjects() {
		const p = this.projects.filter((project: any) => {
			return project.title.toLowerCase().match(this.search);
		});
		return p;
	}
}
</script>

<style lang="stylus" scoped>
.container
	padding 0
.project-card
	position relative
.project-date
	position absolute
	font-size .67em
	top 5px
	right 10px
.project-star
	position absolute
	bottom 8px
	left: 20px
	.v-icon
		font-size 1em
.project-more-btn
	position absolute
	bottom 8px
	right 20px
.tab-btn
	padding 5px 1em
	margin 1em
	height 28px
	font-size .76em 
	letter-spacing 1px
	border-radius 5px
	cursor pointer
.tab--active
	background #45B
	color #FFF

.v-menu__content
	background transparent !important
	box-shadow none !important
	background yellow
</style>