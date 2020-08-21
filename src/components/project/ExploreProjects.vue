<template>
	<v-main>
		<v-row no-gutters class="my-2 mb-1">
			<v-col cols="10" sm="10" class="mx-5 mb-2 d-flex align-center">
				<h3 class="grey--text text--darken-2 mr-auto">{{$t("message.exploreProject")}}</h3>
				<v-btn icon link :to="{ name: 'Project' }">
					<i class="bx bx-home-circle icon-size-md"></i>
				</v-btn>
			</v-col>
		</v-row>

		<div class="px-xs-4 px-sm-8 px-md-15 py-0">
			<v-row justify="center">
				<v-col cols="12" xs="12">
					<v-row>
						<div class="d-flex">
							<v-btn
								small
								class="elevation-0 mx-1 indigo white--text link"
								:to="{ name: 'Project' }"
							>Projects</v-btn>
						</div>
						<v-col cols="12" xs="12">
							<v-row justify="center">
								<v-col cols="10" sm="8" md="6">
									<v-text-field
										v-model="search"
										cache-items
										prepend-inner-icon="mdi-magnify"
										class="auto-complete mt-4 search"
										flat
										hide-no-data
										label="Search Projects..."
										:autocomplete="false"
									></v-text-field>
								</v-col>
							</v-row>
							<v-row>
								<v-col v-if="isLoading" cols="12" xs="12" class="d-flex align-center justify-center mt-10">
									<v-progress-circular :size="60" :width="5" color="purple" indeterminate></v-progress-circular>
								</v-col>
								<v-col
									cols="12"
									xs="12"
									sm="6"
									md="4"
									v-for="project in filteredProjects"
									:key="project._id"
								>
									<v-card
										outlined
										class="project-card rounded-lg pa-2 py-5 my-1 overflow-hidden"
										min-height="180"
										max-height="180"
									>
										<small
											class="project-date grey--text text--darken-1 ma-0"
										>{{project&&project.data.slice(0,10)}}</small>
										<h4
											class="ml-4 bolded project-link"
											@click="seeDetail(project._id)"
										>{{project&&project.title}}</h4>
										<v-card-subtitle
											class="project-summary"
										>{{project&&project.summary.split(' ').slice(0,6).join(' ')+'...'}}</v-card-subtitle>
										<div class="project-star d-flex align-center justify-center">
											<div>
												<v-icon color="info" @click="updatestar++">mdi-star-outline</v-icon>
												<small>{{updatestar}}</small>
											</div>
										</div>
									</v-card>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</div>
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
			"explorableProjects",
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
	explorableProjects!: [any];
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
	updatestar!: any;

	mounted() {
		this.getAllProjects();
		this.getUserProjects(this.userInfo.id);
		this.getJoinedProjects();
	}

	seeDetail(id: string) {
		this.$router.push({ name: "ProjectExploreDetail", params: { id } });
	}

	set filteredProjects(val: any) {
		this.explorableProjects = val;
	}
	get filteredProjects() {
		const p = this.explorableProjects.filter((project: any) => {
			return project.title.toLowerCase().match(this.search);
		});
		return p;
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
.project-link
	color #349
	cursor pointer
</style>