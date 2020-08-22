<template>
	<div>
		<v-row no-gutters>
			<v-col cols="12" xs="12">
				<v-parallax
					dark
					height="300"
					src="https://www.deque.com/wp-content/uploads/2019/04/A11y-in-agile-team-practices.png"
					class="parallex-overlay fill-height repeating-gradient"
				>
					<v-row align="center" justify="center" class="content-parallex">
						<v-col class="text-center content-parallex" cols="12">
							<h1 class="display-1 font-weight-bold mb-4">{{project && project.title}}</h1>
							<h4 class="subheading">{{project && project.summary}}</h4>
						</v-col>
					</v-row>
					<div class="overlay"></div>
				</v-parallax>
			</v-col>
		</v-row>

		<v-row class="project-detail-container">
			<v-col cols="12" xs="12">
				<v-card flat>
					<v-toolbar color="primary" dark extended flat></v-toolbar>

					<v-card class="mx-auto" max-width="900" style="margin-top: -64px;">
						<v-toolbar flat>
							<v-toolbar-title>{{project && project.title}}</v-toolbar-title>

							<v-dialog v-model="dialog" scrollable max-width="600px">
								<template v-slot:activator="{ on, attrs }">
									<v-btn fab small color="primary" depressed class="ml-5" v-bind="attrs" v-on="on">
										<i class="bx bx-user-plus icon-size-md"></i>
									</v-btn>
								</template>
								<v-card class="pa-5">
									<p>{{$t("message.ems")}}</p>

									<v-text-field class="mx-4" v-model="email" placeholder="Email..."></v-text-field>

									<v-card-actions>
										<v-btn color="blue darken-1" text @click="dialog = false">{{$t("message.close")}}</v-btn>
										<v-btn color="blue darken-1" text @click="sendEmail()">{{$t("message.send")}}</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>

							<v-spacer></v-spacer>

							<v-btn icon :to="{ name: 'Conference' }">
								<i class="bx bx-video icon-size-md"></i>
							</v-btn>

							<v-btn icon link :to="{ name: 'Chat', params: { id: project.title } }">
								<v-icon>mdi-chat-processing-outline</v-icon>
							</v-btn>

							<v-btn icon link :to="{ name: 'Uploads', params: { id: project._id } }">
								<v-icon>mdi-cloud-check-outline</v-icon>
							</v-btn>
						</v-toolbar>

						<v-divider></v-divider>

						<v-card-text class="pa-5">
							<v-row justify="space-between">
								<v-col cols="12" xs="12" sm="12" md="6">
									<p class="grey--text text--darken-2">{{$t("message.adminsandmemebers")}}</p>

									<v-card outlined class="rounded-lg">
										<v-card-title>
											{{$t("message.admins")}}
											<v-spacer></v-spacer>
											<v-text-field
												v-model="searchadmin"
												append-icon="mdi-magnify"
												label="Search"
												single-line
												hide-details
											></v-text-field>
										</v-card-title>
										<v-data-table
											dense
											:itemsPerPage="itemsPerPage"
											v-model="selectedadmin"
											:headers="headers"
											:items="project.admins"
											sort-by="name"
											:search="searchadmin"
											item-key="name"
											show-select
										></v-data-table>
									</v-card>

									<v-card outlined class="rounded-lg mt-5">
										<v-card-title>
											{{$t("message.admins")}}
											<v-spacer></v-spacer>
											<v-text-field
												v-model="searchcontrib"
												append-icon="mdi-magnify"
												label="Search"
												single-line
												hide-details
											></v-text-field>
										</v-card-title>
										<v-data-table
											dense
											:itemsPerPage="itemsPerPage"
											v-model="selectedcontrib"
											:headers="headers"
											:items="project.contributers"
											sort-by="name"
											:search="searchcontrib"
											item-key="name"
											show-select
										></v-data-table>
									</v-card>
								</v-col>

								<v-col cols="12" xs="12" sm="12" md="5">
									<v-card outlined class="mx-auto" max-width="400">
										<v-toolbar color="purple" dark>
											<v-toolbar-title>{{$t("message.projectInfo")}}</v-toolbar-title>
										</v-toolbar>

										<v-list subheader three-line>
											<v-subheader>{{$t("message.details")}}</v-subheader>

											<v-list-item>
												<v-list-item-content>
													<v-list-item-title>{{$t("message.projectTitle")}}</v-list-item-title>
													<v-list-item-subtitle>{{project.title}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>

											<v-list-item>
												<v-list-item-content>
													<v-list-item-title>{{$t("message.projectSummary")}}</v-list-item-title>
													<v-list-item-subtitle>{{project.summary}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>

											<v-list-item>
												<v-list-item-content>
													<v-list-item-title>{{$t("message.projectLicense")}}</v-list-item-title>
													<v-list-item-subtitle>
														<b>{{project.developmentmodel}}</b>
													</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>

											<v-list-item>
												<v-list-item-content>
													<v-list-item-title>{{$t("message.projectChat")}}</v-list-item-title>
													<v-list-item-subtitle>{{project.chatgroupname}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>

											<v-list-item>
												<v-list-item-content>
													<v-list-item-title>{{$t("message.stars")}}</v-list-item-title>
													<v-list-item-subtitle>{{project.stars}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item v-if="project.website">
												<v-list-item-content>
													<v-list-item-title>{{$t("message.projectWebsite")}}</v-list-item-title>
													<v-list-item-subtitle>{{project.website}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item v-if="project.githubrepolink">
												<v-list-item-content>
													<v-list-item-title>{{$t("message.githubRepolink")}}</v-list-item-title>
													<v-list-item-subtitle>{{project.githubrepolink}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
										</v-list>
									</v-card>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";

@Component({
	computed: {
		...mapGetters("users", ["userInfo"]),
		...mapGetters("project", ["project", "contributers", "loadingProject"])
	},
	methods: {
		...mapActions("project", ["getSingleProject", "sendInvitationEmail"])
	}
})
export default class ProjectDetail extends Vue {
	@Prop({ type: String, required: true })
	id!: string;
	userInfo!: any;
	project!: any;
	getSingleProject!: Function;
	sendInvitationEmail!: Function;
	loadingProject!: boolean;
	loadingproj!: any;
	contributers!: any;
	email = "";
	itemsPerPage = 5;

	dialogm1 = "";
	dialog = false;

	searchadmin = "";
	searchcontrib = "";
	selectedadmin = [];
	selectedcontrib = [];
	headers = [
		{
			text: "UserName",
			align: "start",
			filterable: true,
			value: "name"
		},
		{ text: "UserType", value: "name" },
		{ text: "Email", value: "email" }
	];

	created() {
		this.getSingleProject(this.id);
	}

	sendEmail() {
		this.$vs.notification({
			icon: "<i class='bx bx-mail-send'></i>",
			color: "success",
			position: "top-right",
			title: "Email sent",
			text: `Email sent successfully for ${this.email}`
		});

		this.dialog = false;
		this.sendInvitationEmail({
			projectname: this.project.title,
			destination: this.email,
			sender: this.userInfo.email
		});
		this.email = "";
	}
}
</script>

<style lang="stylus" scoped>
.parallex-overlay
	width 100%
	position relative
.overlay
		content ''
		background linear-gradient(to bottom, rgba(0,0,0,0.6),rgba(0,0,0,0.95))
		width 100%
		height 100%
		position absolute
		top 0
		left 0
		z-index 3
.content-parallex
	position relative
	z-index 4
.project-detail-container
	margin-top -1em
</style>
