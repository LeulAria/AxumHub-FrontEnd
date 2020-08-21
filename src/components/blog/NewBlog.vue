<template>
	<v-container class="mt-8 blog-container">
		<v-row no-gutters class="my-2 mb-1" justify="center">
			<v-col cols="10" sm="6" md="4" class="mx-5 mb-2 d-flex align-center">
				<h3 class="grey--text text--darken-2 mr-auto">{{$t("message.createNewPost")}}</h3>
			</v-col>
			<v-col cols="10" sm="6" md="7">
				<div class="ml-auto d-flex align-center justify-end justify-sm-center">
					<v-row align="center">
						<v-col cols="12" sm="12" md="6">
							<p class="mr-5 sm-col-12 text-sm-center">{{$t("message.chooseposttype")}}</p>
						</v-col>
						<v-col cols="12" sm="12" md="6">
							<v-radio-group v-model="postType" :mandatory="true" class="d-flex">
								<v-radio label="Article" value="article"></v-radio>
								<v-radio label="Blog" value="blog"></v-radio>
								<v-radio label="Job" value="job"></v-radio>
							</v-radio-group>
						</v-col>
					</v-row>
				</div>
			</v-col>
		</v-row>
		<v-divider class="mb-2"></v-divider>
		<v-row justify="center" class="question_form_container">
			<v-col cols="12" sm="10" md="5">
				<h3 class="form-header text-center mb-2">{{$t("message.createNew")}} {{postType}}</h3>
				<v-card elevation="0" class="pa-6 rounded-lg">
					<ValidationObserver ref="createQuestionObserver">
						<form id="blog-form" @submit.prevent="submit">
							<ValidationProvider
								v-slot="{ errors }"
								name="title"
								rules="required|min:3|max:30"
								v-if="postType!=='job'"
							>
								<v-text-field
									name="title"
									v-model="title"
									prepend-icon="mdi-pencil-circle-outline"
									:counter="30"
									:error-messages="errors"
									label="Title"
									required
									hint="Question title character between 3-30"
								></v-text-field>
							</ValidationProvider>

							<!-- Job post -->
							<ValidationProvider
								v-slot="{ errors }"
								name="jobtitle"
								rules="required|min:3|max:30"
								v-if="postType=='job'"
							>
								<v-text-field
									name="jobtitle"
									v-model="jobtitle"
									prepend-icon="mdi-pencil-circle-outline"
									:counter="30"
									:error-messages="errors"
									label="Job Title"
									required
									hint="The Job Position Title name"
								></v-text-field>
							</ValidationProvider>

							<ValidationProvider
								v-slot="{ errors }"
								name="company"
								rules="required|min:3|max:30"
								v-if="postType=='job'"
							>
								<v-text-field
									name="company"
									v-model="company"
									prepend-icon="mdi-office-building"
									:counter="30"
									:error-messages="errors"
									label="Company"
									required
									hint="The Compay name posting the job"
								></v-text-field>
							</ValidationProvider>

							<ValidationProvider
								v-slot="{ errors }"
								name="jobtype"
								rules="required|min:3|max:30"
								v-if="postType=='job'"
							>
								<v-text-field
									name="jobtype"
									v-model="jobtype"
									prepend-icon="mdi-account-details-outline"
									:counter="30"
									:error-messages="errors"
									label="Job Type"
									required
									hint="The Job Type eg: fulltime, contractual..."
								></v-text-field>
							</ValidationProvider>

							<ValidationProvider
								v-slot="{ errors }"
								name="phonenumber"
								rules="min:3|max:30|required"
								v-if="postType=='job'"
							>
								<v-text-field
									name="phonenumber"
									v-model="phonenumber"
									prepend-icon="mdi-phone"
									:counter="30"
									:error-messages="errors"
									label="Phone Number"
									required
									hint="Phone number of contact..."
								></v-text-field>
							</ValidationProvider>

							<ValidationProvider
								v-slot="{ errors }"
								name="email"
								rules="max:30|email|required"
								v-if="postType=='job'"
							>
								<v-text-field
									name="email"
									v-model="email"
									prepend-icon="mdi-email-edit-outline"
									:counter="30"
									:error-messages="errors"
									label="Email"
									required
									hint="Email of contact..."
								></v-text-field>
							</ValidationProvider>

							<ValidationProvider
								v-slot="{ errors }"
								name="adress"
								rules="required|min:2|max:30"
								v-if="postType=='job'"
							>
								<v-text-field
									name="adress"
									v-model="adress"
									prepend-icon="mdi-map-marker"
									:counter="30"
									:error-messages="errors"
									label="Job Place"
									required
									hint="Adress of the company Optional..."
								></v-text-field>
							</ValidationProvider>

							<ValidationProvider
								v-slot="{ errors }"
								name="description"
								rules="required"
								v-if="postType=='job'"
							>
								<v-textarea
									name="description"
									v-model="desciption"
									:error-messages="errors"
									prepend-icon="mdi-subtitles-outline"
									label="Description"
									required
									:count="500"
									hint="Job Description"
								></v-textarea>
							</ValidationProvider>

							<ValidationProvider
								v-slot="{ errors }"
								name="Other "
								rules="min:3|max:60"
								v-if="postType=='job'"
							>
								<v-text-field
									name="other"
									v-model="other"
									prepend-icon="mdi-more"
									:counter="60"
									:error-messages="errors"
									label="Other"
									required
									hint="Other contact detail or ps informations..."
								></v-text-field>
							</ValidationProvider>

							<!-- job post -->

							<ValidationProvider v-slot="{ errors }" name="tags" rules="required" v-if="postType!=='job'">
								<v-text-field
									name="tags"
									v-model="tags"
									:error-messages="errors"
									prepend-icon="mdi-label-multiple-outline"
									label="Tags"
									required
									hint="Question Tags comma separarated eg: test1, test2"
								></v-text-field>
							</ValidationProvider>

							<ValidationProvider v-slot="{ errors }" name="body" rules="required" v-if="postType!=='job'">
								<v-textarea
									name="body"
									v-model="body"
									:error-messages="errors"
									prepend-icon="mdi-subtitles-outline"
									label="Body"
									required
									:count="255"
									hint="Blog Description"
								></v-textarea>
							</ValidationProvider>

							<ValidationProvider v-slot="{ errors }" name="blogImage" rules>
								<v-file-input
									name="blogImage"
									show-size
									v-model="blogImage"
									:error-messages="errors"
									accept="image/*"
									prepend-icon="mdi-image"
									label="Post Image (OPTIONAL)"
									hint="An Image Desciption for your post"
								>
									<template v-slot:selection="{ text }">
										<v-chip small label color="primary">{{ text }}</v-chip>
									</template>
								</v-file-input>
							</ValidationProvider>

							<v-card-actions class="mt-4">
								<v-btn
									:loading="loading"
									:disabled="loading"
									color="indigo"
									class="mr-4 white--text"
									small
									type="submit"
								>
									<span v-show="!loading">{{$t("message.submit")}}</span>
									<v-icon class="px-4" dark v-show="loading">mdi-cloud-upload</v-icon>
								</v-btn>
								<v-btn depressed small @click="clear">{{$t("message.clear")}}</v-btn>
							</v-card-actions>
						</form>
					</ValidationObserver>
				</v-card>
			</v-col>
			<v-col cols="12" sm="10" md="5">
				<v-expansion-panels popout>
					<v-subheader class="ml-5 my-6">{{$t("message.postType")}}?</v-subheader>
					<v-expansion-panel v-for="(instruction,i) in instructions" :key="i">
						<v-expansion-panel-header>{{instruction.title}}</v-expansion-panel-header>
						<v-expansion-panel-content>{{instruction.body}}</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions } from "vuex";

