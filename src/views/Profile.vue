<template>
	<v-main>
		<v-row no-gutters>
			<v-col cols="12" xs="12">
				<v-parallax
					dark
					height="300"
					src="https://i.imgur.com/kS2WW8e.png"
					class="parallex-overlay fill-height repeating-gradient"
				>
					<v-row align="center" justify="center" class="content-parallex">
						<v-col class="text-center content-parallex" cols="12">
							<h1 class="display-1 font-weight-bold mb-4"></h1>
							<h4 class="subheading"></h4>
						</v-col>
					</v-row>
					<div class="overlay"></div>
					<v-btn
						fab
						dark
						color="pink darken3"
						class="action-btn"
						bottom
						left
						absolute
						@click="dialog = !dialog"
					>
						<v-icon>mdi-plus</v-icon>
					</v-btn>
				</v-parallax>
				<div class="d-flex justify-center user-avatar">
					<v-hover>
						<template v-slot:default="{ hover }">
							<v-avatar rounded="true" color="pink" class="avatar" size="200">
								<v-img :src="userInfo.avatar"></v-img>

								<v-fade-transition>
									<v-overlay v-if="hover" absolute color="#036358">
										<v-btn dark fab @click="profileEditDialog = true">
											<i class="bx bx-edit-alt icon-size-md"></i>
										</v-btn>
									</v-overlay>
								</v-fade-transition>
							</v-avatar>
						</template>
					</v-hover>

					<v-dialog v-model="profileEditDialog" persistent max-width="350">
						<v-card class="pa-5">
							<v-card-title class="h1">Change your avatar.</v-card-title>
							<form id="profile-pic">
								<v-file-input
									accept="image/jpg, image/png, image/jpeg, image/gif"
									multiple
									name="avatar"
									label="File input"
								></v-file-input>
							</form>

							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="green darken-1" text @click="profileEditDialog = false">Disagree</v-btn>
								<v-btn color="green darken-1" text @click="uploadProfileAvatar()">Agree</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</div>
			</v-col>
		</v-row>
		<v-row no-gutters>
			<v-col cols="12" xs="12" class="d-flex justify-center align-center flex-column">
				<h1>{{userInfo&&userInfo.name}}</h1>
				<p class="grey--text">{{userInfo&&userInfo.email}}</p>
			</v-col>
		</v-row>

		<v-row no-gutters class="my-2 mb-1">
			<v-col cols="10" sm="10" class="mx-5 mb-2 d-flex align-center">
				<h3 class="grey--text text--darken-2 mr-auto">{{$t("message.profileDetail")}}</h3>
				<div class="d-flex justify-lg-space-between justify-sm-center">
					<v-btn
						small
						depressed
						color="primary ma-2"
						:to="{ name: 'ProfileInfo' }"
						link
					>{{$t("message.editProfileInfos")}}</v-btn>
					<v-btn
						small
						depressed
						color="primary ma-2"
						:to="{ name: 'ProfileExperiance' }"
						link
					>{{$t("message.addExperianceField")}}</v-btn>
					<v-btn
						small
						depressed
						color="primary ma-2"
						:to="{ name: 'ProfileEducation' }"
						link
					>{{$t("message.addEducationField")}}</v-btn>
				</div>
			</v-col>
		</v-row>

		<v-row justify="center" class="mt-6">
			<v-col cols="12" sm="6" md="4">
				<div class="d-flex justify-center"></div>
				<v-row align="center" justify="center">
					<v-col class="d-flex flex-column align-center" col="12" sm="12">
						<h2>{{userInfo&&userInfo.name}}</h2>
						<span class="grey--text h5">({{userProfile&&userProfile.handle}})</span>
						<p class="grey--text">{{userProfile&&userProfile.location}}</p>
					</v-col>
					<v-col class="social-links d-flex flex-column align-center" col="12" sm="5">
						<div class="d-flex">
							<template v-for="(link, i) in socialLinksDispaly">
								<div :key="i">
									<v-btn class="mx-4" fab small :to="link.link" link>
										<v-icon>{{link.icon}}</v-icon>
									</v-btn>
								</div>
							</template>
						</div>
						<v-subheader
							class="center text-center"
						>{{userProfile&&userProfile.bio || 'no profile detail!'}}</v-subheader>
					</v-col>
				</v-row>
			</v-col>

			<v-col cols="12" xs="12" sm="6" md="4">
				<v-card outlined class="pa-5">
					<v-subheader>{{$t("message.bio")}}</v-subheader>
					<p class="ml-4">{{ userProfile&&(userProfile.bio||'No user bio found...') }}</p>
					<v-subheader>{{$t("message.githubusername")}}</v-subheader>
					<div class="d-flex align-baseline ml-4">
						<v-icon class="mr-3">mdi-github</v-icon>
						<p>{{userProfile&&(userProfile.githubusername||'Git hub user name has\'t been set')}}</p>
					</div>
				</v-card>
			</v-col>
		</v-row>

		<v-container>
			<v-row>
				<v-col cols="12" xs="12" sm="6">
					<v-card outlined class="pa-4 elevation-0">
						<v-subheader>{{$t("message.experiance")}}</v-subheader>
						<template v-for="(exp, i) in experiance">
							<v-card :key="i" class="card_field ma-5 pa-4 elevation-0">
								<div class="mb-2">
									<h4>{{$t("message.jobTitle")}}:</h4>
									<span class="darken-3">{{exp.title}}</span>
								</div>
								<div class="mb-2">
									<h4>{{$t("message.compay")}}:</h4>
									<span class="darken-3">{{exp.company}}</span>
								</div>
								<div class="mb-2">
									<h4>{{$t("message.fromTo")}}:</h4>
									<span
										class="darken-3"
									>{{exp.from&&exp.from.slice(0,10)}} ~ {{exp.to?exp.to.slice(0,10):new Date().toISOString().slice(0,10)}}</span>
								</div>
								<div class="mb-2">
									<h4>{{$t("message.description")}}:</h4>
									<span class="darken-3">{{exp.description}}</span>
								</div>
								<div class="d-flex delete_btn" flat>
									<v-btn
										color="error"
										:loading="loadingExpDel"
										:disabled="loadingExpDel"
										class="ml-auto elevation-0"
										@click="deleteExperianceField(exp._id)"
									>
										{{$t("message.delete")}}
										<v-icon right dark>mdi-delete-outline</v-icon>
									</v-btn>
								</div>
								<v-divider class="my-3"></v-divider>
							</v-card>
						</template>
						<v-subheader
							v-if="experiance&&experiance.length==0"
						>{{$t("message.noexperianceprofilefound")}}...</v-subheader>
						<div class="d-flex justify-center">
							<v-btn color="primary" link :to="{ name: 'ProfileExperiance' }" class="elevation-0">
								{{$t("message.addProfileExperiance")}}
								<v-icon right dark>mdi-book-plus-multiple-outline</v-icon>
							</v-btn>
						</div>
					</v-card>
				</v-col>
				<v-col cols="12" xs="12" sm="6">
					<v-card outlined class="pa-5">
						<v-subheader>{{$t("message.education")}}</v-subheader>
						<template v-for="(edu, i) in education">
							<v-card :key="i" class="card_field ma-5 pa-4 elevation-0">
								<div class="mb-2">
									<h4>{{$t("message.school")}}:</h4>
									<span class="darken-3">{{edu.school}}</span>
								</div>
								<div class="mb-2">
									<h4>{{$t("message.degree")}}:</h4>
									<span class="darken-3">{{edu.degree}}</span>
								</div>
								<div class="mb-2">
									<h4>{{$t("message.fromTo")}}:</h4>
									<span
										class="darken-3"
									>{{edu.from&&edu.from.slice(0,10)}} ~ {{edu.to?edu.to.slice(0,10):new Date().toISOString().slice(0,10)}}</span>
								</div>
								<div class="mb-2">
									<h4>{{$t("message.description")}}</h4>
									<span class="darken-3">{{edu.description}}</span>
								</div>
								<div class="d-flex delete_btn" flat>
									<v-btn
										color="error"
										:loading="loadingEduDel"
										:disabled="loadingEduDel"
										class="ml-auto elevation-0"
										@click="deleteEducationField(edu._id)"
									>
										{{$t("message.delete")}}
										<v-icon right dark>mdi-delete-outline</v-icon>
									</v-btn>
								</div>
								<v-divider class="my-3"></v-divider>
							</v-card>
						</template>
						<v-subheader v-if="education&&education.length==0">No education profile found...</v-subheader>
						<div class="d-flex justify-center">
							<v-btn color="primary" link :to="{ name: 'ProfileEducation' }" class="elevation-0">
								{{$t("message.addProfileEducation")}}
								<v-icon right dark>mdi-book-plus-multiple-outline</v-icon>
							</v-btn>
						</div>
					</v-card>
				</v-col>
			</v-row>
		</v-container>

		<v-container>
			<v-row>
				<v-col cols="12" xs="12" sm="6">
					<v-card outlined class="rounded-lg">
						<v-subheader>{{$t("message.skills")}}</v-subheader>
						<v-card class="mx-auto my-3 elevation-0" max-width="300" tile>
							<v-list dense>
								<v-list-item-group color="primary">
									<v-list-item v-for="(skill, i) in skills" :key="i">
										<v-list-item-icon>
											<v-icon>mdi-format-quote-close-outline</v-icon>
										</v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title v-text="skill"></v-list-item-title>
										</v-list-item-content>
									</v-list-item>
								</v-list-item-group>
							</v-list>
						</v-card>
					</v-card>
				</v-col>
			</v-row>
		</v-container>

		<v-divider class="my-5" inset></v-divider>

		<v-container>
			<v-row justify="center">
				<v-col cols="12" xs="12" sm="8">
					<v-card outlined class="pa-5">
						<h3 class="error--text mb-4">{{$t("message.dangerzone")}}</h3>
						<v-btn color="error" class="elevation-0">{{$t("message.deleteAccount")}}</v-btn>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";

