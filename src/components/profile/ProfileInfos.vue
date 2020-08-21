<template>
	<v-container>
		<v-row justify="center" class="mt-10">
			<v-col cols="12" sm="12">
				<h2 class="form-header text-center">{{$t("message.setupYourProfile")}}</h2>
				<v-card elevation="0" class="pa-6 rounded-lg">
					<ValidationObserver ref="singupObserver">
						<form>
							<v-row justify="center">
								<v-col cols="12" xs="12" sm="6" md="6">
									<v-card class="pa-8 elevation-0">
										<v-subheader class="mb-5">{{$t("message.basicInformations")}}:</v-subheader>
										<ValidationProvider v-slot="{ errors }" name="username" rules="required|min:2|max:40">
											<v-text-field
												v-model="handle"
												prepend-icon="mdi-account-key-outline"
												:counter="40"
												:error-messages="errors"
												label="*Username"
												required
												hint="username is the name used for the application you can use nickname, yourname... dont use spaces!"
											></v-text-field>
										</ValidationProvider>

										<ValidationProvider v-slot="{ errors }" name="status" rules="required|min:2">
											<v-combobox
												v-model="status"
												:items="status_fields"
												prepend-icon="mdi-briefcase-account-outline"
												label="*Profession or Status"
												:error-messages="errors"
												hint="current status of work, education..."
												chips
											></v-combobox>
										</ValidationProvider>

										<ValidationProvider v-slot="{ errors }" name="skills" rules="required|min:2">
											<v-text-field
												v-model="skills"
												:error-messages="errors"
												prepend-icon="mdi-basketball"
												label="*Skills"
												hint="a comma separated list of skills eg: skill1, skill2, skill3"
												required
											></v-text-field>
										</ValidationProvider>

										<ValidationProvider v-slot="{ errors }" name="githubusername" rules="min:2">
											<v-text-field
												v-model="githubusername"
												:error-messages="errors"
												prepend-icon="mdi-github"
												label="Github Username"
												required
												hint="a github username (OPTIONAL)"
											></v-text-field>
										</ValidationProvider>

										<ValidationProvider v-slot="{ errors }" name="company" rules="min:2">
											<v-text-field
												v-model="company"
												:error-messages="errors"
												prepend-icon="mdi-home-city-outline"
												label="Company Name"
												required
												hint="a company you are running (OPTIONAL)"
											></v-text-field>
										</ValidationProvider>

										<ValidationProvider v-slot="{ errors }" name="website" rules="min:10">
											<v-text-field
												v-model="website"
												:error-messages="errors"
												prepend-icon="mdi-web"
												label="Website"
												required
												hint="a portfolio or company website valid url (OPTIONAL)"
											></v-text-field>
										</ValidationProvider>

										<ValidationProvider v-slot="{ errors }" name="website" rules="min:10">
											<v-text-field
												v-model="location"
												:error-messages="errors"
												prepend-icon="mdi-map-marker-outline"
												label="Location"
												required
												hint="eg: city, country  comma separated city first then country (OPTIONAL)"
											></v-text-field>
										</ValidationProvider>

										<ValidationProvider v-slot="{ errors }" name="bio" rules="min:5">
											<v-text-field
												v-model="bio"
												counter="200"
												:error-messages="errors"
												prepend-icon="mdi-account-details-outline"
												label="Bio"
												required
												hint="a summurized biograpy (OPTIONAL)"
											></v-text-field>
										</ValidationProvider>
									</v-card>
								</v-col>

								<v-col cols="12" xs="12" sm="6" md="6">
									<v-card class="pa-8 elevation-0">
										<v-subheader class="mb-5">{{$t("message.socialMediaLinks")}}:</v-subheader>
										<ValidationProvider v-slot="{ errors }" name="youtube" rules="min:5">
											<v-text-field
												v-model="youtube"
												:error-messages="errors"
												prepend-icon="mdi-youtube"
												label="Youtube"
												hint="Youtube social media (OPTIONAL)"
												required
											></v-text-field>
										</ValidationProvider>
										<ValidationProvider v-slot="{ errors }" name="facebook" rules="min:5">
											<v-text-field
												v-model="facebook"
												:error-messages="errors"
												prepend-icon="mdi-facebook"
												label="Facebook"
												hint="Facebook account link (OPTIONAL)"
												required
											></v-text-field>
										</ValidationProvider>
										<ValidationProvider v-slot="{ errors }" name="twitter" rules="min:5">
											<v-text-field
												v-model="twitter"
												:error-messages="errors"
												prepend-icon="mdi-twitter"
												label="Twitter"
												hint="Twitter account link (OPTIONAL)"
												required
											></v-text-field>
										</ValidationProvider>
										<ValidationProvider v-slot="{ errors }" name="linkedin" rules="min:5">
											<v-text-field
												v-model="linkedin"
												:error-messages="errors"
												prepend-icon="mdi-linkedin"
												label="Linkedin"
												hint="Linkedin account link (OPTIONAL)"
												required
											></v-text-field>
										</ValidationProvider>
										<ValidationProvider v-slot="{ errors }" name="instagram" rules="min:5">
											<v-text-field
												v-model="instagram"
												:error-messages="errors"
												prepend-icon="mdi-instagram"
												label="Instagram"
												hint="Instagram account link (OPTIONAL)"
												required
											></v-text-field>
										</ValidationProvider>
									</v-card>
								</v-col>
								<v-col cols="12" xs="12">
									<v-card-actions class="mt-4 ml-5">
										<v-btn
											:loading="loadingProfileInfo"
											:disabled="loadingProfileInfo"
											color="indigo"
											class="mr-4 white--text"
											small
											@click="submit"
										>
											<span v-show="!loadingProfileInfo">{{$t("message.submit")}}</span>
											<v-icon class="px-4" dark v-show="loadingProfileInfo">mdi-cloud-upload</v-icon>
										</v-btn>
										<v-btn depressed small @click="clear">{{$t("message.clear")}}</v-btn>
									</v-card-actions>
								</v-col>
							</v-row>
						</form>
					</ValidationObserver>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Signup extends Vue {
	handle = "";
	status = "";
	skills = "";
	githubusername = "";
	company = "";
	website = "";
	location = "";
	bio = "";
	youtube = "";
	facebook = "";
	twitter = "";
	linkedin = "";
	instagram = "";
	loadingProfileInfo = false;

	status_fields = [
		"Developer",
		"Junior Developer",
		"Seniour Developer",
		"Software Engineer",
		"Data Scintist",
		"Manager",
		"Designer",
		"Student or Learning",
		"Instructor or Teacher",
		"Intern",
		"UI/UX Designer",
		"System Analyst"
	];

	clear() {
		this.handle = "";
		this.status = "";
		this.skills = "";
		this.githubusername = "";
		this.company = "";
		this.website = "";
		this.location = "";
		this.bio = "";
		this.youtube = "";
		this.facebook = "";
		this.twitter = "";
		this.linkedin = "";
		this.instagram = "";
		(this.$refs.singupObserver as Vue & { reset: () => boolean }).reset();
	}

	submit() {
		this.loadingProfileInfo = true;
		(this.$refs.singupObserver as Vue & {
			validate: () => any;
		})
			.validate()
			.then((isValid: boolean) => {
				if (isValid) {
					const info = {
						handle: this.handle,
						status: this.status,
						skills: this.skills,
						githubusername: this.githubusername,
						company: this.company,
						website: this.website,
						location: this.location,
						bio: this.bio,
						youtube: this.youtube,
						facebook: this.facebook,
						twitter: this.twitter,
						linkedin: this.linkedin,
						instagram: this.instagram
					};

					console.log("to be send...", info);

					this.$store
						.dispatch("profile/setProfileInfo", info)
						.then(res => {
							console.log(res, "it has been sent...");
							this.loadingProfileInfo = false;
							this.$router.push({ name: "Profile" });
						})
						.catch(err => {
							setTimeout(() => (this.loadingProfileInfo = false), 2000);
							console.log(err);
						});
				} else {
					setTimeout(() => (this.loadingProfileInfo = false), 2000);
				}
			})
			.catch((error: any) => {
				setTimeout(() => (this.loadingProfileInfo = false), 2000);
				console.log(error);
			});
	}
}
</script>

<style lang="stylus" scoped>
</style>