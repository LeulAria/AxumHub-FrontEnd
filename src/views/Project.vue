<template>
	<v-main>
		<v-row no-gutters class="my-2 mb-1">
			<v-col cols="10" sm="10" class="mx-5 mb-2 d-flex align-center">
				<h3 class="grey--text text--darken-2 mr-auto">Axum HUB Project</h3>
				<v-menu transition="scroll-y-reverse-transition" class="ml-auto" offset-y>
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
										min-height="180"
										max-height="180"
									>
										<v-tooltip top>
											<template v-slot:activator="{ on, attrs }">
												<v-icon
													v-bind="attrs"
													v-if="project.isOwn"
													v-on="on"
													color="info"
													class="top-mark"
												>mdi-bookmark-check</v-icon>
											</template>
											<span>Your Project</span>
										</v-tooltip>
										<v-tooltip top>
											<template v-slot:activator="{ on, attrs }">
												<i
													v-bind="attrs"
													v-if="project.isContrib"
													v-on="on"
													color="info"
													class="bx bxs-quote-right icon-size-md"
												></i>
											</template>
											<span>Contributer on this project</span>
										</v-tooltip>
										<small
											class="project-date grey--text text--darken-1 ma-0"
										>{{project&&project.data.slice(0,10)}}</small>
										<h4 class="ml-4 bolded">{{project&&project.title}}</h4>
										<v-card-subtitle
											class="project-summary"
										>{{project&&project.summary.split(' ').slice(0,6).join(' ')+'...'}}</v-card-subtitle>
										<div class="project-star d-flex align-center justify-center">
											<div>
												<v-icon color="info">mdi-star-outline</v-icon>
												<small>12</small>
											</div>
										</div>

										<v-tooltip top class>
											<template v-slot:activator="{ on, attrs }">
												<v-btn
													class="project-join-action"
													v-if="!project.isContrib&&!project.isOwn"
													icon
													v-bind="attrs"
													v-on="on"
													@click="applyJoinProject(project._id)"
												>
													<v-icon>mdi-reply-circle</v-icon>
												</v-btn>
											</template>
											<span>Requst Join Project</span>
										</v-tooltip>
									</v-card>
								</v-col>
							</v-row>
						</v-col>
						<v-col cols="12" xs="12" v-if="isTab(2)">
							<v-text-field
								v-model="searchJoinedProjects"
								prepend-inner-icon="mdi-magnify"
								class="auto-complete mt-5"
								flat
								solo-inverted
								hide-no-data
								label="Search Projects..."
								:autocomplete="false"
							></v-text-field>
							<v-subheader>Joined Projects</v-subheader>
							<v-card
								v-for="project in filteredJoinedProjects"
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
								<v-card-subtitle class="project-summary">{{project&&project.summary | snnipit(10) }}</v-card-subtitle>
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
											:nudge-width="90"
											offset-y
										>
											<template v-slot:activator="{ on, attrs }">
												<v-btn text fab small class="project-more-btn elevation-0" v-bind="attrs" v-on="on">
													<v-icon>mdi-dots-vertical</v-icon>
												</v-btn>
											</template>

											<v-card outlined class="rounded-lg elevation-0">
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
		this.loadingproj = this.$vs.loading({
			type: "circles",
			color: "#FF6",
			background: "#000",
			opacity: 0.8,
			scale: 1.3,
			text: "Loading projects..."
		});
		this.getAllProjects();
		this.getUserProjects(this.userInfo.id);
		this.getJoinedProjects();
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

	@Watch("isLoading")
	onLoading(newVal: boolean, oldVal: boolean) {
		// FIXME: remove on prod
		if (!(newVal && this.isLoadingUser && this.isJoinedLoading)) {
			setTimeout(() => this.loadingproj.close(), 1000);
		}
	}
	@Watch("isLoadingUser")
	onisLoadingUser(newVal: boolean, oldVal: boolean) {
		// FIXME: remove on prod
		if (!(newVal && this.isLoading && this.isJoinedLoading)) {
			setTimeout(() => this.loadingproj.close(), 1000);
		}
	}
	@Watch("isJoinedLoading")
	onisJoinedLoading(newVal: boolean, oldVal: boolean) {
		// FIXME: remove on prod
		if (!(newVal && this.isLoadingUser && this.isLoading)) {
			setTimeout(() => this.loadingproj.close(), 1000);
		}
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
</style>