@Component({
	methods: {
		...mapActions("blog", ["createNewBlog"])
	}
})
export default class UserQuestionsPost extends Vue {
	title = "";
	body = "";
	tags = "";
	slug = "";
	blogImage = "";
	loading = false;
	postType = "blog";
	jobtitle = "";
	company = "";
	jobtype = "";
	phonenumber = "";
	email = "";
	adress = "";
	desciption = "";
	other = "";

	instructions = [
		{
			title: "Article Post",
			body:
				"article post is a special kind of post which you post is about some topic your aim is to share information or knowledge of some kind you can provide an much description as you want and should be clean, clear and consise summay of your topic in hand."
		},
		{
			title: "Blog Post",
			body:
				"Post any thing you want having limited description you can post things like inspirations, motivations, Ads..."
		},
		{
			title: "Job Post",
			body:
				"Job Post is another kind of post which will help you find/recrute by posting a job..."
		}
	];

	clear() {
		this.title = "";
		this.body = "";
		this.slug = "";
		this.tags = "";
		this.blogImage = "";
		this.postType = "blog";
		this.jobtitle = "";
		this.company = "";
		this.jobtype = "";
		this.phonenumber = "";
		this.email = "";
		this.adress = "";
		this.desciption = "";
		this.other = "";
		(this.$refs.createQuestionObserver as Vue & {
			reset: () => boolean;
		}).reset();
	}

	submit() {
		this.loading = true;
		(this.$refs.createQuestionObserver as Vue & {
			validate: () => any;
		})
			.validate()
			.then((isValid: boolean) => {
				if (isValid) {
					const form = document.getElementById("blog-form") as HTMLFormElement;
					const formData = new FormData(form);
					formData.append("postType", this.postType);
					this.$store
						.dispatch("blog/createNewBlog", formData)
						.then(res => {
							console.log("res", res);
							this.loading = false;
							this.$router.push({ name: "Blogs" });
						})
						.catch(err => {
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
.blog-container
  overflow-x hidden
.v-text-field
  font-family Montserrat
.question_form_container
	min-height 100vh !important
</style>