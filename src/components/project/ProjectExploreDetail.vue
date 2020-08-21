<template>
	<div>
		<v-row no-gutters>
			<v-col cols="12" xs="12">
				<v-parallax
					dark
					height="300"
					src="https://image.freepik.com/free-vector/people-using-digital-devices-modern-office_1262-19462.jpg"
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

							<v-spacer></v-spacer>

							<v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-btn v-bind="attrs" v-on="on" icon @click="sendJoinRequest()" :disabled="jreqbtn">
										<v-icon>mdi-send-circle-outline</v-icon>
									</v-btn>
								</template>
								<span>{{$t("message.sendjoinrequest")}} {{jreqbtn}}</span>
							</v-tooltip>
						</v-toolbar>

						<v-divider></v-divider>

						<v-card-text class="pa-5">
							<v-row justify="space-between">
								<v-col cols="12" xs="12" sm="12">
									<v-card outlined class="mx-auto" max-width="700">
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
													<v-list-item-title>{{$t("message.projectChat")}}Project Chat</v-list-item-title>
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
		...mapActions("project", [
			"getSingleProject",
			"sendInvitationEmail",
			"applyJoin"
		])
	}
})
export default class ProjectDetail extends Vue {
	@Prop({ type: String, required: true })
	id!: string;
	userInfo!: any;
	project!: any;
	getSingleProject!: Function;
	applyJoin!: Function;
	jreqbtn = false;

	dialogm1 = "";
	dialog = false;

	created() {
		this.getSingleProject(this.id);
	}

	sendJoinRequest() {
		this.applyJoin(this.id)
			.then(() => {
				this.$vs.notification({
					icon: "<i class='bx bx-mail-send'></i>",
					color: "success",
					position: "top-right",
					title: "Email sent",
					text: `Join request send successfully`
				});
				this.jreqbtn = true;
			})
			.catch((err: any) => {
				console.log(err);
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
		background linear-gradient(to bottom, rgba(0,0,0,0.4),rgba(0,0,0,0.85))
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