@Component({
	computed: {
		...mapGetters("users", ["userInfo"]),
		...mapGetters("profile", [
			"userProfile",
			"socialLinks",
			"skills",
			"experiance",
			"education"
		])
	},
	methods: {
		...mapActions("users", ["uploadAvatar"]),
		...mapActions("profile", [
			"getUserProfile",
			"deleteExperiance",
			"deleteEducation"
		])
	}
})
export default class Profile extends Vue {
	userInfo!: any;
	userProfile!: any;
	socialLinks!: any;
	skills!: any;
	experiance!: any;
	education!: any;
	profileEditDialog = false;
	getUserProfile!: Function;
	deleteExperiance!: Function;
	deleteEducation!: Function;
	uploadAvatar!: Function;

	loadingExpDel = false;
	loadingEduDel = false;

	created() {
		console.log("fetch users profile data please please!!!");
		console.log("thisi s the user id: ", this.userInfo.id, this.userInfo);
		this.getUserProfile(this.userInfo.id);
	}

	uploadProfileAvatar() {
		const form = document.getElementById("profile-pic") as HTMLFormElement;
		const formData = new FormData(form);
		this.uploadAvatar(formData);
		this.getUserProfile(this.userInfo.id);
		this.profileEditDialog = false;
	}

	get socialLinksDispaly() {
		const links = [];
		if (this.socialLinks) {
			const {
				youtube,
				facebook,
				twitter,
				linkedin,
				instagram
			} = this.socialLinks;
			if (youtube) links.push({ link: youtube, icon: "mdi-youtube" });
			if (facebook) links.push({ link: youtube, icon: "mdi-facebook" });
			if (twitter) links.push({ link: youtube, icon: "mdi-twitter" });
			if (linkedin) links.push({ link: youtube, icon: "mdi-linkedin" });
			if (instagram) links.push({ link: youtube, icon: "mdi-instagram" });
			return links;
		}
		return [];
	}

