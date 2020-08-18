<template>
	<v-main>
		<v-row no-gutters class="mt-5 mb-1">
			<v-col cols="10" sm="10" class="mx-5 mb-2 d-flex align-center">
				<h3 class="grey--text text--darken-2 mr-4">All projects</h3>
				<v-btn small :to="{ name: 'NewProject' }" link class="elevation-0 mx-1 info white--text">
					<i class="bx bx-plus"></i>Add Project
				</v-btn>
				<v-spacer></v-spacer>

				<v-menu transition="scale-transition" class="rounded-lg" bottom offset-y>
					<template v-slot:activator="{ on, attrs }">
						<v-badge
							class="mr-5"
							:content="joinNotifications.length"
							:value="joinNotifications.length"
							overlap
						>
							<v-icon v-bind="attrs" v-on="on">mdi-bell-outline</v-icon>
						</v-badge>
					</template>

					<v-list v-for="(joinNotification, i) in joinNotifications" :key="i">
						<div v-if="i==0">
							<v-subheader>Join Requests</v-subheader>
							<v-divider inset></v-divider>
						</div>
						<v-list-item>
							<v-list-item-title>{{joinNotification.userid.name}}</v-list-item-title>
							<v-tooltip top>
								<template v-slot:activator="{ on, attrs }">
									<v-btn
										icon
										small
										color="success"
										class="elevation-0 ml-3"
										v-bind="attrs"
										v-on="on"
										@click="acceptJoinProject(joinNotification)"
									>
										<i class="bx bx-check-circle icon-size-md"></i>
									</v-btn>
								</template>
								<span>Accept Join Request</span>
							</v-tooltip>
							<v-tooltip top>
								<template v-slot:activator="{ on, attrs }">
									<v-btn
										icon
										small
										fab
										color="error"
										class="elevation-0 mx-3"
										v-bind="attrs"
										v-on="on"
										@click="rejectJoinProject(joinNotification)"
									>
										<i class="bx bx-x-circle icon-size-md"></i>
									</v-btn>
								</template>
								<span>Reject Join Request</span>
							</v-tooltip>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-col>
		</v-row>

		<v-container fluid class="px-xs-4 px-sm-8 px-md-15 py-0">
			<v-text-field
				v-model="searchUserProjects"
				cache-items
				prepend-inner-icon="mdi-magnify"
				class="auto-complete mx-4 mx-md-13 mt-sm-5"
				flat
				hide-no-data
				label="Search Your Projects..."
				:autocomplete="false"
				v-if="projects"
			></v-text-field>
			<v-row>
				<v-subheader>Your Projects</v-subheader>
				<v-spacer></v-spacer>
				<v-btn :to="{ name: 'ExploreProjects' }" text small link class="elevation-0 info mx-1">
					<i class="bx bx-search-alt mr-1"></i>Explore Projects
				</v-btn>
			</v-row>
			<v-row>
				<h3 v-if="!filteredUserProjects.length" class="mt-14 text-center">No Projects Yet!</h3>
				<v-col cols="12" xs="10" sm="6" md="4" v-for="project in filteredProjects" :key="project._id">
					<v-card
						outlined
						class="project-card rounded-lg pa-2 py-5 my-3 overflow-hidden"
						min-height="150"
						max-height="160"
						v-if="project.isOwn || project.isContrib"
					>
						<small class="user-projet-type">{{ project.isOwn ? 'owner' : 'member' }}</small>
						<small
							class="project-date grey--text text--darken-1 ma-0"
						>{{project&&project.data.slice(0,10)}}</small>
						<h4 class="mt-3 ml-4 bolded project-link" @click="seeDetail(project._id)">{{project.title}}</h4>
						<v-card-subtitle
							class="project-summary"
						>{{project&&project.summary.split(' ').slice(0,10).join(' ')}}</v-card-subtitle>
						<div class="project-star d-flex align-center">
							<i class="bx bx-star"></i>
							<small>12</small>
						</div>

						<v-col cols="12" sm="6" offset-sm="3">
							<div class="text-center">
								<v-menu
									class="menu-project"
									v-model="project.menu"
									:close-on-content-click="false"
									:nudge-width="90"
									offset-y
								>
									<template v-slot:activator="{ on, attrs }">
										<v-btn text fab small class="project-more-btn elevation-0" v-bind="attrs" v-on="on">
											<v-icon>mdi-dots-vertical</v-icon>
										</v-btn>
									</template>

									<v-card class="rounded-lg elevation-0 bshadow">
										<v-list>
											<v-list-item>
												<vs-button @click="seeDetail(project._id)">
													See Detail
													<template #animate>
														<i class="bx bxs-detail icon-size-md"></i>
													</template>
												</vs-button>
											</v-list-item>
											<v-list-item>
												<vs-button @click="openChat(project.chatgroupname)">
													Go to chat
													<template #animate>
														<i class="bx bxs-chat icon-size-md"></i>
													</template>
												</vs-button>
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
			"userProjects",
			"joinedProjects",
			"isJoinedLoading",
			"joinNotifications"
		])
	},
	methods: {
		...mapActions("project", [
			"getAllProjects",
			"getUserProjects",
			"getJoinedProjects",
			"applyJoin",
			"joinNotification",
			"acceptJoin",
			"rejectJoin"
		])
	}
})
export default class Project extends Vue {
	search = "";
	searchUserProjects = "";
	searchJoinedProjects = "";
	isLoading!: boolean;
	isLoadingUser!: boolean;
	isJoinedLoading!: boolean;
	userInfo!: any;
	projects!: [any];
	userProjects!: [any];
	joinedProjects!: [any];
	joinNotifications!: [any];
	getAllProjects!: any;
	getUserProjects!: any;
	getJoinedProjects!: any;
	applyJoin!: any;
	acceptJoin!: any;
	rejectJoin!: any;
	loadingproj!: any;

