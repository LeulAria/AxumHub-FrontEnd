<template>
	<v-main>
		<v-row no-gutters class="my-2 mb-1">
			<v-col cols="10" sm="10" class="mx-5 mb-2 d-flex align-center">
				<h3 class="grey--text text--darken-2 mr-auto">Profile Detail</h3>
				<v-menu transition="scroll-y-reverse-transition" class="ml-auto">
					<template v-slot:activator="{ on, attrs }">
						<v-btn color="primary" class="ma-2 elevation-0" fab small v-bind="attrs" v-on="on">
							<v-icon>mdi-pencil-plus-outline</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item :to="{ name: 'ProfileInfo' }" link>
							<v-list-item-title>Edit Profile Infos</v-list-item-title>
						</v-list-item>
						<v-list-item :to="{ name: 'ProfileExperiance' }" link>
							<v-list-item-title>Add Experiance Field</v-list-item-title>
						</v-list-item>
						<v-list-item :to="{ name: 'ProfileEducation' }" link>
							<v-list-item-title>Add Education Field</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-col>
		</v-row>

		<v-row justify="center" class="mt-6">
			<v-col cols="12" xs="12">
				<div class="d-flex justify-center">
					<v-avatar rounded="true" color="indigo" size="200" class>
						<v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
					</v-avatar>
				</div>
				<v-row align="center" justify="center">
					<v-col class="d-flex flex-column align-center" col="12" sm="12">
						<h2>{{userInfo&&userInfo.name}}</h2>
						<span class="grey--text h5">({{userProfile&&userProfile.handle}})</span>
						<p class="grey--text">{{userInfo&&userInfo.email}}</p>
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
						<v-subheader class="center text-center">{{userProfile.bio || 'no profile detail!'}}</v-subheader>
					</v-col>
				</v-row>
			</v-col>
		</v-row>

		<v-container>
			<v-row>
				<v-col cols="6" sm="12" md="6">
					<v-card outlined class="pa-4 elevation-0">
						<v-subheader>Experiance</v-subheader>
						<template v-for="(exp, i) in experiance">
							<v-card :key="i" class="card_field ma-5 pa-4 elevation-0">
								<div class="mb-2">
									<h4>JobTitle:</h4>
									<span class="darken-3">{{exp.title}}</span>
								</div>
								<div class="mb-2">
									<h4>Compay:</h4>
									<span class="darken-3">{{exp.company}}</span>
								</div>
								<div class="mb-2">
									<h4>From-To:</h4>
									<span class="darken-3">{{exp.from.slice(0,10)}} ~ {{exp.to.slice(0,10)}}</span>
								</div>
								<div class="mb-2">
									<h4>Description:</h4>
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
										Delete
										<v-icon right dark>mdi-delete-outline</v-icon>
									</v-btn>
								</div>
								<v-divider class="my-3"></v-divider>
							</v-card>
						</template>
						<v-subheader v-if="experiance&&experiance.length==0">No experiance profile found...</v-subheader>
						<div class="d-flex justify-center">
							<v-btn color="primary" link :to="{ name: 'ProfileExperiance' }" class="elevation-0">
								Add Profile Experiance
								<v-icon right dark>mdi-book-plus-multiple-outline</v-icon>
							</v-btn>
						</div>
					</v-card>
				</v-col>
				<v-col cols="6" sm="12" md="6">
					<v-card outlined class="pa-5">
						<v-subheader>Education</v-subheader>
						<template v-for="(edu, i) in education">
							<v-card :key="i" class="card_field ma-5 pa-4 elevation-0">
								<div class="mb-2">
									<h4>School:</h4>
									<span class="darken-3">{{edu.school}}</span>
								</div>
								<div class="mb-2">
									<h4>Degree:</h4>
									<span class="darken-3">{{edu.degree}}</span>
								</div>
								<div class="mb-2">
									<h4>From-To:</h4>
									<span class="darken-3">{{edu.from.slice(0,10)}} ~ {{edu.to.slice(0,10)}}</span>
								</div>
								<div class="mb-2">
									<h4>Description:</h4>
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
										Delete
										<v-icon right dark>mdi-delete-outline</v-icon>
									</v-btn>
								</div>
								<v-divider class="my-3"></v-divider>
							</v-card>
						</template>
						<v-subheader v-if="experiance.length==0">No education profile found...</v-subheader>
						<div class="d-flex justify-center">
							<v-btn color="primary" link :to="{ name: 'ProfileEducation' }" class="elevation-0">
								Add Profile Education
								<v-icon right dark>mdi-book-plus-multiple-outline</v-icon>
							</v-btn>
						</div>
					</v-card>
				</v-col>
			</v-row>
		</v-container>

		<v-container>
			<v-row>
				<v-col cols="6" sm="12" md="6">
					<v-card outlined class="pa-5">
						<v-subheader>Bio</v-subheader>
						<p class="ml-4">{{ userProfile&&(userProfile.bio||'No user bio found...') }}</p>
						<v-subheader>Github user name</v-subheader>
						<div class="d-flex align-baseline ml-4">
							<v-icon class="mr-3">mdi-github</v-icon>
							<p>{{userProfile&&(userProfile.githubusername||'Git hub user name has\'t been set')}}</p>
						</div>
					</v-card>
				</v-col>
				<v-col cols="6" sm="12" md="6">
					<v-card outlined class="rounded-lg">
						<v-subheader>Skills</v-subheader>
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
				<v-col cols="6" sm="12" md="8">
					<v-card outlined class="pa-5">
						<h3 class="error--text mb-4">Danger zone</h3>
						<v-btn color="error" class="elevation-0">Delete Account</v-btn>
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
	getUserProfile!: any;
	deleteExperiance!: any;
	deleteEducation!: any;

	loadingExpDel = false;
	loadingEduDel = false;

	created() {
		if (!Object.keys(this.userProfile).length) this.getUserProfile();
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
</style>
