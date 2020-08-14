<template>
	<v-container class="mt-8">
		<v-row no-gutters class="my-2 mb-1">
			<v-col cols="10" sm="10" class="mx-5 mb-2 d-flex align-center">
				<h3 class="grey--text text--darken-2 mr-auto">Create New Project</h3>
			</v-col>
		</v-row>
		<v-divider class="mb-2"></v-divider>
		<v-row justify="center" class="question_form_container">
			<v-col cols="12" sm="10" md="8">
				<h3 class="grey--text mb-4 text--darken-2 form-header">Project Informations...</h3>
				<v-card elevation="0" class="pa-6 rounded-lg">
					<ValidationObserver ref="newProjectObserver">
						<form>
							<ValidationProvider v-slot="{ errors }" name="title" rules="required|min:3|max:30">
								<v-text-field
									v-model="title"
									prepend-icon="mdi-pencil-circle-outline"
									:counter="30"
									:error-messages="errors"
									label="Titel"
									required
									hint="Short Title of the Project"
								></v-text-field>
							</ValidationProvider>

							<ValidationProvider v-slot="{ errors }" name="version" rules="required|min:3|max:30">
								<v-text-field
									v-model="version"
									prepend-icon="mdi-progress-check"
									:counter="30"
									:error-messages="errors"
									label="Version"
									required
									hint="Version of the application version sould be in the form eg: 1.0.0  'major.minor.patch'"
								></v-text-field>
							</ValidationProvider>

							<ValidationProvider v-slot="{ errors }" name="summary" rules="required">
								<v-text-field
									v-model="summary"
									:error-messages="errors"
									prepend-icon="mdi-subtitles-outline"
									label="Summary"
									counter="255"
									required
									hint="A brife summary of the proejct"
								></v-text-field>
							</ValidationProvider>

							<ValidationProvider v-slot="{ errors }" name="license" rules="required">
								<v-combobox
									v-model="license"
									:items="license_items"
									prepend-icon="mdi-license"
									label="Project License"
									:error-messages="errors"
									hint="poject license.."
									chips
								></v-combobox>
							</ValidationProvider>

							<ValidationProvider v-slot="{ errors }" name="developmentmodel">
								<v-combobox
									v-model="developmentmodel"
									:items="developmentmodel_items"
									prepend-icon="mdi-lightbulb-group"
									label="Developmet Model"
									:error-messages="errors"
									hint="(Optional) Development model for the project"
									chips
								></v-combobox>
							</ValidationProvider>

							<ValidationProvider v-slot="{ errors }" name="tools" rules="required">
								<v-text-field
									v-model="tools"
									:error-messages="errors"
									prepend-icon="mdi-tools"
									label="Tools"
									required
									hint="Major Development Tools, Frameworks, Programming languages..."
								></v-text-field>
							</ValidationProvider>

							<v-subheader>Other optional infos</v-subheader>
							<v-divider inset></v-divider>
							<ValidationProvider v-slot="{ errors }" name="githubrepolink">
								<v-text-field
									v-model="githubrepolink"
									:error-messages="errors"
									prepend-icon="mdi-github"
									label="Github Repository Link"
									required
									hint="(Optional) github repository url link eg: https://github.com/testuser/project_name"
								></v-text-field>
							</ValidationProvider>

							<ValidationProvider v-slot="{ errors }" name="website">
								<v-text-field
									v-model="website"
									:error-messages="errors"
									prepend-icon="mdi-web"
									label="Website"
									required
									hint="(Optional) A deployed/deployable website link url"
								></v-text-field>
							</ValidationProvider>

							<v-subheader>Axuhhub chat and colaboration Group</v-subheader>
							<v-divider inset></v-divider>
							<ValidationProvider v-slot="{ errors }" rules="required" name="createchatgroup">
								<v-checkbox
									color="info"
									v-model="createchatgroup"
									:error-messages="errors"
									:value="1"
									label="Create Chat group for the project"
									type="checkbox"
									required
								></v-checkbox>
							</ValidationProvider>

							<ValidationProvider
								v-if="createchatgroup"
								v-slot="{ errors }"
								name="chatgroupname"
								rules="required"
							>
								<v-text-field
									v-model="chatgroupname"
									:error-messages="errors"
									prepend-icon="mdi-account-group"
									label="Chat Group Name"
									required
									hint="a simple name for the project group that doen't contain space and sparial characters like &*+$..."
								></v-text-field>
							</ValidationProvider>

							<v-card-actions class="mt-4">
								<v-btn
									:loading="loading"
									:disabled="loading"
									color="indigo"
									class="mr-4 white--text"
									small
									@click="submit"
								>
									<span v-show="!loading">Submit</span>
									<v-icon class="px-4" dark v-show="loading">mdi-cloud-upload</v-icon>
								</v-btn>
								<v-btn depressed small @click="clear">clear</v-btn>
							</v-card-actions>
						</form>
					</ValidationObserver>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions } from "vuex";

@Component({
	methods: {
		...mapActions("project", ["addNewProject"])
	}
})
export default class UserQuestionsPost extends Vue {
	title = "";
	version = "";
	summary = "";
	license = "";
	developmentmodel = "";
	githubrepolink = "";
	website = "";
	tools = "";
	createchatgroup = false;
	chatgroupname = "";
	tags = "";
	loading = false;

	addNewProject!: any;

	license_items = ["ET", "AXU", "EAXL", "MIT"];

	developmentmodel_items = [
		"Waterfall",
		"V-Modle",
		"Incremental Model",
		"Rad(Rapid Application Development) Model",
		"Rational Unified Process",
		"Agile Model",
		"Iterative Model",
		"Spartial Model",
		"Prototype Model",
		"LEAN Model",
		"Feature Driven Development",
		"SCRUM",
		"System Analyst"
	];

	clear() {
		this.title = "";
		this.version = "";
		this.summary = "";
		this.license = "";
		this.developmentmodel = "";
		this.githubrepolink = "";
		this.website = "";
		this.tools = "";
		this.createchatgroup = false;
		this.chatgroupname = "";
		this.tags = "";
		this.loading = false;
		(this.$refs.newProjectObserver as Vue & {
			reset: () => boolean;
		}).reset();
	}

	submit() {
		this.loading = true;
		(this.$refs.newProjectObserver as Vue & {
			validate: () => any;
		})
			.validate()
			.then((isValid: boolean) => {
				if (isValid) {
					const info: any = {
						title: this.title,
						version: this.version,
						summary: this.summary,
						licence: this.license,
						developmentmodel: this.developmentmodel,
						githubrepolink: this.githubrepolink,
						website: this.website,
						tools: this.tools,
						createchatgroup: this.createchatgroup,
						chatgroupname: this.chatgroupname
					};
					console.log("ok the input is valid now lets dispatch it", info);
					this.addNewProject(info)
						.then((res: any) => {
							console.log(res);
							this.loading = false;
							this.$router.push({ name: "Project" });
						})
						.catch((err: any) => {
							setTimeout(() => (this.loading = false), 2000);
							console.log(err);
						});
				} else {
					setTimeout(() => (this.loading = false), 2000);
				}
			})
			.catch((error: any) => {
				setTimeout(() => (this.loading = false), 2000);
				console.log(error);
			});
	}
}
</script>

<style lang="stylus" scoped>
.v-text-field
  font-family Montserrat
.question_form_container
	min-height 100vh !important
</style>