	tab = 1;

	fav = true;
	menu = false;
	message = false;
	hints = true;

	mounted() {
		this.getAllProjects();
		this.getUserProjects(this.userInfo.id);
		this.getJoinedProjects();
	}

	toggleTab(tab: number) {
		this.tab = tab;
		this.getAllProjects();
		this.getUserProjects(this.userInfo.id);
		this.getJoinedProjects();
	}

	isTab(tab: number) {
		return this.tab == tab;
	}

	openChat(id: string) {
		this.$router.push({ name: "Chat", params: { id } });
	}

	seeDetail(id: string) {
		this.$router.push({ name: "ProjectDetail", params: { id } });
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

	set filteredJoinedProjects(val: any) {
		this.joinedProjects = val;
	}
	get filteredJoinedProjects() {
		const jp = this.joinedProjects.filter((project: any) => {
			return project.title.toLowerCase().match(this.search);
		});
		return jp;
	}

	// apply to join project
	applyJoinProject(id: string) {
		this.applyJoin(id)
			.then(() => {
				this.$store.dispatch("snackbar", "Join request send successfully!");
			})
			.catch((err: any) => {
				this.$store.dispatch("snackbar", "Join request have been sent...");
			});
	}

	acceptJoinProject(project: any) {
		const {
			projectid: { title, _id },
			userid: { name },
			userid
		} = project;

		this.acceptJoin({ projectid: _id, userid: userid._id })
			.then(() => {
				this.$store.dispatch(
					"snackbar",
					`${name} Joined project ${title} successfully!`
				);
			})
			.catch((err: any) => {
				this.$store.dispatch(
					"snackbar",
					`${name} Joined project ${title} successfully!`
				);
			});
	}

	rejectJoinProject(project: any) {
		console.log(project);
		const {
			projectid: { title, _id },
			userid: { name },
			userid
		} = project;

		this.rejectJoin({ projectid: _id, userid: userid._id })
			.then(() => {
				this.$store.dispatch(
					"snackbar",
					`${name}'s request has been rejected successfully for project ${title}!`
				);
			})
			.catch((err: any) => {
				this.$store.dispatch(
					"snackbar",
					`${name}'s request has been rejected successfully for project ${title}!`
				);
			});
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
		font-size 1.2em
.project-join-action
	position absolute
	bottom 8px
	right: 20px
	.v-icon
		font-size 1.8em
	
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
	box-shadow 0px 0px 11px rgba(0,0,0,0.182) !important
	background yellow
	border-radius .5rem
.top-mark
	position absolute
	top -2px
	left 4px
	font-size 1.5rem !important
.project-summary
	font-size .83rem !important
.user-projet-type
	position absolute
	top 5px
	left 5px
	padding 2px 10px
	border-radius 7px
	background #5B6
	color #fff
.project-link
	color #349
	cursor pointer
</style>