	deleteExperianceField(id: string) {
		this.loadingExpDel = true;
		this.deleteExperiance(id)
			.then(() => {
				this.$store.dispatch(
					"snackbar",
					"Experiance Field Delete Successfully"
				);
				this.loadingExpDel = false;
			})
			.catch((err: any) => {
				this.loadingExpDel = false;
				console.log(err);
			});
	}

	deleteEducationField(id: string) {
		this.loadingEduDel = true;
		this.deleteEducation(id)
			.then(() => {
				this.$store.dispatch("snackbar", "Education Field Delete Successfully");
				this.loadingEduDel = false;
			})
			.catch((err: any) => {
				this.loadingEduDel = false;
				console.log(err);
			});
	}
}
</script>

<style lang="stylus" scoped>
.social-links
	margin-top: -15px !important
.card-field
	position relative
.delete_btn
	position absolute
	top 40px
	right 10px


.parallex-overlay
	width 100%
	position relative
	background-position center right
.overlay
		content ''
		background linear-gradient(to bottom, rgba(0,0,0,0.1),rgba(0,0,0,0.55))
		width 100%
		height 100%
		position absolute
		top 0
		left 0
		z-index 3
.user-avatar
	margin-top -4em
	.avatar
		// border 8px solid #121212 !important
		box-shadow 0px 1px 15px rgba(0,0,0,0.5)
.action-btn
	position absolute
	top 200px
	left 50px
</style>
