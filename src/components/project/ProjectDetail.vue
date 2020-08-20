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
							<h1 class="display-1 font-weight-bold mb-4">{{project.title}}</h1>
							<h4 class="subheading">{{project.summary}}</h4>
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
							<v-toolbar-title>{{project.title}}</v-toolbar-title>

							<v-spacer></v-spacer>

							<v-btn icon>
								<i class="bx bx-video icon-size-md"></i>
							</v-btn>

							<v-btn icon>
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
									<p class="grey--text text--darken-2">admins and memebers</p>

									<v-card outlined class="rounded-lg">
										<v-card-title>
											Admins
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
											itemsPerPage="5"
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
											Members
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
											itemsPerPage="5"
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
											<v-toolbar-title>Project Info</v-toolbar-title>
										</v-toolbar>

										<v-list subheader three-line>
											<v-subheader>Details</v-subheader>

											<v-list-item>
												<v-list-item-content>
													<v-list-item-title>Project Title</v-list-item-title>
													<v-list-item-subtitle>{{project.title}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>

											<v-list-item>
												<v-list-item-content>
													<v-list-item-title>Project Summary</v-list-item-title>
													<v-list-item-subtitle>{{project.summary}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>

											<v-list-item>
												<v-list-item-content>
													<v-list-item-title>Project License</v-list-item-title>
													<v-list-item-subtitle>
														<b>{{project.developmentmodel}}</b>
													</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>

											<v-list-item>
												<v-list-item-content>
													<v-list-item-title>Project Chat</v-list-item-title>
													<v-list-item-subtitle>{{project.chatgroupname}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>

											<v-list-item>
												<v-list-item-content>
													<v-list-item-title>Stars</v-list-item-title>
													<v-list-item-subtitle>{{project.stars}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item v-if="project.website">
												<v-list-item-content>
													<v-list-item-title>Project Website</v-list-item-title>
													<v-list-item-subtitle>{{project.website}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item v-if="project.githubrepolink">
												<v-list-item-content>
													<v-list-item-title>Github Repolink</v-list-item-title>
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

		<v-row>
			<v-col cols="12" class="d-flex mt-5">
				<div class="ml-auto d-flex">
					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-btn icon link :to="{ name: 'TaskList' }" class="mr-5" v-bind="attrs" v-on="on">
								<i class="bx bx-list-check icon-size-md"></i>
							</v-btn>
						</template>
						<span>See Project Task</span>
					</v-tooltip>

					<v-row justify="center">
						<v-dialog v-model="dialog" scrollable max-width="600px">
							<template v-slot:activator="{ on, attrs }">
								<v-btn icon class="mr-5" v-bind="attrs" v-on="on">
									<i class="bx bx-user-plus icon-size-md"></i>
								</v-btn>
							</template>
							<v-card class="pa-5">
								<p>Send invitation using email adress type in the input the email.</p>
								<v-text-field class="mx-4" v-model="email" placeholder="Email..."></v-text-field>
								<p class="mt-5">Or Send email invitation to</p>
								<v-divider></v-divider>
								<v-card-text style="height: 400px;">
									<v-checkbox-group v-model="dialogm1" column>
										<v-checkbox label="Bahamas, The" value="bahamas"></v-checkbox>
										<v-checkbox label="Bangladesh" value="bangladesh"></v-checkbox>
									</v-checkbox-group>
								</v-card-text>
								<v-divider></v-divider>
								<v-card-actions>
									<v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
									<v-btn color="blue darken-1" text @click="sendEmail()">Send</v-btn>
								</v-card-actions>
							</v-card>
						</v-dialog>
					</v-row>
				</div>
			</v-col>
		</v-row>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";

@Component({
	computed: {
		...mapGetters("user", ["userInfo"]),
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
	email!: string;

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
		console.log("send this: ", {
			projectname: this.project.name,
			destination: this.email,
			sender: this.userInfo
		});
		alert("send invitation email..." + this.email);
		this.sendInvitationEmail({
			projectname: this.project.name,
			destination: this.email,
			sender: this.userInfo.email
		});
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
