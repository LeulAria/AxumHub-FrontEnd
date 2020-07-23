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
					<v-card :key="i" outlined class="pa-5">
						<v-subheader>Experiance</v-subheader>
						<template v-for="(exp, i) in experiance">
							<div :key="i">{{exp}}</div>
						</template>
						<v-subheader v-if="experiance.length==0">No experiance profile found...</v-subheader>
					</v-card>
				</v-col>
				<v-col cols="6" sm="12" md="6">
					<v-card :key="i" outlined class="pa-5">
						<v-subheader>Education</v-subheader>
						<template v-for="(exp, i) in education">
							<div :key="i">{{exp}}</div>
						</template>
						<v-subheader v-if="experiance.length==0">No education profile found...</v-subheader>
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
								<v-list-item-group v-model="item" color="primary">
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
						<v-subheader class="error--text">Danger zone</v-subheader>

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
		...mapGetters("profile", ["getUserProfile"])
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

	dialog = false;
	notifications = false;
	sound = true;
	widgets = false;
}
</script>

<style lang="stylus" scoped>
.social-links
	margin-top: -15px !important
</style>
